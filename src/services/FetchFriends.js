import { useState,useCallback } from "react";
import { FriendListAPI } from "../api/APIUrl";
import axios from "axios";



const FetchFriends = () => {

    const [friends, setFriends] = useState([]);
    
    const fetchFriendsOfUser = useCallback(async (user) => {
        const { data } = await axios.get(FriendListAPI(user));
        setFriends(data.data);
      }, [friends]);

  return [friends,fetchFriendsOfUser];

};

export default FetchFriends;