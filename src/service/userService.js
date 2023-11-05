import HttpService from "./httpService";
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../components/cognito_auth/UserPool';

export const UserService = {
    isLoggedIn,
    logout,
    // getSession
}

function isLoggedIn() {
    var user = localStorage.getItem("user");
    console.log("USER Logged in: ", user)
    return user;
}

// function getSession() {
//      new Promise((resolve, reject) => {
//         const user = UserPool.getCurrentUser();
//         if (user) {
//             user.getSession((err, session) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(session);
//                 }
//             });
//         } else {
//             reject();
//         }
//     });
// };

function logout() {
    const user = UserPool.getCurrentUser();
    user.signOut();
    localStorage.clear();
    window.location.href = '/';
};