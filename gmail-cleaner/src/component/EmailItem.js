import React from 'react'

export default function EmailItem(props) {
  let key = props.num;
  try{
  return (
    <div key={key} className='emailView'
      dangerouslySetInnerHTML={{
        __html: props.message.data.message,
      }}/>
  )
}
catch{
  return (
    <h1 key={key}>Loading . . . </h1>
  )
}
}
