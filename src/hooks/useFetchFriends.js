import React from "react";
import { useState,useCallback } from "react";
import { FriendListAPI } from "../api/APIUrl";
import axios from "axios";



const useFetchFriends = () => {

    const [friends, setFriends] = useState([]);
    
    const fetchFriendsOfUser = useCallback(async () => {
        const { data } = await axios.get(FriendListAPI());
        setFriends(data.data);
      }, [friends]);

  return [friends,fetchFriendsOfUser];

}

export default useFetchFriends;