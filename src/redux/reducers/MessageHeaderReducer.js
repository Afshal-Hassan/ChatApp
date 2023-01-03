const initialState = {
    messageHeading:""
};

const changeTheMessageComponentHeaderReducer = (state = initialState , action ) => {
    switch(action.type){
       
        case "CHANGE_THE_MESSAGE_HEADER" : return {...state,messageHeading: action.data};
        default: return state;
    }
};

export default changeTheMessageComponentHeaderReducer;