import { Formik, Form } from 'formik';
import './checkout.scss';
import Components from '../../components';
import data from '../../data';
import { Link } from 'react-router-dom';

const PayWithCard = () => {
  const initalValues = {
    email: '',
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    country: '',
    zipCode: '',
  };

  const dummyCountry = ['Pakistan', 'Turkey', 'USA'];

  return (
    <div className="payWithCard">
      <Components.Feature.Heading className="secondry mb_Secondry">
        Pay With Card
      </Components.Feature.Heading>
      name
      <section>
        <Formik
          initialValues={initalValues}
          validateOnMount
          validationSchema={
            data.validation.validationAuth.validationPayWithCard
          }
          onSubmit={(values, { resetForm }) => {
            resetForm();
          }}
        >
          {(formik) => (
            <Form>
              <div className="payWithCard-form">
                <Components.Feature.FormInput
                  name="email"
                  label="Email"
                  place="Enter your email"
                />
                <Components.Feature.FormInput
                  name="name"
                  label="Card Holder Name"
                  place="Enter name"
                />
                <Components.Feature.FormInput
                  name="cardNumber"
                  label="Card Number"
                  place="XXXX - XXXX - XXXX - XXXX "
                />

                <blockquote>
                  <Components.Feature.FormInput
                    name="expiryDate"
                    label="Expiry Date"
                    place="MM/YY"
                  />
                  <Components.Feature.FormInput
                    name="cvc"
                    label="CVC"
                    place="CVC"
                  />
                </blockquote>
                <blockquote>
                  <Components.Feature.FormInputWithDropDown
                    name="country"
                    label="Country"
                    place="Select country"
                    data={dummyCountry}
                  />
                  <Components.Feature.FormInput
                    name="zipCode"
                    label="Zip Code"
                    place="Zip Code"
                  />
                </blockquote>
              </div>
              <Link to="/dashboard">
                <Components.Feature.Button className="primary">
                  Subscribe
                </Components.Feature.Button>
              </Link>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
};

export default PayWithCard;
