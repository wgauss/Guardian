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
	InputRightElement,
	Flex
} from "@chakra-ui/react"

import { VscSignIn, VscSignOut } from 'react-icons/vsc'
import {  RiLockPasswordFill } from 'react-icons/ri'
import { FaUserAlt } from 'react-icons/fa'

function PasswordInput() {
	const [show, setShow] = React.useState(false)
	const handleClick = () => setShow(!show)

	return (
		<InputGroup size='md'>
			<InputLeftElement children={<RiLockPasswordFill />} opacity={.4} />
			<Input
				pr='4.5rem'
				type={show ? 'text' : 'password'}
				placeholder='Enter password'
			/>
			<InputRightElement width='4.5rem'>
				<Button h='1.75rem' size='sm' onClick={handleClick}>
					{show ? 'Hide' : 'Show'}
				</Button>
			</InputRightElement>
		</InputGroup>
	)
}

export const SignInModal = () => {
	const [signedIn, setSignedIn] = useState(false)
	const [submitState, setSubmitState] = useState(false)
	const { isOpen, onOpen, onClose } = useDisclosure()

	function handleSignInOut(){
		if(signedIn){
			
		}else{
			
		}
		setSubmitState(true)
		setTimeout(() => {
			onClose()
			setSubmitState(false)
			setSignedIn(!signedIn)
		}, 3000);
	}

	return (
		<>
			{signedIn 
				? <Text bg="darkGrey" roundedTop={6}> Welcome Back, User!</Text>
				: <Text bg="darkGrey" roundedTop={6}> Please Sign In...</Text>}
			<Flex>
				{signedIn
				? <>
					<Button width={"100%"} colorScheme={"red"} onClick={onOpen} roundedTop={"unset"}>
						Sign Out <VscSignOut />
					</Button>

				</>
				: <>
					<Button width={"100%"} colorScheme={"blue"} onClick={onOpen} roundedTop={"unset"}>
						Sign In <VscSignIn />
					</Button>
				</>}
				

				<Modal onClose={onClose} isOpen={isOpen} isCentered>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader display={"flex"} justifyContent={"center"}>
							<Image src={require("../images/envera-systems-squarelogo.png")} boxSize={"50"} rounded={6} />
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							{signedIn 
							? <>
								<Text textAlign={"center"}>Are You Sure You Want to Sign Out?</Text>
							</>
							: <>
									<Text>Username</Text>
									<InputGroup>
										<InputLeftElement children={<FaUserAlt />} opacity={.4} />
										<Input />
									</InputGroup>
									<Text mt={3}>Password</Text>
									<InputGroup>
										<PasswordInput />
									</InputGroup>
								</>

							}
						</ModalBody>
						<ModalFooter>
							<Button onClick={() => handleSignInOut()} isLoading={submitState}
								loadingText='Submitting'>
								{signedIn
									? <><Text color={"tomato"}>Sign Out</Text></>
										: <><Text color={"skyblue"}>Sign In</Text></>
								}
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>

			</Flex>
		</>
	)
}
