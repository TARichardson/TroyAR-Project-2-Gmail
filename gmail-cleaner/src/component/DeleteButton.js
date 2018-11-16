import React from 'react';

export default function DeleteButton(props) {

  return (
    <button onClick={props.deleteHandle}
            id={props.item.userId}
            title={props.item.mailId}
            slot={props.item.token}>Delete Email</button>
  )
}
