import { useEffect } from "react";
import { Chat } from "./services/chat/chat.entity";
import { chatService } from "./services/chat/chat.service";
import { userService } from "./services/user/user.service";
import { LoginDto, UserDto } from "./services/user/user.dto";
import { ChatList } from "./components/ChatList";
import { ChatComp } from "./components/ChatComp";
import { ChatDetails } from "./components/ChatDetails";
import { Aside } from "./components/Aside";
import { useDispatch, useSelector } from "react-redux";
import { setChats } from "./store/chat/chats.reducer";
import { login } from "./store/user/user.reducer"
import { RootState } from "./store/store";

export function App() {
  const dispatch = useDispatch()
  const chats = useSelector((state: RootState) => state.chats.chats)
  const loggedInUser = useSelector((state: RootState) => state.user.user)

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

    appLogin()


    return () => {
      ws.close();
    };
  }, []);

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


  async function appLogin() {
    try {
      const userDto = {
        email: 'almogj1998@gmail.com',
        password: 'Aa1234'
      }
      const user = await loginUser(userDto)
      console.log(user);

      dispatch(login(user));
    } catch (error) {
      console.error("Failed to fetch user", error)
    }
  }

  async function getChats() {
    const result = await chatService.query();
    return result
  }
  async function loginUser(loginDto: LoginDto): Promise<UserDto> {
    const result = await userService.login(loginDto);
    return result
  }

  return <div className="app">
    <Aside />
    <div className="chats">
      <ChatList />
      <ChatComp />
    </div>
    <ChatDetails />
  </div >

}


