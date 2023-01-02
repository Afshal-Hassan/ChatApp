import axios from "axios";
import { useCallback } from "react";
import { PrivateRoomKey } from "../api/APIUrl";
import { useDispatch } from "react-redux";
import { changeThePrivateRoomKey } from "../redux/actions/PrivateRoomKeyAction.js";

const FetchPrivateRoomKey = () => {
    const dispatch = useDispatch();

    const fetchPrivateRoomKey = useCallback(async(firstUserEmail , secondUserEmail) => {
        const { data } = await axios.get(PrivateRoomKey(firstUserEmail, secondUserEmail));
        dispatch(changeThePrivateRoomKey(data.data[0].room_id));
    });
    return [fetchPrivateRoomKey];
};

export default FetchPrivateRoomKey;