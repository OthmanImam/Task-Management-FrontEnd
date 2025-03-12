// "use client";
// import { jwtDecode, JwtPayload } from "jwt-decode";
// import clearLocalStorage from "./cleanData";
// import { TOKEN_NAME } from "@/constants/constants";

// export const logOut = () => {
//   clearLocalStorage();
//   window.location.href = "/login";
// };

// interface CustomJwtPayload extends JwtPayload {
//   email: string;
//   username: string;
//   isVerified: boolean;
// }

// Helper function to decode a token and check its expiration
// const decodeAndValidateToken = (token: string): CustomJwtPayload | null => {
//   try {
//     const decoded = jwtDecode<CustomJwtPayload>(token);
//     const currentTime = Math.floor(Date.now() / 1000);
//     if (decoded?.exp && decoded.exp < currentTime) {
//       logOut();
//     }
//     return decoded;
//   } catch (error) {
//     logOut();
//   }
//   return null;
// };

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? token : null;
};

// // // Checks if the user is authenticated by verifying the token's validity
// export const isAuthenticated = () => {
//   const token = getToken();

//   if (token) {
//     const decoded = decodeAndValidateToken(token);
//     return decoded !== null;
//   }

//   return false;
// };

// export const isVerified = () => {
//   const token = getToken();
//   if (token) {
//     const decoded = decodeAndValidateToken(token);
//     return decoded?.isVerified;
//   }
// };

// // Checks if the token has expired and handles it accordingly
// export const tokenHandler = (token: any) => {
//   const decoded = decodeAndValidateToken(token);
//   if (decoded) {
//     localStorage.setItem(TOKEN_NAME, token); // Store the valid token
//   }
// };

// // Decodes the token and returns the decoded object
// export const decodeToken: any = () => {
//   const token = getToken();
//   if (token) {
//     const decoded = decodeAndValidateToken(token);
//     if (decoded) {
//       return {
//         email: decoded.email,
//         username: decoded.username,
//         isVerified: decoded.isVerified,
//       };
//     }
//     logOut();
//     return { email: null, isVerified: false };
//   }
// };
