import { useEffect, useState } from "react"
import { Message } from "../services/messages/Message.entity"
import { userService } from "../services/user/user.service"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { User } from "../services/user/user.entity"
import { utilService } from "../services/util.service"

type MessagePreviewProps = {
    message: Message,
    key: number
}

export function MessagePreview({ message, key }: MessagePreviewProps) {
    const loggedInUser = useSelector((state: RootState) => state.user)
    const [selfMessage, setSelfMessage] = useState<boolean>(false)
    const [sentByUser, setSentByUser] = useState<User | undefined>()
    const [isMessageHovered, setIsMessageHovered] = useState<boolean>(false)

    useEffect(() => {
        getUser(message.userId)
    }, [])

    useEffect(() => {
        if (loggedInUser.isAuthenticated && loggedInUser.user.id === sentByUser?.id) {
            setSelfMessage(true)
        }
    }, [sentByUser])

    async function getUser(userId: string) {
        const currUser = await userService.getUser(userId);
        setSentByUser(currUser)
    }
    return <div
        key={key}
        className={`message-preview ${isMessageHovered ? `message-preview-hovered` : ``}`}
        onMouseEnter={() => setIsMessageHovered(true)}
        onMouseLeave={() => setIsMessageHovered(false)}
    >
        <div>
            <span className="user-msg-date">{utilService.formatDate(message.timestamp)}, </span>
            <span className="user-msg-date">{utilService.formatHour(message.timestamp)}</span>
        </div>
        <div>
            {selfMessage ?
                <span>
                    Me :
                </span> :
                <span>
                    {`${sentByUser?.displayName} : `}
                </span>
            }
            <span>
                {utilService.getTxtToShow(message.content, 25)}

            </span>
        </div>

    </div>
}