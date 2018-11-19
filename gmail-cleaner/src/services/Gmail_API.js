import axios from 'axios'
import utf8 from 'utf8';
import base64 from 'base-64';
const mimeType = "text/html";
const mimeTypeFallback = "text/plain";


const decodeGmail = (data) => {
  // google encodes the base64 string to decode it I need to replace characters
  // "-" (minus character) by "+" (plus character)
  // "_" (underscore character) by "/" (slash character)
  const rexp = /-/g;
  const rexp2 = /_/g;
  let decodeEmail = data.replace(rexp, '+').replace(rexp2, '/');
  // normal decode of base64
  let bytes = base64.decode(decodeEmail);
  let str = utf8.decode(bytes);
  return str;
}

const findGmailData = (data) => {
  try {
    if(data.mimeType === mimeType){
      data.bool = true;
      return decodeGmail(data.body.data);
    }
    else{
      data.bool = true;
      for(let index = 0; index < data.parts.length; index++) {
        if(data.parts[index].mimeType === mimeType) {
          return decodeGmail(data.parts[index].body.data);
        }
      }
    }
  }
  catch{
    console.log(data);
    if(data.mimeType === mimeTypeFallback){
      data.bool = false;
      return decodeGmail(data.body.data);
    }
    else{
      data.bool = false;
      for(let index = 0; index < data.parts.length; index++) {
        if(data.parts[index].mimeType === mimeTypeFallback) {
          return decodeGmail(data.parts[index].body.data);
        }
      }
    }
  }

}
const encodeGmail = () => {

}

async function getProfile (id,token) {
  const URL = `https://www.googleapis.com/gmail/v1/users/${id}/profile`
  const resp = await axios({
    method: 'get',
    url: URL,
    headers: {
      Authorization: token,
    }
  });
  return resp;
}

async function getInbox (id, token) {
  const URL = `https://www.googleapis.com/gmail/v1/users/${id}/messages`
  const resp = await axios({
    method: 'get',
    url: URL,
    headers: {
      Authorization: token,
    }
  });
  return resp;
}

async function getMessage (id,msgId,token) {
  const URL = `https://www.googleapis.com/gmail/v1/users/${id}/messages/${msgId}`
  const resp = await axios({
    method: 'get',
    url: URL,
    headers: {
      Authorization: token,
    }
  }).then( value => {
    let tempResult = {};
    tempResult.message = findGmailData(value.data.payload);
    tempResult.mailURL = value.config.url;
    tempResult.labelIds = value.data.labelIds;
    tempResult.snippet = value.data.snippet;
    tempResult.from = value.data.payload.headers.find(value => value.name === 'From').value;
    tempResult.to = value.data.payload.headers.find(value => value.name === 'To').value;
    tempResult.subject = value.data.payload.headers.find(value => value.name === 'Subject').value;
    tempResult.date = value.data.payload.headers.find(value => value.name === 'Date').value;
    tempResult.bIsHTML = value.data.payload.bool;
    tempResult.token = token;
    tempResult.user = id;
    tempResult.msgId = msgId;

    value.data.user = id;
    value.data.token = token;
    return tempResult;
  })
  .catch(error => console.log(error));
  //debugger;
  //resp.data.message = findGmailData(resp.data.payload);
  //  console.log(resp);
  return resp;
}

async function deleteMessage (id, msgId,token) {

  const URL = `https://www.googleapis.com/gmail/v1/users/${id}/messages/${msgId}`
  const resp = await axios({
    method: 'delete',
    url: URL,
    headers: {
      Authorization: token,
    }
  });
  return resp;
}

async function deleteGroupMessage (id, msgIds,token) {
  let idObj = {
    "ids": [
      msgIds,
    ]
  }
  const URL = `https://www.googleapis.com/gmail/v1/users/${id}/messages/batchDelete`
  const resp = await axios({
    method: 'delete',
    url: URL,
    headers: {
      Authorization: token,
    },
    data: idObj,
  });
  return resp;
}
// {
//   "addLabelIds": [
//     string
//   ],
//   "removeLabelIds": [
//     string
//   ]
// }
async function modifyMessage (id, msgId,token) {
  const URL = `https://www.googleapis.com/gmail/v1/users/${id}/messages/modify`
  const resp = await axios({
    method: 'post',
    url: URL,
    headers: {
      Authorization: token,
    }
  });
  return resp;
}
// {
//   "ids": [
//     string
//   ],
//   "addLabelIds": [
//     string
//   ],
//   "removeLabelIds": [
//     string
//   ]
// }
async function modifyGroupMessage (id, msgIds,token) {
  let idObj = {
    "ids": [
      msgIds,
    ]
  }
  const URL = `https://www.googleapis.com/gmail/v1/users/${id}/messages/batchModify`
  const resp = await axios({
    method: 'post',
    url: URL,
    headers: {
      Authorization: token,
    },
    data: idObj,
  });
  return resp;
}

export default {
  getProfile,
  getInbox,
  getMessage,
  deleteMessage,
  deleteGroupMessage,
  modifyMessage,
  modifyGroupMessage,
}
