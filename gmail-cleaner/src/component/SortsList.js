import React from 'react';

 const Keywords = (props) => {

  const message = this.props.message;
  const sort = this.props.sort;
  const key = this.props.key;
  switch (sort) {
    case 'sender':
    return (
      message.filter( (msg) =>
      msg.from.find(key) !== undefined
    ))
    case 'senderSubject':
    return (
      message.filter( (msg) =>
      msg.from.find(key) !== undefined
      || msg.subject.find(key) !== undefined
    ))
    default:
    return (
      message.filter( (msg) =>
      msg.from.find(key) !== undefined
      ||  msg.subject.find(key) !== undefined
      ||  msg.message.find(key) !== undefined
    ))
  }
}

const Sortslist = (props) => {
  return (
    <div>
      <h2>sort list</h2>
    </div>
  )
}

export default {
  Sortslist,
  Keywords,

}
