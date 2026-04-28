import { RxMagicWand } from 'react-icons/rx';
import Button from '../common/Button';
import './chat.scss';

const AskAi = () => {
  return (
    <div className="PopupBox ask-ai-popup">
      <div className="navabr">
        <div className="dropdown">
          <Button variant="ghost" className="dropbtn">
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
          </Button>
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
