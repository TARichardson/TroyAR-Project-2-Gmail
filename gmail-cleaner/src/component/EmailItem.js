import React from 'react'

export default function EmailItem(props) {
  try{
  return (
    <h1 key={props.message.data.id }className='emailView'
      dangerouslySetInnerHTML={{
        __html: props.message.data.message,
      }}/>
  )
}
catch{
  return (
    <h1>Loading . . . </h1>
  )
}
}
