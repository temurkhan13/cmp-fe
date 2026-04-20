import { RxMagicWand } from 'react-icons/rx';
import './chat.scss';

const AskAi = () => {
  return (
    <div className="PopupBox ask-ai-popup">
      <div className="navabr">
        <div className="dropdown">
          <button className="dropbtn">
            <span>
              <RxMagicWand />
            </span>{' '}
            <input
              onChange={(e) => {
                e.preventDefault();
              }}
              type="text"
              placeholder="Ask AI to edit or generate..."
            />
          </button>
          <div className="dropdown-content">
            <a href="#">Improve Writing</a>
            <a href="#">Fix Spelling & Grammer</a>
            <a href="#">Summarize</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AskAi;
