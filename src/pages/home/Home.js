import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import "./home.css";

const Home = ({ theme }) => {
  return (
    <>
      <Topbar theme={theme} />
      <div className="homeContainer">
        <Leftbar theme={theme} />
        <Feed theme={theme} />
        <Rightbar theme={theme} />
      </div>
    </>
  );
};

export default Home;
