import { IoSearchOutline } from 'react-icons/io5';
import { IoFilterSharp } from 'react-icons/io5';
import UserImg from '../../assets/chat/user.png';
import { IoMdAttach } from 'react-icons/io';
import { GoMention } from 'react-icons/go';
import { IoSend } from 'react-icons/io5';
import { IoMdCheckmark } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Settings = () => {
  return (
    <div className="Comments">
      <p className="heading">Comments</p>
      <hr />

      <div className="commentSearch">
        <IoSearchOutline />
        <input type="text" placeholder="Find any word" />
        <IoFilterSharp />
      </div>

      <hr />
      <div className="ContentContianer">
        <p>Today</p>
        <div className="row">
          <img src={UserImg} alt="" />
          <div>
            <div className="MessageUserName">
              <p>
                {' '}
                Jerald Huels <span>1h</span>
              </p>
              <div>
                <IoMdCheckmark />
                <BsThreeDotsVertical />
              </div>
            </div>
            <p className="mentionMsg">Can you explain the ADKAR model?</p>
            <p>Its Completed</p>
          </div>
        </div>

        <div
          className="row"
          style={{
            justifyContent: 'space-between',
          }}
        >
          <img src={UserImg} alt="userImage" />
          <div className="inputContianer">
            <input type="text" placeholder="Reply" />
            <IoMdAttach />
            <GoMention />
            <IoSend />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Settings;
