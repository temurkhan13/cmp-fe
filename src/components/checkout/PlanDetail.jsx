import Components from '../../components';
import Button from '../common/Button';
import { IoMdArrowBack } from 'react-icons/io';

const PlanDetail = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="planDetail">
        <Button
          variant="ghost"
          className="mb_Tertiary"
          iconLeft={<IoMdArrowBack />}
          onClick={goBack}
        >
          Back
        </Button>
        <header>
          <Components.Feature.Heading className="secondry mb_Primary">
            Subscription To Membership Plan
          </Components.Feature.Heading>
          <Components.Feature.Text className="primary--gray">
            Purchase this memebership plan to get the benefit of the CMP.
          </Components.Feature.Text>
        </header>
        <div className="mbt_Tertiary">
          <Components.Feature.Text className="main--bold">
            Membership Plan (Pro)
          </Components.Feature.Text>
          <Components.Feature.Text className="primary--gray-bold">
            <span>£0</span>
            /month
          </Components.Feature.Text>
        </div>
        <section>
          <Components.Feature.Text className="primary--gray-bold">
            Sales Tax
          </Components.Feature.Text>
          <Components.Feature.Text className="primary-dark">
            £1.10 USD
          </Components.Feature.Text>
        </section>
        <blockquote>
          <Components.Feature.Text className="primary--gray-bold">
            Total Due Today
          </Components.Feature.Text>
          <Components.Feature.Text className="titory--bold">
            £80.10 USD
          </Components.Feature.Text>
        </blockquote>
      </div>
    </>
  );
};

export default PlanDetail;
