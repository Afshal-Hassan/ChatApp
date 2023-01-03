import changeThePrivateRoomKey from "./PrivateRoomKeyReducer";
import { combineReducers } from "redux";
import senderAndReceiverReducer from "./SenderAndReceiverReducer";
import changeTheMessageComponentHeaderReducer from "./MessageHeaderReducer";
import changeTheLastAppendMessage from "./LastAppendMessageReducer";
import messageReducer from "./MessagesReducer";
const rootReducer = combineReducers({
    changeThePrivateRoomKey,
    senderAndReceiverReducer,
    changeTheMessageComponentHeaderReducer,
    changeTheLastAppendMessage,
    messageReducer,
});

export default rootReducer;