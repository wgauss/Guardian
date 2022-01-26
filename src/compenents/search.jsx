import React, {useState} from 'react'
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
	InputRightAddon,
} from "@chakra-ui/react"

import { FaAddressCard } from 'react-icons/fa'
import { CgPlayListSearch } from 'react-icons/cg'

export const SearchModal = ({searchTerm}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [changedSearchTerm, setChangedSearchTerm] = useState(searchTerm)
	function handleSearchChange(value) {
		setChangedSearchTerm(value)
	}
	return (
		<>
			<InputRightAddon children={< CgPlayListSearch />} fontSize={"32px"} cursor={"pointer"} onClick={onOpen} />

			<Modal onClose={onClose} isOpen={isOpen} isCentered size={"full"}>
				<ModalOverlay />
				<ModalContent bg="rgba(0, 150, 255, 0.8)">
					<ModalHeader display={"flex"} justifyContent={"center"}>
						<Image src={require("../images/Envera-Site-Logo-1.png")} p={3} height={"125px"} />
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>Search</Text>
						<InputGroup>
							<InputLeftElement children={<FaAddressCard />} opacity={.4} />
							<Input placeholder={searchTerm} defaultValue={searchTerm} onChange={(event) => handleSearchChange(event.target.value)} />
						</InputGroup>
					</ModalBody>
					<ModalFooter>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}