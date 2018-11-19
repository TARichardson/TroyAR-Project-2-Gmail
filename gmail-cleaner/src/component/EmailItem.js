import React from 'react';
import DeleteButton from './DeleteButton';

export default function EmailItem(props) {
  if(props.message)
  {
    let keyContainer = `Container${props.num}`;
    let keyHeader = `Header${props.num}`;
    let keyItem = `item${props.num}`;
    let keyCheck = `Check${props.num}`;
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

            <div key={keyCheck} className='checkDiv'>
              <input type="checkbox" id={keyCheck}/>
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
      }catch{
        return (
          <h1 key={keyItem}>Loading . . . </h1>
        )
      }
    }
  }
