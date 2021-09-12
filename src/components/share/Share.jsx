import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions, Search } from "@material-ui/icons";
import { useState, useRef } from "react";
import { Users } from "../../dummyData";
import CloseFriends from "../closeFriends/CloseFriends";
import OutsideClick from "../../BodyContext";
import LocationShare from "../locationShare/LocationShare";
import { WorldCitiesData } from "../../worldCitiesDataSmall";
import Picker from "emoji-picker-react";
import { nanoid } from "nanoid";
// import savePost from "../publishPost/savePost";

const Share = ({ theme }) => {
    // Initial declaration
    const [textAreaFocus, setTextAreaFocus] = useState(false);
    const [tagClicked, setTagClicked] = useState(false);
    const [locationClicked, setLocationClicked] = useState(false);
    const [feelingsClicked, setFeelingsClicked] = useState(false);
    
    const tagRef = useRef(null);
    const tagFriendOutsideClick = OutsideClick(tagRef);

    const locationRef = useRef(null);
    const locationOutsideClick = OutsideClick(locationRef);

    const feelingsRef = useRef(null);
    const feelingsOutsideClick = OutsideClick(feelingsRef);

    const textAreaRef = useRef(null);
    const textAreaOutsideClick = OutsideClick(textAreaRef);

    // Declaration of state of whether the uploaded file is image or not

    // Declaration to get the input values by the user.
    const [shareText, setShareText] = useState("");
    const [shareImg, setShareImg] = useState([]);

    // Emoji section
    const [chosenEmoji, setChosenEmoji] = useState([]);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji([...chosenEmoji, emojiObject]);
        emojiObject !== undefined && setShareText(shareText + emojiObject.emoji);
    }

    let textAreaContainerHeight = "100%";

    function handleTextAreaClick(event) {
        setTextAreaFocus(true);
    }

    function handleButtonTagClick(event){
        setTagClicked(!tagClicked);
    }

    function handleButtonLocationClick(event) {
        setLocationClicked(!locationClicked);
    }

    function handleFeelingsButtonClick(event) {
        setFeelingsClicked(!feelingsClicked);
    }

    function handleFileChange(event) {
        setShareImg([...shareImg,event.target.files[0]]);
    }

    if(textAreaFocus){
        textAreaContainerHeight = "calc(100% + 200px)";
    }else{
        textAreaContainerHeight = "100%";
    }

    // DO NOT FOR THE LOVE OF GOD TOUCH THIS PART!!!!
    if(tagFriendOutsideClick && tagClicked){
        setTagClicked(false);
    }

    if(locationOutsideClick && locationClicked){
        setLocationClicked(false);
    }

    if(feelingsOutsideClick && feelingsClicked){
        setFeelingsClicked(false);
    }

    if(textAreaOutsideClick && textAreaFocus){
        setTextAreaFocus(false);
    }

    function handleShareSubmit(event){
        debugger;
        event.preventDefault();
        // This section is for generating the exact time when the user posts his/her post.
        const date = new Date();

        console.log(textAreaRef.current)
        if(textAreaRef.current) {
            textAreaRef.current.innerText = ""
        }

        let dateNew = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "long",
        }).format(date);

        dateNew = dateNew.slice(0, -12);

        if (dateNew.slice(dateNew.length - 5, dateNew.length - 3) < 12) {
        dateNew += " AM";
        } else {
        dateNew += " PM";
        }
        if(shareText || shareImg.length !== 0){
        const requestPosts = {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                id: nanoid(),
                desc: shareText,
                photo: shareImg.map((img) => URL.createObjectURL(img)),
                date: dateNew,
                userId: 1,
                like: 0,
                comment: 0,
                comments: []
            })}
            fetch('http://localhost:8000/Posts', requestPosts)
            .then(response => response.json())
            .then(alert("Your post has been successfully shared! Please reload the site to see it."));

            setShareText("");
            setShareImg([]);
        }else{
            alert("Please enter some value as input to post!")
        }        
    }

    return (
        <div className={theme? "share": "shareDark"} style={{height:`${textAreaContainerHeight}`}} >
            <div className="shareWrapper">
                    <div className="shareTop">
                        <img src="./assets/person/1.jpeg" alt="" className="shareProfileImg" />
                    <div 
                        contentEditable="true" 
                        suppressContentEditableWarning={true} 
                        data-text={(!shareText && shareImg.length === 0) ? "Tell me what's in your mind..." : ""} 
                        // The onBlur event is the opposite of the onFocus event. The line below gets the textcontent of the div once the focus on the div has been removed. It also works for emojis.
                        onBlur={(event) => setShareText(event.currentTarget.textContent)}
                        ref={textAreaRef}  
                        className={textAreaFocus? theme? "shareTextAreaActive" : "shareTextAreaActiveDark" : theme? "shareTextArea" : "shareTextAreaDark"} 
                        style={{backgroundColor: !theme && "#363537", color:!theme && "white"}} 
                        onClick={handleTextAreaClick}>
                            {shareImg && 
                                <div className={textAreaFocus? "imageExistsinShareTextAreaFocused": "imageExistsInShareTextArea"}>
                                    {shareImg.map((img) => <img src={img != null && URL.createObjectURL(img)} alt="" className="imageInsideTextArea"/>)}
                                </div>}
                            {/* Checks if there is any text in the contenteditable div. If there is, it will not display the placeholder otherwise, it will display the placeholder. */}
                            {shareText &&
                                (chosenEmoji && chosenEmoji.map((emoji) => <span>{emoji.emoji}</span>)) }
                    </div>
                    </div>
                    <hr className="shareHr" />
                    <div className="shareBottom">
                        <div className="shareOptions">
                            <div title="Click to add photos or videos into your post" className={theme? "shareOption" :"shareOptionDark"}>
                                <PermMedia htmlColor="tomato" className="shareIcon"/>
                                <span className="shareOptionText">Photo or Video</span>
                                <input className="shareOptionFilesImgAndVideos" type="file" accept="video/*,image/*" onChange={handleFileChange}/>
                            </div>
                            <div title="Tag your friends!" className={tagClicked? theme?  "shareOptionActive":"shareOptionDarkActive" : theme? "shareOption" : "shareOptionDark"} >
                                <Label htmlColor="blue" className="shareIcon"/>
                                <span className="shareOptionText">Tag</span>
                                {/* Note: You have to mouseup the one which you wanna toggle off screen and mouse down the referece one from BodyContext.js */}
                                <button className="shareOptionTagButton" onMouseUp={handleButtonTagClick}></button> 
                            </div>
                            <div title="Display your location to your friends!" className={locationClicked? theme?  "shareOptionActive":"shareOptionDarkActive" : theme? "shareOption" : "shareOptionDark"}>
                                <Room htmlColor="green" className="shareIcon"/>
                                <span className="shareOptionText">Location</span>
                                <button className="shareOptionLocationButton" onMouseUp={handleButtonLocationClick}></button>
                            </div>
                            <div title="Share your feelings." className={feelingsClicked? theme?  "shareOptionActive":"shareOptionDarkActive" : theme? "shareOption" : "shareOptionDark"}>
                                <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                                <span className="shareOptionText">Feelings</span>
                                <button className="shareOptionFeelingsButton" onMouseUp={handleFeelingsButtonClick}></button>
                            </div>
                        </div>
                        <button className="shareButton" onClick={handleShareSubmit} >share</button>
                    </div>
                {/* Toggle the tag function which will result in the user list being brought up when the user clicks the tag in share */}
                {tagClicked && 
                <div ref={tagRef}>
                <div className="searchFriend" >
                    <Search
                        className="searchFriendIcon"
                        style={{ color: !theme && "#363537" }}
                    />
                    <input type="text" placeholder="Search for your friends to tag." className={theme? "searchFriendInput": "searchFriendInputDark"} />
                </div>
                <ul className={theme? "tagFriendsList" : "tagFriendsListDark"}>
                    {Users.map((user) => (
                        <CloseFriends key={user.id} user={user} theme={theme} />
                    ))}
                </ul>
                </div>}
                {/* Toggle the location function which will result in the location list being brought up when the user clicks the location in share */}
                {locationClicked &&
                <div ref={locationRef}>
                    <div className={!theme? "searchLocation" : "searchLocationDark"}>
                    <Search
                        className="searchLocationIcon"
                        style={{ color: !theme && "#363537" }}
                    />
                    <input type="text" placeholder="Where are you?" className={theme? "searchLocationInput" : "searchLocationInputDark"}/>
                    </div>
                    <ul className={theme? "locationList" : "locationListDark"}>
                        {WorldCitiesData.map((cityData) => (
                            <LocationShare key={cityData.id} cityName={cityData.city} lattitude={cityData.lat} longitude = {cityData.lng} theme={theme} />
                        ))}
                    </ul>
                </div>}
                {/* Toggle the feelings function which will result in an emoji picker being called and run. The package I'm using is emoji-picker-react. Documentation: https://www.npmjs.com/package/emoji-picker-react */}
            {feelingsClicked &&
                <div className="shareOptionEmojiPicker" ref={feelingsRef}>
                    <Picker 
                        className="darkPicker"
                        onEmojiClick={onEmojiClick}
                        pickerStyle={{ 
                            width: "100%",
                            }}/>
                </div>
                }
            </div>
        </div>
    )
}

export default Share
