import React from 'react';
import EmailList from './EmailList'
import SideBar from './SideBar'
import GoogleLogin from 'react-google-login';

export default function SortingViewPage(props) {
  return (
    <div key='SortingViewPageDiv'
      className='gridPage1'>
      <div className='HeaderContainer'>
      <div className='LogoDiv'>
        <h1 className='LogoH'> Gmail Cleaner
        </h1></div>
      <div className='HeaderNameDiv'>
        <h1 className='HeaderName'> Sorting View
        </h1></div>
      <div key="GoogleLoginMini"
        className="GoogleLoginMini">
        <div className='GLMDiv'>
        <GoogleLogin  buttonText="G"
          clientId={process.env.REACT_APP_CLIENT_ID}
          scope={process.env.REACT_APP_SCOPE}
          onSuccess={props.handleProfile}
          onFailure={props.handleProfile}
          className='GLM'
        />
      </div></div></div>
      <SideBar/>
      <EmailList allInboxs={props.allInboxs}
        renderStyle='Full'
        deleteHandle={props.deleteHandle}/>
      </div>
    )
  }
