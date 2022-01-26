import React, { useState, useEffect } from 'react'
import {
	Text,
	Image,
	Box,
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
	Flex
} from "@chakra-ui/react"

import { RiFileList3Line } from 'react-icons/ri'
import { GiRoad } from 'react-icons/gi'
export const CBB = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<Tooltip label="Read Community Bulletin Board" placement={"top"} hasArrow>
				<Circle size={"100px"} bg="slategrey" fontSize={"32px"} border="2px" cursor="pointer" onClick={onOpen} filter={"drop-shadow(0px 3px 3px rgba(0, 0, 0, 1))"}>
					<RiFileList3Line />
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
						<Box>
							<Text>PUBLIC ROAD CANNOT DENY!</Text>
							<Flex justifyContent={"center"}>
								<GiRoad fontSize={"64px"} />
							</Flex>
						</Box>
					</ModalBody>
					<ModalFooter>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}