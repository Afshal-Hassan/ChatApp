import axios from "axios";
import { useCallback, useState } from "react"
import { GetMessagesURL } from "../api/APIUrl";


const MessageService = () => {
    const [messagesData, setMessages] = useState([]);

    const getMessages =  useCallback(async(sender,receiver) => {
        const { data } = await axios.get(GetMessagesURL(sender,receiver));
        setMessages(data.data);
        return data.data
    },[messagesData]);
    
    return [getMessages];
};

export default MessageService;