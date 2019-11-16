import types from '../actions/types';

const initialState = {
    messages: [],
    error: null
};
export default (state = initialState, action) => {

    switch (action.type) {
        case types.ADD_MESSAGE:
            state.messages = [...action.payload];
            return Object.assign({}, state);
        case types.FETCH_MESSAGES:
            state.messages = [...action.payload];
            return Object.assign({}, state);
        default:
            return state;
     }
};