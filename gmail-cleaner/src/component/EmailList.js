import React, {Fragment} from 'react';
import EmailFull from './EmailFull';
import EmailItem from './EmailItem';

function render(renderStyle, list) {
  //console.log(list);
  switch(renderStyle) {
    case 'Full':
      return (
        <Fragment>
            <EmailFull/>
        </Fragment>
      )
    default:
    console.log("in render " + list[0]);
      return (
        <Fragment>
            <EmailItem message={list[0]}/>
        </Fragment>
      )
    }
}

export default function EmailList(props) {
  return (
    <div className="EmailListDiv">
      {render(props.renderStyle,props.allInboxs)}
    </div>
  )
}
