

const CloseFriends = ({ user, theme }) => {

    return (
            <li className={!theme?"leftbarFriendDark": "leftbarFriend"} style={{backgroundColor: !theme ? "#363537": "rgb(248, 248, 248)"}} >
                <img src={user.profilePicture} alt="" className="leftbarFriendImg" />
                <span className="leftbarFriendName">{user.username}</span>
            </li>
    )
}

export default CloseFriends
