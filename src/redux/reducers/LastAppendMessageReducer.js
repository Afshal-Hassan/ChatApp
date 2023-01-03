const initialState = {
    lastAppendMessage:""
};

const changeTheLastAppendMessage = (state = initialState , action ) => {
    switch(action.type){
       
        case "CHANGE_THE_LAST_APPEND_MESSAGE" : return {...state,lastAppendMessage: action.data};
        default: return state;
    }
};

export default changeTheLastAppendMessage;