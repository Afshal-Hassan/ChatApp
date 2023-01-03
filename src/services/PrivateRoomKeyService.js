import axios from "axios";
import { useCallback } from "react";
import { PrivateRoomKey } from "../api/APIUrl";
import { useDispatch } from "react-redux";
import { changeThePrivateRoomKey } from "../redux/actions/PrivateRoomKeyAction.js";
import { senderAndReceiverAction } from "../redux/actions/SenderAndReceiverAction";
import {changeTheMessageComponentHeaderAction} from "../redux/actions/MessageHeaderAction";

const FetchPrivateRoomKey = () => {
    const dispatch = useDispatch();

    const fetchPrivateRoomKey = useCallback(async(firstUserEmail , secondUserEmail,friendName) => {
        const { data } = await axios.get(PrivateRoomKey(firstUserEmail, secondUserEmail));
        dispatch(changeThePrivateRoomKey(data.data[0].room_id));
        dispatch(senderAndReceiverAction({sender:firstUserEmail,receiver:secondUserEmail}));
        dispatch(changeTheMessageComponentHeaderAction(friendName))
    });
    return [fetchPrivateRoomKey];
};

export default FetchPrivateRoomKey;