import React, {Fragment} from 'react';
import EmailFull from './EmailFull';
import EmailItem from './EmailItem';
import Gmail_API from '../services/Gmail_API';

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
  let  toRender = list.map(async (elem) =>
               (await Gmail_API.getMessage(elem.userId,elem.id,elem.token) )
            )
            try{
              console.log(toRender);

              return(
              <Fragment>
                  <EmailItem message={toRender}/>
              </Fragment>)
            }
            catch{
              console.log(toRender);

            }


      return (
        <Fragment>
            <EmailItem message="ddf"/>
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
