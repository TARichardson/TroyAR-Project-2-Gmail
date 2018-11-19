import React from 'react';
import DeleteButton from './DeleteButton';

export default function EmailItem(props) {
  if(props.message)
  {
    let keyContainer = `Container${props.num}`;
    let keyHeader = `Header${props.num}`;
    let keyItem = `item${props.num}`;
    let keyFooter = `Footer${props.num}`;
    try{
      return (
        <div key={keyContainer}
          className='emailView'>
          <div key={keyHeader}
            className='emailViewHeader'>
            Header
          </div>
          <p key={keyItem}
            >{props.message.snippet} </p>
            <DeleteButton item={{
              mailId: props.message.msgId,
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
