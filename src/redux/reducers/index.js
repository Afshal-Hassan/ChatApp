import changeThePrivateRoomKey from "./PrivateRoomKeyReducer";
import { combineReducers } from "redux";
import senderAndReceiverReducer from "./SenderAndReceiverReducer";
import changeTheMessageComponentHeaderReducer from "./MessageHeaderReducer";
import changeTheLastAppendMessage from "./LastAppendMessageReducer";
const rootReducer = combineReducers({
    changeThePrivateRoomKey,
    senderAndReceiverReducer,
    changeTheMessageComponentHeaderReducer,
    changeTheLastAppendMessage,
});

export default rootReducer;