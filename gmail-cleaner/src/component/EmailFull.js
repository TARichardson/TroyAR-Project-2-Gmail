import React from 'react';
import DeleteButton from './DeleteButton';
import sanitizeHtml from 'sanitize-html';

export default function EmailFull(props) {
  if(props.message && props.message.bIsHTML)
  {
    let keyContainer = `Container${props.num}`;
    let keyHeader = `Header${props.num}`;
    let keyItem = `item${props.num}`;
    let keyCheck = `Check${props.num}`;
    try{
      return (
        <div key={keyContainer}
          className='emailFull'>
          <div key={keyHeader}
            className='emailFullHeader'>
            Header
          </div>
          <div key={keyItem}
            dangerouslySetInnerHTML={{
              __html: (props.message.message),
            }}/>

            <div key={keyCheck} className='checkDiv'>
              <input type="checkbox" id={keyCheck} />
                <label for={keyCheck}>Selected</label>
              </div>

              <DeleteButton item={{
                mailId: props.message.msgId,
                userId: props.message.user,
                token: props.message.token,}}
                deleteHandle={props.deleteHandle}
              />

            </div>
          )
        }
        catch{
          return (
            <h1 key={keyItem}>Loading . . . </h1>
          )
        }
      }
      else {
        let keyContainer = `Container${props.num}`;
        let keyHeader = `Header${props.num}`;
        let keyItem = `item${props.num}`;
        let keyFooter = `Footer${props.num}`;
        try{
          return (
            <div key={keyContainer}
              className='emailView'>
              <div key={keyHeader}>
                Header
              </div>
              <pre key={keyItem}> {
                props.message.message
              } </pre>
              <DeleteButton item={ {
                mailId: props.message.id,
                userId: props.message.user,
                token: props.message.token,}}
                deleteHandle={props.deleteHandle}
              />
              <div key={keyFooter}>
                footer
              </div>
            </div>
          )
        }catch{
          return (
            <h1 key={keyItem}>Loading . . . </h1>
          )
        }
      }
    }
