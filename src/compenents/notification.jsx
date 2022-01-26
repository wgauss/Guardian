import React, { useState, useEffect } from 'react'
import {
	Text,
	Image,
	Button,
	Input,
	InputGroup,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	InputLeftElement,
	Tooltip,
	Circle,
	Badge
} from "@chakra-ui/react"

import { IoIosNotificationsOutline } from 'react-icons/io'
import { MdNotificationsActive } from 'react-icons/md'

import "../SASS/notificationAnimation.scss"

export const NotificationModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [notificationState, setNotificationState] = useState(false)
	const [numNotifications, setNumNotifications] = useState(0)
	const [notificationTooltip, setNotificationTooltip] = useState(numNotifications + " New Notifications" )
	
	function handleIncrementNum() {
		setNumNotifications(numNotifications + 1)
		setNotificationState(true)
		console.log(numNotifications)
		setNotificationTooltip(numNotifications + " New Notifications")
	}

	function handleDecrementNum(){
		if(numNotifications = 0){
			console.log("THAT'S A NO NO!")
			setNotificationState(false)
		} else {
			setNumNotifications(numNotifications - 1)
			setNotificationTooltip(numNotifications + " New Notifications")
		}
	}
	return (
		<>
			<Tooltip label={notificationTooltip} placement={"top"} hasArrow>
				<Circle size={"100px"} bg="slategrey" fontSize={"32px"} border="2px" cursor="pointer" onClick={onOpen} filter={"drop-shadow(0px 3px 3px rgba(0, 0, 0, 1))"}>
					{notificationState
						? <MdNotificationsActive id='NotificationActive' />
						:  <IoIosNotificationsOutline />}
				</Circle>
			</Tooltip>

			<Modal onClose={onClose} isOpen={isOpen} size={"5xl"} scrollBehavior='inside'>
				<ModalOverlay />
				<ModalContent opacity={.5}>
					<ModalHeader display={"flex"} justifyContent={"center"}>
						<Image src={require("../images/Envera-Site-Logo-1.png")} p={3} height={"125px"} />
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody display={"flex"} justifyContent={"center"}>
						<Button onClick={()=> setNotificationState(!notificationState)}>Change notificationState</Button>
						<Button onClick={() => handleIncrementNum()}>Increment Notification Count</Button>
						<Button onClick={() => handleDecrementNum()}>Decrement Notification Count</Button>
					</ModalBody>
					<ModalFooter>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}