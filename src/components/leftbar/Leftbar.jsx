import "./leftbar.css";
import { RssFeed, Chat, PlayCircleFilledOutlined, Group, Bookmark, HelpOutline, WorkOutline, Event, School } from "@material-ui/icons"
import { Users } from "../../dummyData";
import CloseFriends from "../closeFriends/CloseFriends";
import { useState } from "react";

const Leftbar = ({ theme }) => {
    const [showMore, setShowMore] = useState(false);

    function toggleShowMoreButton(event){
        setShowMore(!showMore);
    }

    return (
        <div className="leftbar">
            <div className="leftbarWrapper">
                <ul className="leftbarList">
                    <li className={!theme?"leftbarListItemDark":"leftbarListItem"}>
                        <RssFeed className="leftbarIcon"/>
                        <span className="leftbarListItemText">Feed</span>
                    </li>
                    <li className={!theme?"leftbarListItemDark":"leftbarListItem"}>
                        <Chat className="leftbarIcon"/>
                        <span className="leftbarListItemText">Chats</span>
                    </li>
                    <li className={!theme?"leftbarListItemDark":"leftbarListItem"}>
                        <PlayCircleFilledOutlined className="leftbarIcon"/>
                        <span className="leftbarListItemText">Videos</span>
                    </li>
                    <li className={!theme?"leftbarListItemDark":"leftbarListItem"}>
                        <Group className="leftbarIcon"/>
                        <span className="leftbarListItemText">Groups</span>
                    </li>
                    <li className={!theme?"leftbarListItemDark":"leftbarListItem"}>
                        <Bookmark className="leftbarIcon"/>
                        <span className="leftbarListItemText">Bookmarks</span>
                    </li>
                    <li className={!theme?"leftbarListItemDark":"leftbarListItem"}>
                        <HelpOutline className="leftbarIcon"/>
                        <span className="leftbarListItemText">Questions</span>
                    </li>
                    <li className={!theme?"leftbarListItemDark":"leftbarListItem"}>
                        <WorkOutline className="leftbarIcon"/>
                        <span className="leftbarListItemText">Jobs</span>
                    </li>
                    <li className={!theme?"leftbarListItemDark":"leftbarListItem"}>
                        <Event className="leftbarIcon"/>
                        <span className="leftbarListItemText">Events</span>
                    </li>
                    <li className={!theme?"leftbarListItemDark":"leftbarListItem"}>
                        <School className="leftbarIcon"/>
                        <span className="leftbarListItemText">Courses</span>
                    </li>
                </ul>
                {!showMore && <button className="leftbarButton" onClick={toggleShowMoreButton}>Show more</button>}
                <hr className="leftbarHr"/>
                <ul className={showMore?"leftbarFriendList":"leftbarFriendList none"}>
                    {Users.map((user) => (
                        <CloseFriends key={user.id} user={user} theme={theme} />
                    ))}
                </ul>
                {showMore && <button className="leftbarButton" onClick={toggleShowMoreButton}>Show Less</button>}
            </div>
        </div>
    )
}

export default Leftbar
