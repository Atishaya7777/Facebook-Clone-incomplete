import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { useState, useEffect } from "react";

const Feed = ({ theme }) => {
    const [posts, setPosts] = useState(null);

    useEffect((posts) => {
        async function fetchData(){
        const response = await fetch('http://localhost:8000/Posts');
        const data = await response.json();
        setPosts(data);
        console.log(posts);
    }
    fetchData();
    }, [])
    
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share theme={ theme }/>
                {posts && posts.map((post) => (
                    <Post key={post.id} post={post} theme={theme}/>
                ))}
                <div className="endOfFeed">End Of Feed...<span className="feedEndEmoji"><SentimentVeryDissatisfiedIcon /></span></div>
            </div>
        </div>
    )
}

export default Feed
