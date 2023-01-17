const initialState = {
    sender:"",
    receiver:""
};

const senderAndReceiverReducer = (state = initialState , action ) => {
    switch(action.type){
       
        case "SET_SENDER_AND_RECEIVER" : return {...state,sender: action.data.sender,receiver: action.data.receiver};
        default: return state;
    }
};

export default senderAndReceiverReducer;