import AiPic from '../../assets/dashboard/sidebarLogo.png';
import { IoSearchOutline } from 'react-icons/io5';

const Rowdata = [
  {
    name: 'ChangeAI',
    text: 'The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.',
    saveBy: 'You',
  },
  {
    name: 'ChangeAI',
    text: 'The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.',
    saveBy: 'Imran',
  },
];
const Help = () => {
  return (
    <div className="BookMark">
      <p className="heading">Bookmark</p>
      <hr />

      <div className="BookMarkSearch">
        <IoSearchOutline />
        <input type="text" placeholder="Search" />
      </div>
      <hr />

      <div
        style={{
          margin: '2% 4%',
        }}
      >
        <p>Today</p>
        {Rowdata.map(({ name, text, saveBy }, index) => {
          return (
            <div key={index}>
              <div className="BookmarkHeading">
                <img src={AiPic} alt="#" />
                <p>{name}</p>
                <IoSearchOutline />
              </div>

              <div className="BookmarkSavedText">
                <p>{text}</p>
                <p>
                  Saved By <span>{saveBy}</span>
                </p>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Help;
