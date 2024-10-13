import { useEffect, useState } from "react";
import { Chat } from "./services/chat/chat.entity";
import { chatService } from "./services/chat/chat.service";
import { userService } from "./services/user/user.service";
import { ChatList } from "./components/ChatList";
import { ChatComp } from "./components/ChatComp";
import { ChatDetails } from "./components/ChatDetails";
import { Aside } from "./components/Aside";
import { useDispatch, useSelector } from "react-redux";
import { setChats } from "./store/chat/chats.reducer";
import { login } from "./store/user/user.reducer"
import { RootState } from "./store/store";
import { LoginSignup } from "./components/LoginSignup";
import { ChatDetailsContent } from "./enums/chat.enum";

export function App() {
  const dispatch = useDispatch()
  const chats = useSelector((state: RootState) => state.chats.chats)
  const loggedInUser = useSelector((state: RootState) => state.user.user)
  const isLoggedInUser = useSelector((state: RootState) => state.user.isAuthenticated)
  const chatDetailsState = useSelector((state: RootState) => state.chatDetailsState)

  const [isLoggedInUserState, setIsLoggedInUserState] = useState<Boolean>(false)

  useEffect(() => {

    const ws = new WebSocket("ws://localhost:3030");

    ws.onmessage = (event) => {
      const updatedChats: Record<string, Chat> = JSON.parse(event.data);
      console.log("updatedChats", updatedChats);

      dispatch(setChats(updatedChats));
    };

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    const user = userService.loginFromToken()
    if (user) {
      dispatch(login(user))
    }

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    setIsLoggedInUserState(isLoggedInUser)
  }, [isLoggedInUser])

  useEffect(() => {
    if (loggedInUser) {
      fetchChats();
    }
  }, [loggedInUser])

  async function fetchChats() {
    try {
      const loadedChats = await getChats()
      dispatch(setChats(loadedChats))
      console.log(chats);
    } catch (error) {
      console.error("Failed to fetch chats", error)
    }
  }
  async function getChats() {
    const result = await chatService.query();
    return result
  }

  return <div className={`app ${chatDetailsState.content === ChatDetailsContent.None ? 'no-details' : ''}`} >
    <Aside />
    {isLoggedInUserState ?
      <div className={`chats ${chatDetailsState.content === ChatDetailsContent.None ? 'no-details' : ''}`}>
        <ChatList />
        <ChatComp />
      </div> :
      <LoginSignup />}
    <ChatDetails />
  </div >



}


