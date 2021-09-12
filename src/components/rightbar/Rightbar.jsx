import "./rightbar.css";
import Online from "../online/Online";
import { Users } from "../../dummyData"

const Rightbar = ({ theme }) => {
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="/assets/gift.png" alt="" />
                    <span className="birthdayText"><b>Friend Exhibit A</b> and <b>7 others</b> have birthdays today!</span>
                </div>
                <img src="/assets/ad.png" alt="" className="rightbarAd" />
                <div className="rightbarFriendListAndTitle">
                    <h4 className="rightbarTitle">Online Friends</h4>
                    <ul className="rightbarFriendList">
                        {Users.map(user => (
                            <Online key={user.id} user={user} theme={theme} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Rightbar
