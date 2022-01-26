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
	Grid,
	Circle,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Table,
	TableCaption,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Tfoot,
	Checkbox,
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	AccordionIcon
} from "@chakra-ui/react"

import { MdContactPhone } from 'react-icons/md'
import { LiscenceReader } from './liscenceComponent'
import { BsFillPersonLinesFill, BsHouse } from 'react-icons/bs'
import { MdPhonePaused, MdPhoneInTalk, MdConnectWithoutContact } from 'react-icons/md'
import { FiPhoneOff } from 'react-icons/fi'
import { TiGroup} from 'react-icons/ti'
import { RiKakaoTalkLine } from 'react-icons/ri'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import moment from 'moment'
import $ from "jquery"
import { CBB } from './communityBullitenBoard'
import { MicroPhone } from './microphoneComponent'

export const CallResidentModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [dateDisable, setDateDisable] = useState(false)
	function handleStayTypeChange(){

	}
	/**
 * Self-adjusting interval to account for drifting
 * 
 * @param {function} workFunc  Callback containing the work to be done
 *                             for each interval
 * @param {int}      interval  Interval speed (in milliseconds)
 * @param {function} errorFunc (Optional) Callback to run if the drift
 *                             exceeds interval
 */
	function AdjustingInterval(workFunc, interval, errorFunc) {
		var that = this;
		var expected, timeout;
		this.interval = interval;

		this.start = function () {
			expected = Date.now() + this.interval;
			timeout = setTimeout(step, this.interval);
		}

		this.stop = function () {
			clearTimeout(timeout);
		}

		function step() {
			var drift = Date.now() - expected;
			if (drift > that.interval) {
				// You could have some default stuff here too...
				if (errorFunc) errorFunc();
			}
			workFunc();
			expected += that.interval;
			timeout = setTimeout(step, Math.max(0, that.interval - drift));
		}
	}

	// Define what to do if something goes wrong
	var doError = function () {
		console.warn('The drift exceeded the interval.');
	};

	// (The third argument is optional)
	var seconds = 0;
	
	function timer(){
		seconds++;
		var formattedTime = moment.utc(seconds * 1000).format('mm[m]:ss[s]') 
		document.getElementById("timerState").innerText = `Call Time: [ ${formattedTime} ]`
	}
	var ticker = new AdjustingInterval(timer, 1000, doError);

	function HandleOpen(){
		onOpen()
		ticker.start()
	}
	function HandleClose(){
		ticker.stop()
		onClose()
	}
	
	return (
		<>
			<Tooltip label="Call Resident" placement={"top"} hasArrow>
				<Circle size={"50px"} bg="slategrey" fontSize={"20px"} border="2px" cursor="pointer" onClick={()=> HandleOpen()}>
					<MdContactPhone />
				</Circle>
			</Tooltip>

			<Modal onClose={()=>HandleClose()} isOpen={isOpen} size={"6xl"} scrollBehavior='none'>
				<ModalOverlay />
				<ModalContent opacity={.5} height={850}>
					<ModalHeader display={"block"}>
						<Flex justifyContent={"center"}>
							<Image src={require("../images/Envera-Site-Logo-1.png")} p={3} height={"125px"} />
						</Flex>
						<Text border={"1px"} p={1} rounded={3} textAlign={"center"}>Community: <u>Example Community</u> | Gate: <u>Example Gate</u> </Text>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody display={"flex"} justifyContent={"center"}>
						<Box width={"100%"}>
							<Grid p={1}
								templateRows='repeat(1, 1fr)'
								templateColumns='repeat(2, 1fr)'
								gap={1}
								
							> 
								<GridItem rowSpan={1} colSpan={1} borderRight={"1px"}>
									{/**creating state for time in seconds and post a date when it was completed
									 * along with passing the state 
									 * 
									 * and also setting tabs to access other information as well, CBB, residents, visitors information
									 */}
									 <Tabs isFitted variant={"enclosed"} defaultIndex={1}>
										 <TabList>
											<Tooltip hasArrow label="Resident Information" placement='top'>
												<Tab fontSize={24}>
													<TiGroup />
												</Tab>
											</Tooltip>
											<Tooltip hasArrow label="Call Resident" placement='top'>

											<Tab fontSize={24}>
									 			<MdPhoneInTalk />
											</Tab>
											</Tooltip>
											<Tab transform={"scale(0.5, 0.5)"}  mb={2} height={35} isDisabled>
												 <CBB />
											 </Tab>
										 </TabList>
										 <TabPanels>
											 <TabPanel>
												 <Grid 
												 templateColumns={"repeat(2,1fr)"}
												templateRows={"repeat(1,1fr)"}>
													<GridItem borderLeft={"1px"} pl={1} borderRight={"1px"} borderTop={"1px"} roundedTopLeft={3}>
														<AiOutlineInfoCircle />Head of Household:<Text display={"flex"} justifyContent={"center"}> Example Name</Text>
													</GridItem>
													<GridItem borderRight={"1px"} pl={1} borderTop={"1px"} roundedTopRight={3}>
														<BsHouse />
														<Text display={"flex"} justifyContent={"center"}><i>3456 Somewhere Ave, Tallahassee, FL, 32399</i></Text>
													</GridItem>
												 </Grid>
												 
												<Accordion allowToggle>
													<AccordionItem>
														<h2>
															<AccordionButton background={"cornflowerblue"} roundedTop={4}>
																<Box flex='1' textAlign='left'>
																	Registered Residents
																</Box>
																<AccordionIcon />
															</AccordionButton>
														</h2>
														<AccordionPanel pb={4}>
															Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
															tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
															veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
															commodo consequat.
														</AccordionPanel>
														
													</AccordionItem>
													<AccordionItem>
														<h2>
															<AccordionButton background={"skyblue"} roundedBottom={4}>
																<Box flex='1' textAlign='left'>
																	Registered Vistors
																</Box>
																<AccordionIcon />
															</AccordionButton>
														</h2>
														<AccordionPanel pb={4}>
															Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
															tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
															veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
															commodo consequat.
														</AccordionPanel>
													</AccordionItem>
													
												</Accordion>
											 </TabPanel>

											 <TabPanel>
												<Text id="timerState" justifyContent={"center"} display={"flex"} fontSize={30}>Call Time: [ 00m:00s]</Text>

												<Text id="callState" border={"1px"} rounded={3} display={"flex"} justifyContent={"center"}>
													Connected <RiKakaoTalkLine fontSize={32} />
												</Text>
												<Flex justifyContent={"center"} p={1} height={350} overflowY={"scroll"}>
													
													<Table variant='striped' colorScheme='messenger' >
														<Thead>
															<Tr>
																<Th width={50}>Select</Th>
																<Th>Extension</Th>
																<Th>Phone Number </Th>
																<Th >Type</Th>
															</Tr>
														</Thead>
														<Tbody>
															<Tr>
																<Td><Checkbox /></Td>
																<Td>US +1</Td>
																<Td>Phone Number</Td>
																<Td>Prop. Owner</Td>
															</Tr>
															<Tr>
																<Td><Checkbox /></Td>
																<Td>US +1</Td>
																<Td>Phone Number</Td>
																<Td>Tenant</Td>
															</Tr>
															<Tr>
																<Td><Checkbox /></Td>
																<Td>US +1</Td>
																<Td>Phone Number</Td>
																<Td>Tenant</Td>
															</Tr>

														</Tbody>
														<Tfoot>
															<Th colSpan={4}>
																<Flex>
																	<Box>
																		Add Number
																		<Input placeholder='(xxx)xxx-xxxx' pattern='[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}' />
																	</Box>
																	<Select mt={4} width={200}>
																		<option>Tenant</option>
																		<option>Primary</option>
																		<option>Secondary</option>
																	</Select>
																	<Button mt={4}>Submit</Button>
																</Flex>
															</Th>
														</Tfoot>
													</Table>
												</Flex>
												<Grid
													templateRows={"repeat(1, 1fr)"}
													templateColumns={"repeat(3, 1fr)"}>
													<GridItem colSpan={1} justifyContent={"center"} display={"flex"}>
														<Tooltip hasArrow label="Call" color={"blue.500"}>
															<Button p={3} width={150}> <MdPhoneInTalk fontSize={32} /> </Button>
														</Tooltip>
													</GridItem>
													<GridItem colSpan={1} justifyContent={"center"} display={"flex"}>
														<Tooltip hasArrow label="Hold">
															<Button p={3} width={150}> <MdPhonePaused fontSize={32} /> </Button>
														</Tooltip>
													</GridItem>
													<GridItem colSpan={1} justifyContent={"center"} display={"flex"}>
														<Tooltip hasArrow label="Hang Up" color={"red"}>
															<Button p={3} width={150}> <FiPhoneOff fontSize={32} /> </Button>
														</Tooltip>
													</GridItem>
												</Grid>
											 </TabPanel>
										 </TabPanels>
									 </Tabs>
									
									
								</GridItem>
								<GridItem rowSpan={1} colSpan={1} >
									<Tabs isFitted variant='enclosed' shadow={"0px 0px 3px 1px rgba(0,0,0,1)"}>
										<TabList >
											<Tab >
												Add Visitor
											</Tab>
											<Tab>
												View License
												<Flex border={"1px"} ml={1} pl={2} pr={2} pt={1} pb={1} rounded={3}>
													< BsFillPersonLinesFill />
												</Flex>  
											</Tab>
											{/*create a state within which we're in a call or not and swtich on said state*/}
											<Tab isDisabled >
												<MicroPhone />
											</Tab>
										</TabList>
										<TabPanels >

											<TabPanel >
												<Flex display={"block"} >
													Name
													<Input m={1} placeholder='Input Name Here' />
													<Text>How Long Is Thier Stay?</Text>
													<Select m={1}>
														<option>Temporary</option>
														<option>Permanent</option>
														<option>Contractor</option>
														<option>One Time</option>
													</Select>
													<Box  rounded={3}>
														<Text textAlign={"center"}>Until When?</Text>
														<Flex p={1}>
															<Text fontSize={"20px"} width={75}>From :</Text>
															<Input type={"date"}
																defaultValue={moment().format("YYYY-MM-DD")}
																disabled={dateDisable}  />
														</Flex>
														<Flex p={1}>
															<Text fontSize={"20px"} width={75}>To :</Text>
															<Input type={"date"}
																defaultValue={moment().format("YYYY-MM-DD") } 
																disabled={dateDisable}/>

														</Flex>
														<Button m={3} colorScheme={"blue"} variant={"solid"} loadingText='Submitting' isActive position={"relative"} top={"30px"}left={"75%"}>Add Visitor</Button>
													</Box>
													
												</Flex>
											</TabPanel>

											<TabPanel height={450} overflowY={"scroll"}>
												< LiscenceReader />
											</TabPanel>

										</TabPanels>
									</Tabs>
								</GridItem>
							</Grid>
						</Box>
					</ModalBody>
					<ModalFooter>
						<Button onClick={() => HandleClose()}> Done </Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}