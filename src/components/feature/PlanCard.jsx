import PropTypes from 'prop-types';
import Components from '../../components';
import Button from '../common/Button';
import { GoCheckCircle } from 'react-icons/go';
import { Link } from 'react-router-dom';

const PlanCard = (props) => {
  return (
    <div
      className={`planCard`}
      id={props.name === 'Starter' ? 'planCard-active' : ''}
    >
      <header>
        <Components.Feature.Text className="main--bold  mb_Primary">
          {props.name}
        </Components.Feature.Text>
        <Components.Feature.Text className="secondry--light mb_Secondry">
          {props.description}
        </Components.Feature.Text>
        <Components.Feature.Text className="secondry--light mb_1">
          <span>${props.price}</span>/ {props.planType ? 'yearly' : 'monthly'}
        </Components.Feature.Text>
        <Link to="/check-out">
          <Button
            variant={props.name === 'Starter' ? 'secondary' : 'primary'}
            size="lg"
            block
            className="mb_Tertiary"
          >
            Get Started
          </Button>
        </Link>
      </header>
      <section>
        <Components.Feature.Text className="main--bold">
          Includes
        </Components.Feature.Text>

        <div>
          {props.features.map((el) => (
            <Item key={`${props.name}-${el}`}>{el}</Item>
          ))}
        </div>
      </section>
    </div>
  );
};

PlanCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  planType: PropTypes.bool.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const Item = (props) => {
  return (
    <div className="planCard-item">
      <div>
        <GoCheckCircle />
      </div>
      <div>
        <Components.Feature.Text className="primary--light">
          {props.children}
        </Components.Feature.Text>
      </div>
    </div>
  );
};

Item.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanCard;
