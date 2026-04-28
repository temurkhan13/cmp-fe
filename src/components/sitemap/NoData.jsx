import { BiFolder } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import Button from '../common/Button';
import './sitemap.scss';

function NoData() {
  let navigate = useNavigate();

  return (
    <div className="sitemap-nodata">
      <div className="sitemap-nodata__header">
        <span className="sitemap-nodata__title">
          Digital Playbook
        </span>
        <div>
          <Button
            variant="primary"
            className="sitemap-nodata__create-btn"
            iconLeft={<BiPlus />}
            onClick={() => {
              navigate('/sitemap/new');
            }}
          >
            Create Template
          </Button>
        </div>
      </div>
      <div className="sitemap-nodata__content">
        <BiFolder size={100} />
        <span className="sitemap-nodata__heading">
          No recent activity here
        </span>
        <span className="sitemap-nodata__desc">
          Organize your folders and files, and see <br></br>them show up here.
        </span>
      </div>
    </div>
  );
}

export default NoData;
