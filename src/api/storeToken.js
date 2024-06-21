// import axios from "axios";

// // Store tokens and expiration times in axios defaults
// const storeToken = (tokens) => {
//   // access token
//   axios.defaults.headers.common[
//     "Authorization"
//   ] = `Bearer ${tokens.access.token}`;

//   //   access token expire time
//   axios.defaults.accessTokenExpiry = new Date(tokens.access.expires).getTime();

//   //   refresh token
//   axios.defaults.refreshToken = tokens.refresh.token;

//   //   refresh token expire time
//   axios.defaults.refreshTokenExpiry = new Date(
//     tokens.refresh.expires
//   ).getTime();
// };

// export default storeToken;
