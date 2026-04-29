import { teamslide1, teamslide2, video } from '../../../assets';
import { FaArrowRight } from 'react-icons/fa';
import Button from '../../../../common/Button';

const Team = () => {
  return (
    <div className="team">
      <h2 className="team-title">
        An <span className="text-gradient">END-TO-END</span> business <br />{' '}
        platform for your team
      </h2>
      <div className="team-both">
        <div>
          <img width={'100%'} src={video} alt="ChangeAI platform demo" />
        </div>
        <div className="team-slide flex flex-col">
          <div className="team-slide-card">
            <Button variant="icon" ariaLabel="View slide">
              <FaArrowRight className="team-rotate-icon" />
            </Button>
            <h2 className="team-slide-title">
              4x your data response rate <br /> with generative AI and instant{' '}
              <br /> output formats.
            </h2>
          </div>
          <div className="team-slide-previews">
            <img src={teamslide1} alt="Platform feature preview" />
            <img src={teamslide2} alt="Platform feature preview" />
            <img src={teamslide1} alt="Platform feature preview" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
