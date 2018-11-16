import React from 'react';
import DeleteButton from './DeleteButton';

export default function EmailItem(props) {
  let keyContainer = `Container${props.num}`;
  let keyHeader = `Header${props.num}`;
  let keyItem = `item${props.num}`;
  let keyFooter = `Footer${props.num}`;
  try{
  return (
    <div key={keyContainer} className='emailView'>
    <div key={keyHeader}> Header </div>
    <div key={keyItem}
         dangerouslySetInnerHTML={{
           __html: props.message.data.message,
         }}/>
    <DeleteButton item={
                  {  mailId: props.message.data.id,
                    userId: props.message.data.user,
                    token: props.message.data.token,}}
                  deleteHandle={props.deleteHandle}
                  />
    <div key={keyFooter}> footer </div>
    </div>
  )
}
catch{
  return (
    <h1 key={keyItem}>Loading . . . </h1>
  )
}
}
