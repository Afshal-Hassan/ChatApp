const initialState = []

const messageReducer = (state = initialState , action ) => {
    switch(action.type){
       
        case "CHANGE_THE_MESSAGE_ARRAY" : return [...state,action.data]
        default: return state;
    }
};

export default messageReducer;