import React, { useState } from 'react'
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
	Flex
} from "@chakra-ui/react"

import { VscSignIn, VscSignOut } from 'react-icons/vsc'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FaUserAlt } from 'react-icons/fa'

export const SignInModal = () => {
	const [signedIn, setSignedIn] = useState(false)
	const { isOpen, onOpen, onClose } = useDisclosure()

	function handleSignIn() {
		onClose()
		setSignedIn(!signedIn)
	}

	return (
		<>
			{signedIn
				? <Text bg="darkGrey" roundedTop={6}> Welcome Back, User!</Text>
				: <Text bg="darkGrey" roundedTop={6}> Please Sign In...</Text>}
			<Flex>
				<Button width={"50%"} colorScheme={"blue"} onClick={onOpen}>
					Sign In <VscSignIn />
				</Button>

				<Modal onClose={onClose} isOpen={isOpen} isCentered>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader display={"flex"} justifyContent={"center"}>
							<Image src={require("../images/envera-systems-squarelogo.png")} boxSize={"50"} rounded={6} />
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Text>Username</Text>
							<InputGroup>
								<InputLeftElement children={<FaUserAlt />} opacity={.4} />
								<Input />
							</InputGroup>
							<Text mt={3}>Password</Text>
							<InputGroup>
								<InputLeftElement children={<RiLockPasswordFill />} opacity={.4} />
								<Input type={"password"} />
							</InputGroup>
						</ModalBody>
						<ModalFooter>
							<Button onClick={() => handleSignIn()}>Sign In</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>

				<Button width={"50%"} colorScheme={"red"} isDisabled={!signedIn}>
					Sign Out <VscSignOut />
				</Button>
			</Flex>
		</>
	)
}