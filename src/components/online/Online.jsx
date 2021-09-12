import "./online.css";

const Online = ({ user, theme }) => {
    return (
        <li className={!theme?"rightbarFriendDark":"rightbarFriend"} style={{backgroundColor: !theme && "#363537"}}>
            <div className="rightbarProfileImgContainer">
                <img src={user.profilePicture} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    )
}

export default Online
