import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";

const Topbar = ({ theme }) => {
  return (
    <div
      className="topbar-container"
      style={{ backgroundColor: !theme && "#002657" }}
    >
      {/* This is the left part of the navigation bar which displays the logo of the social media app */}
      <div className="topbarLeft">
        <span className="logo">WorldSocial</span>
      </div>
      {/* This is for the middle of the navigation bar where users will be able to search for posts/friends and so on */}
      <div className="topbarCenter">
        <div className="searchbar">
          <Search
            className="searchIcon"
            style={{ color: !theme && "#363537" }}
          />
          <input placeholder="Dive into anything.." className="searchInput" />
        </div>
      </div>
      {/* This is for the top right navigation bar icons and their corresponding links */}
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            {/* This is the counter for the top bar image with the notifications */}
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            {/* This is the counter for the top bar image with the notifications */}
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            {/* This is the counter for the top bar image with the notifications */}
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src="./assets/person/1.jpeg" alt="" className="topbarImg" />
      </div>
    </div>
  );
};

export default Topbar;
