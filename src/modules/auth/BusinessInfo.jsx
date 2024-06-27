import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import Components from '../../components';
import data from '../../data';
import { useNavigate, useLocation } from 'react-router-dom';
import { setBusinessInfo } from '../../store/businessInfoSlice';

const BusinessInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;
  const dispatch = useDispatch();
  const dummyRole = [
    'Developer',
    'Designer',
    'Software Engineer',
    'FrontEnd Developer',
  ];
  const dummyIndustry = ['Design', 'Development', 'Quality'];
  const dummyCompanySize = ['12', '11', '10', '6'];
  const initialValues = {
    name: '',
    lastName: '',
    role: '',
    industry: '',
    companySize: '',
    companyName: '',
    websiteURL: '',
    jobTitle: '',
  };

  const handleSubmit = (businessInfo, { resetForm }) => {
    dispatch(setBusinessInfo({ ...businessInfo }));
    navigate('/set-password', { state: { email: email } });
    resetForm();
  };

  return (
    <>
      <div className="businessInfo">
        <section>
          <Components.Feature.Heading className="secondary mb_Secondary">
            Business Information
          </Components.Feature.Heading>

          <Formik
            initialValues={initialValues}
            validateOnMount
            validationSchema={
              data.validation.validationAuth.validationBusinessInfo
            }
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <div className="businessInfo-form">
                  <blockquote>
                    <Components.Feature.FormInput
                      name="name"
                      label="First Name"
                      place="First name"
                    />
                    <Components.Feature.FormInput
                      name="lastName"
                      label="Last Name"
                      place="Last Name"
                    />
                  </blockquote>
                  <Components.Feature.FormInputWithDropDown
                    name="role"
                    label="What is your role?"
                    place="Select role"
                    data={dummyRole}
                  />
                  <Components.Feature.FormInputWithDropDown
                    name="industry"
                    label="What industry are you in?"
                    place="Select industry"
                    data={dummyIndustry}
                  />
                  <Components.Feature.FormInputWithDropDown
                    name="companySize"
                    label="What size is your company?"
                    place="Select size"
                    data={dummyCompanySize}
                  />
                  <Components.Feature.FormInput
                    name="companyName"
                    label="What is your company name?"
                    place="Company name"
                  />
                  <Components.Feature.FormInput
                    name="websiteURL"
                    label="What is your website URL?"
                    place="Website URL"
                  />
                  <Components.Feature.FormInput
                    name="jobTitle"
                    label="What is your job title?"
                    place="Job Title"
                  />
                </div>

                <Components.Feature.Button className="primary" type="submit">
                  Continue
                </Components.Feature.Button>
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </>
  );
};

export default BusinessInfo;
