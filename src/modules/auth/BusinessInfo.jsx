import { Formik, Form } from "formik";
import Components from "../../components";
import { IoMdArrowBack } from "react-icons/io";
import data from "../../data";

const BusinessInfo = () => {
  const dummyRole = [
    "Developer",
    "Desginer",
    "Software Engineer",
    "FrontEnd Developer",
  ];
  const dummyIndustry = ["Design", "Development", "Quality"];
  const dummyCompanySize = ["12", "11", "10", "6"];
  const initalValues = {
    name: "",
    lastName: "",
    role: "",
    industry: "",
    companySize: "",
    companyName: "",
    websiteURL: "",
    jobTitle: "",
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="businessInfo">
        <section>
          <Components.Feature.Button onClick={goBack} className="back">
            <IoMdArrowBack />
            Back
          </Components.Feature.Button>

          <section>
            <Components.Feature.Heading className="secondry mb_Secondry">
              Business Information
            </Components.Feature.Heading>

            <Formik
              initialValues={initalValues}
              validateOnMount
              validationSchema={
                data.validation.validationAuth.validationBusinessInfo
              }
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                resetForm();
              }}
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
        </section>
      </div>
    </>
  );
};

export default BusinessInfo;
