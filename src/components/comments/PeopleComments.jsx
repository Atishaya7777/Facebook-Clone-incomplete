import "./peoplecomment.css";
import { Users } from "../../dummyData";

const PeopleComments = ( {comment, theme} ) => {
    return (
        <li className="individualComment">
            <img src={Users[1].profilePicture} alt="" className="individualCommentImg" />
            <span className={theme? "individualCommentText" : "individualCommentTextDark"}>{comment}</span>
        </li>    
    )
}

export default PeopleComments
