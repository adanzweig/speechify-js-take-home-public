import {createStore,combineReducers} from 'redux';
import {
    ClientEventType,
    ClientState,
  } from "@common/client";

const initialState = {
    type: ClientEventType.STATE,
    state: ClientState.NOT_PLAYING
}
const speechifyReducer = (state = initialState,action) =>{
    switch (action.type){
        case 'play':
            state.state = ClientState.PLAYING
            return state
        case 'pause':
            state.state = ClientState.NOT_PLAYING
            return state;
        default:
            return state;
    }
}

const store = createStore(speechifyReducer);
export default store;