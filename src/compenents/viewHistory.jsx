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
	Button,
	Flex,
	VStack,
	Tab,
	Tabs,
	TabList,
	TabPanel,
	TabPanels
} from "@chakra-ui/react"

import { RiHistoryLine } from 'react-icons/ri'
import moment from 'moment'


export const ViewHistoryModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<Tooltip label="View Transaction History" placement={"right"} hasArrow>
				<Button borderLeft={"2px"} color="darkslategrey" variant="solid" background="slategrey" onClick={onOpen}>
					View History <Flex ml={"3px"}><RiHistoryLine fontSize={"28px"} /></Flex>
				</Button>
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
							<Text textAlign={"center"} fontSize={"32px"} borderBottom={"2px"} width={900}>History</Text>
							<VStack border={"3px"} maxH={800} height={800}>{/*show time from then*/}
								<Text m={1} p={1} rounded={6} border={"1px"}>Community Name : Gate (  01/05/2022 | 02:30:23 {
									/*moment().subtract(30, "minutes").subtract(30, "seconds").format("MM/DD/YYYY | hh:mm:ss") */ 
								} )
								 <Button>View Call History </Button> 
								 <Button>Connect To Gate</Button> </Text>
								<Text m={1} p={1} rounded={6} border={"1px"}>Community Name : Gate (  01/05/2022 | 01:45:54 {

									/*moment().subtract(15, "minutes").subtract(18, "seconds").format("MM/DD/YYYY | hh:mm:ss") */ 
								} ) <Button>View Call History</Button> <Button>Connect To Gate</Button> </Text>
								<Text m={1} p={1} rounded={6} border={"1px"}>Community Name : Gate (  01/05/2022 | 01:23:23 {

									/*moment().format("MM/DD/YYYY | hh:mm:ss")*/ 
								} ) <Button>View Call History </Button> <Button>Connect To Gate</Button> </Text>
							</VStack>
						</Box>
					</ModalBody>
					<ModalFooter>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}