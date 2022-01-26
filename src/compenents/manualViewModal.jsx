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
	Input,
	VStack,
	Select,
	GridItem,
	Grid
} from "@chakra-ui/react"

import { GiAllSeeingEye } from 'react-icons/gi'
import { CBB } from './communityBullitenBoard'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
export const ManualViewModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [submitState, setSubmitState] = useState(false)
	const [validGateState, setValidGateState] = useState(false)
	function handleSubmit(){
		setSubmitState(true)
		setTimeout(() => {
			setSubmitState(false)
			onClose()
		}, 1500);
	}
	function handleGateChange(){
		setValidGateState(true)
	}
	const items = [
		{
			id: 0,
			name: 'Cobol'
		},
		{
			id: 1,
			name: 'JavaScript'
		},
		{
			id: 2,
			name: 'Basic'
		},
		{
			id: 3,
			name: 'PHP'
		},
		{
			id: 4,
			name: 'Java'
		}
	]

	const handleOnSearch = (string, results) => {
		// onSearch will have as the first callback parameter
		// the string searched and for the second the results.
		console.log(string, results)
	}

	const handleOnHover = (result) => {
		// the item hovered
		console.log(result)
	}

	const handleOnSelect = (item) => {
		// the item selected
		console.log(item)
	}

	const handleOnFocus = () => {
		console.log('Focused')
	}

	const formatResult = (item) => {
		return item
		// return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
	}

					
	return (
		<>
			<Tooltip label="Open Manual View Settings" placement={"right"} hasArrow>
				<Button borderLeft={"2px"} color="darkslategrey" variant="solid" background="slategrey" width={"100%"} onClick={onOpen} >
					Manual View <Flex ml={"5px"} border={"1px"}><GiAllSeeingEye fontSize={"32px"} /></Flex>
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
						<VStack>
							<ReactSearchAutocomplete
								items={items}
								onSearch={handleOnSearch}
								onHover={handleOnHover}
								onSelect={handleOnSelect}
								onFocus={handleOnFocus}
								autoFocus
								formatResult={formatResult}
								placeholder="Please Search"
								color="white"
								background="white"
							/>

							<Text fontSize={32}>Manual View</Text>
							
							<Input placeholder='Search for Community'  onChange={() => handleGateChange()}/>
							<Select placeholder='Please Select Community' onChange={() => handleGateChange()}>
								<option>Community Name</option>
							</Select>
							<Input placeholder='Search for Gate' isDisabled={!validGateState}/>
							<Select placeholder='Please Select Gate' isDisabled={!validGateState}>
								<option>Gate Name</option>
							</Select>
							<Grid boxShadow={"2xl"} mb={3} rounded={6} p={1}
								gap={1}
								templateRows='repeat(3, 1fr)'
								templateColumns='repeat(3, 1fr)'
								overflowY={"scroll"}
								maxH={"300px"}
							>

								<GridItem rounded={6} bg="black" colSpan={1} rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
									<Image src={require("../images/stockPhotos/person_1.jpg")} />
								</GridItem>

								<GridItem rounded={6} bg="black" colSpan={1} rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
									<Image src={require("../images/stockPhotos/person_2.jfif")} />
								</GridItem>

								<GridItem rounded={6} bg="black" colSpan={1} rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
									<Image src={require("../images/stockPhotos/person_3.jpg")} />
								</GridItem>

								<GridItem rounded={6} bg="black" colSpan={1} rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
									<Image src={require("../images/stockPhotos/person_4.jpg")} />
								</GridItem>

								<GridItem rounded={6} bg="black" colSpan={1} rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
									<Image src={require("../images/stockPhotos/person_5.jpg")} />
								</GridItem>

							</Grid>
							<CBB />

						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button isLoading={submitState} loadingText='Submitting' onClick={()=> handleSubmit()}>
							Submit Query
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}