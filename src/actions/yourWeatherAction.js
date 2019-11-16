import types from './types';

function insertMessage(message) {
  return fetch("http://hansolo.iptime.org/message", {
    method: 'POST',
    body: JSON.stringify({message: {roomNo: 0, cntnt: message }}),
    headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
    },
  }).then(res => res.json());
}

export function addMessage(message) {
  return async (dispatch) => {
      try {
          const response = await insertMessage(message);
          dispatch(addMessageSuccess(response.messages));
      } catch (error) {
          console.log(error);
      }
  }
}

function addMessageSuccess(messages) {
    return {
        type: types.ADD_MESSAGE,
        payload: messages
    };
}

function getMessages() {
  return fetch("http://hansolo.iptime.org/message", {
    method: 'GET',
    headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
    },
  }).then(res => res.json());
}

export function fetchMessages() {
  return async (dispatch) => {
    try {
      const response = await getMessages();
      dispatch(fetchMessagesSuccess(response.messages));
    } catch (error) {
      console.log(error);
    }
  }
}

function fetchMessagesSuccess(messages) {
  return {
    type: types.FETCH_MESSAGES,
    payload: messages
  };
}