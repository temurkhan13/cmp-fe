import UserImg from "../../assets/chat/user.png";
const RawData = [
  {
    Time: "Today at 14:13 AM",
    firstName: "Imran",
    SecondName: "Sherrimac Gyver",
  },
  {
    Time: "April 28, 2024 | 8:00 PM",
    firstName: "Imran",
    SecondName: "Sherrimac Gyver",
  },
  {
    Time: "Feb 28, 2024 | 8:00 PM",
    firstName: "Imran",
    SecondName: "Sherrimac Gyver",
  },
];

const Home = () => {
  return (
    <div className="VersionHistory">
      <p>Version History</p>
      <hr />
      <div className="Contianer">
        <p>Current Version</p>
        {RawData.map(({ Time, firstName, SecondName }, index) => {
          return (
            <div key={index} className="MapContainer">
              <p>{Time}</p>
              <div className="row">
                <img src={UserImg} alt="userPic" />
                <span>{firstName}</span>
              </div>
              <div className="row">
                <img src={UserImg} alt="userPic" />
                <span>{SecondName}</span>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      <div className="historyBtn">
        <button>Cancel</button>
        <button>Remove version</button>
      </div>
    </div>
  );
};

export default Home;
