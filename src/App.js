import React, { useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BroswerRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './Chat';

function App() {

  const GoogleLogIn = () => {
    return (
      <React.Fragment>
        <GoogleOAuthProvider clientId="907824685069-6mlq4rgbjs5g4f9a075thftst08eur4v.apps.googleusercontent.com">
          <GoogleLogin
            buttonText="google login"
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
                <Routes>
                  <Route path="/chat" element={<Chat />}></Route>
                </Routes>
            }}
            onError={() => {
              console.log('LOGIN FAILED');
            }}
        />
        </GoogleOAuthProvider>
      </React.Fragment>
    )
  }

  return (
    <div className="App">
      <GoogleLogIn></GoogleLogIn>
    </div>
  );
}

export default App;