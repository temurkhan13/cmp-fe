// import Components from '../../components';
// import assets from '../../assets';
// import data from '../../data';
// import { Formik, Form } from 'formik';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { registerEmail, register } from './authSlice';

// const SignUp = () => {
//   const navigate = useNavigate();
//   const initalValues = {
//     email: '',
//   };

//   const handleSubmit = async (values, { setSubmitting }) => {
//     setSubmitting(false);
//     navigate('/business-info', { state: { email: values.email } });
//   };

//   return (

//     <Components.Feature.Container className="">
//       <header>
//         <Components.Feature.Heading className="primary mb_primary">
//           Create Your Account
//         </Components.Feature.Heading>
//         <Components.Feature.Text className="primary--light">
//           Please enter the following information in order to sign up
//         </Components.Feature.Text>
//         <section className="mbt_Tertiary">
//           <Components.Feature.Button
//             className="auth mb_Secondry"
//             icon={assets.auth.google}
//           >
//             Continue with Google
//           </Components.Feature.Button>
//           <Components.Feature.Button
//             className="auth"
//             icon={assets.auth.linkedIn}
//           >
//             Continue with LinkedIn
//           </Components.Feature.Button>
//         </section>
//         <div className="mb_Tertiary">
//           <span></span>
//           <Components.Feature.Text className="secondry--light captilize">
//             or
//           </Components.Feature.Text>
//           <span></span>
//         </div>
//       </header>
//       <section>
//         <Formik
//           initialValues={initalValues}
//           validateOnMount
//           validationSchema={data.validation.validationAuth.validationSignUp}
//           onSubmit={handleSubmit}
//         >
//           {(formik) => (
//             <Form>
//               <Components.Feature.FormInput
//                 name="email"
//                 label="Email"
//                 place="Enter your email"
//               />
//               <Components.Feature.Button className="primary" type="submit">
//                 Continue
//               </Components.Feature.Button>
//             </Form>
//           )}
//         </Formik>
//       </section>
//       <center>
//         <Components.Feature.Text className="primary m_1">
//           Already have an account?
//           <Link to="/"> Log In</Link>
//         </Components.Feature.Text>
//       </center>
//     </Components.Feature.Container>
  
// );
// };

// export default SignUp;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { useHistory } from 'react-router-dom';
import { registerEmail, register } from '../../redux/slices/authSlice';

const SignUp = () => {
  const dispatch = useDispatch();
 // const history = useHistory();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    industry: '',
    companyName: '',
    companySize: '',
    websiteURL: '',
    jobTitle: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch async action to register email and get verification code
      const response = await dispatch(registerEmail(email));
      setVerificationCode(response.payload.verificationCode);
      setStep(2); // Move to next step after email is registered and verification code received
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dispatch async action to complete registration
      const fullRegistrationData = {
        ...registrationData,
        verificationCode: verificationCode,
        email: email,
      };
      await dispatch(register(fullRegistrationData));
      // Redirect to dashboard upon successful registration
    //  history.push('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <button type="submit" disabled={isLoading}>Next</button>
          {error && <p>{error}</p>}
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleRegistrationSubmit}>
          <input type="text" name="firstName" value={registrationData.firstName} onChange={handleChange} placeholder="First Name" required />
          <input type="text" name="lastName" value={registrationData.lastName} onChange={handleChange} placeholder="Last Name" required />
          {/* Add other fields for business information */}
          <input type="password" name="password" value={registrationData.password} onChange={handleChange} placeholder="Password" required />
          <input type="text" name="verificationCode" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="Verification Code" required />
          <button type="submit" disabled={isLoading}>Register</button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default SignUp;
