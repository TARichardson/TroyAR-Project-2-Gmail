import axios from 'axios'
const BASE_URL = '';

async function getProfile (id,token) {
  const URL = `https://www.googleapis.com/gmail/v1/users/${id}/profile`
  const resp = await axios({
    medhod: 'get',
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
    medhod: 'get',
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
    medhod: 'get',
    url: URL,
    headers: {
        Authorization: token,
    }
  });
  return resp;
}

async function deleteMessage (id, msgId,token) {
  const URL = `https://www.googleapis.com/gmail/v1/users/${id}/messages/${msgId}`
  const resp = await axios({
    medhod: 'delete',
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
    medhod: 'delete',
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
    medhod: 'post',
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
    medhod: 'post',
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
