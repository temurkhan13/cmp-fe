// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import config from '../../config/config';

// Firebase configuration (replace with your own config)
// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

// Initialize Firebase app
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// Function to handle Google Sign-In
export const signinWithGoogle = async () => {
  window.location.href = `${config.apiURL}/auth/google`;
  // const provider = new GoogleAuthProvider();

  try {
    //     const result = await signInWithPopup(auth, provider);
    //     // This gives you a Google Access Token.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //
    //     // The signed-in user info
    //     const user = result.user;
    //     console.log('User signed in: ', user);
    //     return user;
  } catch (error) {
    console.error('Error during sign in: ', error);
    //     return null;
  }
};
