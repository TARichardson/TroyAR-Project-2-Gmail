import React from 'react';

export default function EmailHeader (props) {
  let key = "EmailHeader" + props.message.msgId;
  return (
    <div key={key}
         className='EmailHeader'>

    </div>
  )
}
