const initialState = {
    roomId:0
};

const changeThePrivateRoomKey = (state = initialState , action ) => {
    switch(action.type){
       
        case "CHANGE_THE_PRIVATE_ROOM_KEY" : return {...state,roomId:action.data};
        default: return state;
    }
};

export default changeThePrivateRoomKey;