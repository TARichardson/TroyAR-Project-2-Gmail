import React, {Fragment} from 'react';
import EmailFull from './EmailFull';
import EmailItem from './EmailItem';

function render(renderStyle, list) {
  switch(renderStyle) {
    case 'Full':
      return (
        <Fragment>
            <EmailFull/>
        </Fragment>
      )
    default:
      return (
        <Fragment key="EmailListFrag">
          {list.map( (elem, index) =>
            (<EmailItem message={elem} num={index}/>))}
        </Fragment>
      )
    }
}

export default function EmailList(props) {
  return (
    <div key="EmailListDiv" className="EmailListDiv">
      {render(props.renderStyle,props.allInboxs)}
    </div>
  )
}
