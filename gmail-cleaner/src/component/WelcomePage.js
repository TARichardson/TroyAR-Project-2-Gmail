import React from 'react';
import GoogleLogin from 'react-google-login';

export default function WelcomePage (props) {
  return (
    <div key='WelcomePageDiv'
      className='WelcomePageDiv'>
      <h1 key='WelcomePageText'
        className='WelcomePageText'> Gmail Cleaner </h1>
        <div key="GoogleLoginLarge"
          className="GoogleLoginLarge">
          <GoogleLogin  clientId={process.env.REACT_APP_CLIENT_ID}
            scope={process.env.REACT_APP_SCOPE}
            onSuccess={props.handleProfile}
            onFailure={props.handleProfile}
          />
        </div>
      </div>)
    }
