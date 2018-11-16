import React from 'react';
import EmailList from './EmailList'
import GoogleLogin from 'react-google-login';

export default function SortingViewPage(props) {
  return (
    <div key='SortingViewPageDiv' className='gridPage1'>
    <GoogleLogin clientId={process.env.REACT_APP_CLIENT_ID}
                  scope={process.env.REACT_APP_SCOPE}
                  onSuccess={props.handleProfile}
                  onFailure={props.handleProfile}
                  />
      <div><h1>Sorting View </h1></div>
      <EmailList allInboxs={props.allInboxs}
                renderStyle='Item'
                deleteHandle={props.deleteHandle}/>
    </div>
  )
}
