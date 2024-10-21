// import axios from "axios";
// import storeToken from "./storeToken";

// export const refreshAccessToken = async () => {
//   // get refresh token & time
//   const refreshToken = axios.defaults.refreshToken;
//   const refreshTokenExpiry = axios.defaults.refreshTokenExpiry;

//   // check expire time of regresh token & availability...
//   if (refreshToken && Date.now() < refreshTokenExpiry) {
//     const response = await axios.post(`${API_URL}/refresh-token`, {
//       refreshToken,
//     });

//     // update setTokens
//     storeToken(response.data);
//   } else {
//     throw new Error("No refresh token available or refresh token has expired");
//   }
// };

// export const isTokenExpired = (expiryTime) => {
//   return Date.now() >= expiryTime;
// };
