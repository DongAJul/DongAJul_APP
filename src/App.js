import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { BrowserRouter as Router,Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Chat from './Chat'

function App() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
          setUser(null)
          setProfile(null)
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <Routes>
                    <Route exact path="/DongAJul_APP" element={<Chat />} />
                </Routes>

                    // <div>
                    //     <img src={profile.picture} alt="user image" />
                    //     <h3>User Logged in</h3>
                    //     <p>Name: {profile.name}</p>
                    //     <p>Email Address: {profile.email}</p>
                    //     <br />
                    //     <br />
                    //     <button onClick={logOut}>Log out</button>
                    // </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
}
export default App;



// import React, { useEffect } from 'react'
// import logo from './logo.svg';
// import './App.css';
// import { GoogleLogin } from '@react-oauth/google';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { BroswerRouter as Router, Routes, Route } from 'react-router-dom';
// import Chat from './Chat';

// function App() {

//   const GoogleLogIn = () => {
//     return (
//       <React.Fragment>
//         <GoogleOAuthProvider clientId="907824685069-6mlq4rgbjs5g4f9a075thftst08eur4v.apps.googleusercontent.com">
//           <GoogleLogin
//             buttonText="google login"
//             // isSignedIn={true}
//             onSuccess={(credentialResponse) => {
//               console.log(credentialResponse);
              
//               <Routes>
//                 <Route path="/chat" element={<Chat />}></Route>
//               </Routes>
//             }}
//             onError={() => {
//               console.log('LOGIN FAILED');
//             }}
//           />
//         </GoogleOAuthProvider>
//       </React.Fragment>
//     )
//   }

//   return (
//     <div className="App">
//       <GoogleLogIn></GoogleLogIn>
//     </div>
//   );
// }

// export default App;