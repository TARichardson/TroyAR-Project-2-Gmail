import React from 'react';
import EmailList from './EmailList'
import SideBar from './SideBar'
import GoogleLogin from 'react-google-login';

export default function ViewSortingPage(props) {
  return (
    <div key='SortingViewPageDiv'
      className='gridPage2'>
      <div key="GoogleLoginMini"
        className="GoogleLoginMini">
        <GoogleLogin  buttonText="G"
          clientId={process.env.REACT_APP_CLIENT_ID}
          scope={process.env.REACT_APP_SCOPE}
          onSuccess={props.handleProfile}
          onFailure={props.handleProfile}
          className="GLM"
        />
      </div>
      <h1> View Sorting </h1>
      <EmailList allInboxs={props.allInboxs}
        renderStyle='Full'
        deleteHandle={props.deleteHandle}/>
      </div>)
    }
