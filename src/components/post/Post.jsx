import "./post.css"
import { MoreVert } from "@material-ui/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faHeart, faShareAlt, faComment } from "@fortawesome/fontawesome-free-solid";
import { Users } from "../../dummyData";
import { useState } from "react";
import PeopleComments from "../comments/PeopleComments";

const Post = ({ post, theme }) => {
    const [like, setLike] = useState(post.like);
    const [liked, setLiked] = useState(false);

    const [love, setLove] = useState(post.like);
    const [loved, setLoved] = useState(false);

    const [showComment, setShowComment] = useState(false);

// It worked! Below is the safety pig for good luck!       _
//  _._ _..._ .-',     _.._(`))
// '-. `     '  /-._.-'    ',/
//    )         \            '.
//   / _    _    |             \
//  |  a    a    /              |
//  \   .-.                     ;
//   '-('' ).-'       ,'       ;
//      '-;           |      .'
//         \           \    /
//         | 7  .__  _.-\   \
//         | |  |  ``/  /`  /
//        /,_|  |   /,_/   /
//           /,_/      '`-'
    function handleLikeClick(event) {
        if(loved){
            setLoved(false);
            setLove(love - 1);
        }
        setLiked(!liked);
        if(liked){
            setLike(like - 1);
        }else {
            setLike(like + 1);
            }
    }

    function handleLoveClick(event){
        if(liked){
            setLiked(false);
            setLike(like - 1);
        }
        setLoved(!loved);
        if(loved){
            setLove(love - 1);
        }else{
            setLove(love + 1);
        }
    }

    function handleCommentClick(event){
        setShowComment(!showComment);
    }

    if(Array.isArray(post.photo)){
        ;
    }
    console.log();
    
    return (
        <div className={theme? "post" : "postDark"}>
            {Array.isArray(post.photo) &&
                post.photo.map((picture) => <img src={picture} alt="" key={post.userId} className="postImg" />)}
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={Users.filter(user => user.id === post.userId)[0].profilePicture} alt="" className="postProfileImg"/>
                        <span className="postUserName">{Users.filter(user => user.id === post.userId)[0].username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    {post.desc && <span className="postText">{post.desc}</span>}
                    {/* Needs more working. Needs to accomodate 2 or more than 2 pictures. */}
                    {Array.isArray(post.photo)?
                        post.photo.map((picture) => <img src={picture} alt="" key={post.userId} className="postImg" />)
                        :
                        <img src={post.photo} alt="" className="postImg" />
                        }
                    
                </div>
                <div className="postBottom" style={{borderTop:showComment && "1 px solid grey"}}>
                    {/* This is for the like and comment icons/buttons, call them whatever you wish*/}
                    <div className={theme?"postBottomLeft":"postBottomLeftDark"}>
                        <FontAwesomeIcon className="likeIcon" icon={faThumbsUp} onClick={handleLikeClick} style={{color:liked ?"blue":"grey" }} />
                        <FontAwesomeIcon className="heartIcon" icon={faHeart} onClick={handleLoveClick} style={{color:loved ?"red":"grey"}}/> 
                        <span className="postLikeCounter">{liked? `You and ${like - 1} others.`: loved? `You and ${love - 1} others`: `${like} people.`}</span>
                    </div>
                    {/* This is for the other things in the social media website, like the three dots settings and so on.*/} 
                    <div className={theme?"postBottomMiddle":"postBottomMiddleDark"} onClick={handleCommentClick}> 
                        <span className="postCommentText" ><FontAwesomeIcon icon={faComment} className="postCommentIcon"/>Comment</span>
                    </div>
                    <div className={theme?"postBottomRight":"postBottomRightDark"}>
                        <span className="postShare">Share <FontAwesomeIcon icon={faShareAlt} className="postShareIcon" /></span>
                    </div>
                </div>
                {showComment && 
                            <ul className="peopleComment">
                                {post.comments.map((c, index) =>{ 
                                    console.log(c)
                                    return(
                                    <PeopleComments key={index} comment={c} theme={theme} />
                                )})}
                    </ul>}
            </div>
        </div>
    );
};

export default Post;
