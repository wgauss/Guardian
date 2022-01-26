import React, { useState } from "react"

import {
	Button,
	Tooltip,
	InputGroup,
	InputRightAddon,
} from "@chakra-ui/react"
import { FaMicrophoneSlash, FaMicrophone } from 'react-icons/fa'
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi'

export const MicroPhone = () => {
	const [microphoneIcon, setMicrophoneIcon] = useState(true)
	const [muteMicIcon, setMuteMicIcon] = useState(true)

	return (
		<InputGroup justifyContent={"center"}>
			<Tooltip label="Microphone (Push-To-Talk)" hasArrow placement="top">
				<Button width={"75%"}
					onMouseDown={() => setMicrophoneIcon(false)}
					onMouseUp={() => setMicrophoneIcon(true)}
					isDisabled={!muteMicIcon}>
					{microphoneIcon
						? <BiMicrophone fontSize={"32px"} color={"tomato"} />
						: <FaMicrophone fontSize={"32px"} color="lime" />}
				</Button>
			</Tooltip>
			<Tooltip label="Mute ❌ (Double Click)" hasArrow placement="top">
				<InputRightAddon onClick={() => console.log("sjhot")} cursor={"pointer"} onDoubleClick={() => setMuteMicIcon(!muteMicIcon)}>
					{muteMicIcon
						? < BiMicrophoneOff fontSize={"32px"} />
						: < FaMicrophoneSlash fontSize={"32px"} />}
				</InputRightAddon>
			</Tooltip>
		</InputGroup>
	)
}