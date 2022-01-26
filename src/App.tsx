/** Customer Page
 * 
 * add, edit, delete
 * 
 */
/*
	state, City, community, gate, private/public, address, residents, visitors
*/
/**TO DO
 * Stock Chart 
 * autocomplete function to bring up list of residents with basic information
 * then json object passed to Call resident modal along with liscence
 * timer for lunches and breaks
 * timer for processing time (PROPERLY STARTING AND ENDING)
 * volume slider to control audio (buttons to do so)
 * view call history modal
 * programmable button settings for functions
 * 
 * UI Consistency Matching
 * 
 * fixing "work gates button" & sign in status booleans
 * 
 * 
 */
/**page to sign in first before viewing admin tools
 * 
 * 
 * 
 * Show stock chart with
 * 		overall handling time
 * 		(other metrics may be viewed by tab) || 
 * 		(may be viewed what the metrics are at a specific time by just hovering over an existing time where data is available up until that time)
 * 		
 * 		list of employees, once clicked see how they compare to the average
 * 		(again along with other metrics viewed in a tab like fashion)
 * 		
 * 		compared to other shifts
 * 		
 *List of connected clients and their statuses as they change (connect to client gate)
	-view performance button (should show their history as well)

	add/edit CBB to specific gate (with templates)

	send notifications to specific people or the 
	-whole staff connected to the client
 * 
*/ import React, { useState, useEffect } from "react"
import {
	ChakraProvider,
	Box,
	Text,
	Link,
	Grid,
	theme,
	GridItem,
	Image,
	Button,
	Tooltip,
	Tabs, 
	TabList,
	TabPanels, 
	Tab, 
	TabPanel,
	Flex,
	Circle,
	Stack,
	Select,
	Input,
	InputGroup,
	InputRightAddon,
	Skeleton,
	SkeletonText,
	SkeletonCircle,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import $ from 'jquery'

import "./SASS/main.scss";
import "@fontsource/inter";

import { GiEarthAmerica, GiReturnArrow, GiAllSeeingEye } from 'react-icons/gi'
import { BsViewStacked, BsFillGridFill, BsFillGrid3X3GapFill, BsChatSquareQuote } from 'react-icons/bs'
import { FaUserClock, FaHeartbeat, FaAddressCard, FaUserAlt } from 'react-icons/fa'
import { AiOutlineSchedule } from 'react-icons/ai'
import { ImAddressBook } from 'react-icons/im'
import { TiCancelOutline, TiThSmallOutline } from 'react-icons/ti'
import { GrScan } from 'react-icons/gr'
import { HiOutlineMail } from 'react-icons/hi'

import { SignInModal } from "./compenents/login";
import { SearchModal } from "./compenents/search"
import { NotificationModal } from './compenents/notification'
import { CBB } from "./compenents/communityBullitenBoard";
import { LiscenceReader } from "./compenents/liscenceComponent";
import { ViewHistoryModal } from "./compenents/viewHistory";
import { ManualViewModal } from "./compenents/manualViewModal";
import { CallResidentModal } from "./compenents/callResident";
import QueueChart  from "./compenents/q_Component";

import moment from 'moment';
import { render } from "@testing-library/react";
import { MicroPhone } from "./compenents/microphoneComponent";

/*
const webSocketServerPort = 8000;
const webSocketServer = require('websocket').server;
const http =  require("http");

const server = http.createServer();
server.listen(webSocketServerPort);
console.log('listening on port 8000')

const wsServer = new webSocketServer({
	httpServer: server
})

var clients = {}

const getUniqueID = () => {
	const s4 = () => Math.floor( (1+ Math.random()) * 0x10000 ).toString(16).substring(1);
	return s4() + s4() + '-' + s4();
}

wsServer.on('request', function (request: any){
	var userID = getUniqueID();
	console.log(moment().format() + "Recieved a new connection from origin: " + request.origin + ".");

	const connection = request.accept(null, request.orgin);
	
	//clients[userID] = connection;
});

*/
const CountDownTimer = () => {


	const calculateTimeLeft = () => {
		let eventTime = '15';
		let currentTime = (Math.floor(Date.now() / 1000)).toString();
		let leftTime = parseInt(eventTime) - parseInt(currentTime) ;
		let duration = moment.duration(leftTime, 'minutes');
		let interval = 1000;
		if (duration.asSeconds() <= 0) {
			clearInterval(interval);
			//window.location.reload(true); //#skip the cache and reload the page from the server
		}
		duration = moment.duration(duration.asMinutes() - 1, 'minutes');
		return (duration.minutes() + ' Minutes ' + duration.seconds() + ' Seconds');
	}

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
	});


	return (
		<span>{timeLeft}</span>
	)
}

export const App = () => {
	const [searchTerm, setSearchTerm] = useState("")
	const [guardReady, setGuardReady] = useState(false)
	const [tooltipDisabled, setTooltipDisabled] = useState(false)
	const [IDScanState, setIDScanState] = useState(false)
	const [timeState, setTimeState] = useState(moment().format("MM/DD/YYYY | LTS "))

	function handleStatusChange(value: any) {
		if (value == "Not Ready") {
			setGuardReady(false)
		} else if (value == "Ready") {
			setGuardReady(true)
		} else if (value == "Break"){
			setGuardReady(false)
			var win = window.open("https://vclock.com/set-timer-for-15-minutes/", '_blank');
		} else if (value == "Lunch") {
			setGuardReady(false)
			var win = window.open("https://vclock.com/set-timer-for-30-minutes/", '_blank');
		} else if (value == "Rest Room"){
			setGuardReady(false)
		}
	}
	function handleIDScan(){
		setIDScanState(!IDScanState)
		setTimeout(() => {
			setIDScanState(IDScanState)
		}, 1500);
	}
	function time(){
		setTimeState(moment().format("MM/DD/YYYY | LTS "))
	}
	
	setInterval(time, 1000)
	return (
  <ChakraProvider theme={theme}>
	  <Box p={3}>
			<Grid h="97.5vh"
		  	gap={1}
				templateRows='repeat(2, 1fr)'
				templateColumns='repeat(12, 1fr)'
		  >
				<ColorModeSwitcher position="absolute" justifySelf="flex-end" />
					<GridItem rowSpan={2} colSpan={2} bg={"#60788f"} rounded={3}>
						
					<Flex background={"skyblue"} rounded={3}>
						<Image src={require( "./images/Envera-Site-Logo-1.png" )} p={3} />
					</Flex>
						<Text m={1} p={1} rounded={6} border={"1px"} borderBottom="2px" borderColor="black" textAlign={"center"}>[ {timeState} ]</Text>
					<Box p={3} textAlign={"center"} borderBottom={"2px"} borderColor={"black"}>
						<SignInModal />
					</Box>
					
					<Box p={3}>
						<Flex justifyContent={"center"}>
							<Text>Status </Text><FaHeartbeat />
						</Flex>
						<Flex>
							<Select textAlign={"center"} variant={"solid"} bg={"skyblue"} onChange={(event) => handleStatusChange(event.target.value)}>
								<option value="Not Ready">Not Ready</option>
								<option value="Ready">Ready</option>
								<option value="Rest Room">Rest Room</option>
								<option value="Break">Break(15 Minutes)</option>
								<option value="Lunch">Lunch(30 Minutes)</option>
							</Select>
							<Button isDisabled={!guardReady} fontSize={"12px"}>Monitor Gates</Button>
						</Flex>
					</Box>
					<Stack p={3} spacing={3}>
							{guardReady 
							? < ManualViewModal />
								: <Button borderLeft={"2px"} color="darkslategrey" variant="solid" background="slategrey" width={"100%"} isDisabled >
									Manual View <Flex ml={"5px"} border={"1px"}><GiAllSeeingEye fontSize={"32px"} /></Flex>
								</Button>}
							
							< ViewHistoryModal />
						<Tooltip label="Open Remote Email" placement="right" hasArrow>
								<Link href="https://secure.enverasystems.com/owa" target={"_blank"}>
								<Button width="100%" borderLeft={"2px"} color="darkslategrey" variant="solid" background="darkgrey">
									Remote Email <Flex ml={"5px"}> <HiOutlineMail fontSize={"32px"} /> </Flex>
								</Button>
							</Link>
						</Tooltip>

						<Tooltip label="Open Monet Anywhere" placement="right" hasArrow>
								<Link href="https://wfmlive.com/Monet5/login/login.aspx?company=Envera" target={"_blank"}>
								<Button width="100%" borderLeft={"2px"} color="darkslategrey" variant="solid" background="darkgrey">
									Check Schedule <Flex ml={"5px"}> < AiOutlineSchedule fontSize={"32px"}/> </Flex>
								</Button>
							</Link>
							
						</Tooltip>

						<Tooltip label="Open Time Clock PLUS" placement="right" hasArrow>
								<Link href="https://194431.tcplusondemand.com/app/webclock/#/EmployeeLogOn/194431" target={"_blank"}>
								<Button width="100%" borderLeft={"2px"} color="darkslategrey" variant="solid" background="darkgrey">
									Clock In/Out <Flex ml={"5px"}> <FaUserClock fontSize={"32px"}/> </Flex>
								</Button>
							</Link>
							
						</Tooltip>

						<Tooltip label="Open Ring Central" placement="right" hasArrow>
								<Link href="https://app.ringcentral.com/" target={"_blank"}>
								<Button width="100%" borderLeft={"2px"} color="darkslategrey" variant="solid" background="darkgrey">
									Ring Central<Flex ml={"5px"}> <BsChatSquareQuote fontSize={"32px"} /> </Flex>
								</Button>
							</Link>
						</Tooltip>


						<Tooltip label="Open My Envera" placement="right" hasArrow>
								<Link href="https://www.myenvera.com/" target={"_blank"}>
								<Button width="100%" borderLeft={"2px"} color="darkslategrey" variant="solid" background="darkgrey">
									My Envera<Flex ml={"5px"}> <ImAddressBook fontSize={"32px"} /> </Flex>
								</Button>
							</Link>

						</Tooltip>
						<Flex justifyContent={"center"}>
								< CallResidentModal />
						</Flex>
							{/*<CountDownTimer />*/}
					</Stack>
					
					<Flex justifyContent={"center"} alignSelf="end" borderTop={"2px"} borderColor={"black"} p={6} >
						< NotificationModal />
					</Flex>
				</GridItem>
				
					<GridItem rowSpan={2} colSpan={3} bg="slategrey" rounded={3} p={2} overflowY={"scroll"} overflowX={"hidden"}>
						{guardReady
							? <>
								
								{/*< QueueChart />*/}

								<Stack spacing={6}>
									<MicroPhone />

									<Tooltip label="Search (use # for #APT)" placement="right" hasArrow isDisabled={tooltipDisabled}>
										<InputGroup userSelect={"none"}>
											<Input variant={"filled"} onChange={(event) => setSearchTerm(event.target.value)} />
											<Button p={0} variant={"ghost"} onClick={() => setTooltipDisabled(!tooltipDisabled)}>
												<SearchModal searchTerm={searchTerm} />
											</Button>
										</InputGroup>
									</Tooltip>



									<Tooltip label="Open Specific Gate" placement="right" hasArrow>
										<Flex>
											<Select textAlign={"center"}>
												<option>Main gate</option>
												<option disabled >CDD Public Road</option>

											</Select>
											<Button>
												Open Gate <Image src={require("./images/open-gate.png")} height={"28px"} rounded={6} ml={"2px"} id="gateIMG" />
											</Button>
										</Flex>
									</Tooltip>

									<Tooltip label="DENY ENTRY" placement="right" hasArrow>
										<Flex>
											<Select textAlign={"center"} placeholder="Please Choose Catagory">
												<option>Disallowed Per Post Order </option>
											</Select>
											<Button>
												DENY< TiCancelOutline fontSize={"40px"} color="tomato" />
											</Button>
										</Flex>
									</Tooltip>

									<Tooltip label="REJECT" placement="right" hasArrow>
										<Flex>
											<Select textAlign={"center"} placeholder="Please Choose Catagory">
												<option>No One There (Casper)</option>
												<option>Resident Called, No Answer </option>
											</Select>
											<Button>
												REJECT < GiReturnArrow fontSize={"40px"} />
											</Button>
										</Flex>
									</Tooltip>

									<Tooltip label="Transfer" placement="right" hasArrow>
										<Flex>
											<Select textAlign={"center"} placeholder="Please Choose Language">
												<option>Spanish</option>
												<option>Mandarin</option>
											</Select>
											<Button>
												<Text fontSize={"10px"} mr={1}>Transfer</Text><GiEarthAmerica fontSize={"40px"} color="skyblue" />
											</Button>
										</Flex>
									</Tooltip>

									<Flex justifyContent={"center"} borderTop={"2px"} borderColor={"black"} p={6} >
										<CBB />
									</Flex>

								</Stack>
							</>
							: 
							<>
								<Grid overflow={"none"} 
								templateColumns={"repeat(1,1fr)"}
								templateRows={"repeat(3,1fr)"}
								gap={3}
								height={"100%"}>
									<GridItem>
										<Skeleton height={"100%"}>

										</Skeleton>
									</GridItem>
									<GridItem >
										<Skeleton height={"100%"}>

										</Skeleton>
									</GridItem>
									<GridItem  justifyContent={"center"} display={"flex"}>
										<SkeletonCircle mt={4} size={"125px"}/>
									</GridItem>
								</Grid>
							</>}
					
				</GridItem>
				<GridItem rowSpan={2} colSpan={7} bg="slategrey" rounded={3} p={2}>
					{guardReady
					? <>
								<Box >
									<Flex>
										<Select width={"33%"} mr={"8%"} placeholder="Community: Community Name"></Select>
										<Select width={"20%"} mr={"8%"} placeholder="Gate: Main Gate"></Select>
										<Text>Status: No Scanner Inserted</Text>
										<Tooltip label="Scan ID" hasArrow placement="bottom">
											<Button variant={"solid"} colorScheme={"blue"} isDisabled={IDScanState} onClick={() => handleIDScan()}>
												< GrScan />
											</Button>
										</Tooltip>
									</Flex>
									<Tabs variant={"enclosed"} colorScheme={"blue"} defaultIndex={1}>
										<TabList>
											<Tab><BsFillGrid3X3GapFill /></Tab>
											<Tab><BsViewStacked /></Tab>
											<Tab>< BsFillGridFill /></Tab>
											<Tab>< FaAddressCard /></Tab>

										</TabList>

										<TabPanels>
											<TabPanel>
												<Grid boxShadow={"2xl"} mb={3} rounded={6} p={1}
													gap={1}
													templateRows='repeat(3, 1fr)'
													templateColumns='repeat(3, 1fr)'
													overflowY={"scroll"}
													maxH={"800px"}
												>

													<GridItem rounded={6} bg="black" colSpan={1} rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
														<Image src={require("./images/stockPhotos/person_1.jpg")} />
													</GridItem>

													<GridItem rounded={6} bg="black" colSpan={1} rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
														<Image src={require("./images/stockPhotos/person_2.jfif")} />
													</GridItem>

													<GridItem rounded={6} bg="black" colSpan={1} rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
														<Image src={require("./images/stockPhotos/person_3.jpg")} />
													</GridItem>

													<GridItem rounded={6} bg="black" colSpan={1} rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
														<Image src={require("./images/stockPhotos/person_4.jpg")} />
													</GridItem>

													<GridItem rounded={6} bg="black" colSpan={1} rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
														<Image src={require("./images/stockPhotos/person_5.jpg")} />
													</GridItem>

												</Grid>
											</TabPanel>
											<TabPanel rounded={6}>
												<Grid boxShadow={"2xl"} mb={3} rounded={6} p={1}
													gap={1}
													templateRows='repeat(5, 1fr)'
													templateColumns='repeat(1, 1fr)'
													overflowY={"scroll"}
													maxH={"800px"}
												>
													<Text textAlign={"center"}>Camera View: Kiosk</Text>
													<GridItem rounded={6} bg="black" rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
														<Image src={require("./images/stockPhotos/person_1.jpg")} />
													</GridItem>
													<Text textAlign={"center"}>Camera View: Kiosk</Text>
													<GridItem rounded={6} bg="black" rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
														<Image src={require("./images/stockPhotos/person_2.jfif")} />
													</GridItem>
													<Text textAlign={"center"}>Camera View: Kiosk</Text>
													<GridItem rounded={6} bg="black" rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
														<Image src={require("./images/stockPhotos/person_3.jpg")} />
													</GridItem>
													<Text textAlign={"center"}>Camera View: Kiosk</Text>
													<GridItem rounded={6} bg="black" rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
														<Image src={require("./images/stockPhotos/person_4.jpg")} />
													</GridItem>
													<Text textAlign={"center"}>Camera View: Liscence Plate</Text>
													<GridItem rounded={6} bg="black" rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
														<Image src={require("./images/stockPhotos/person_5.jpg")} />
													</GridItem>

												</Grid>
											</TabPanel>
											<TabPanel>
												<Grid boxShadow={"2xl"} mb={3} rounded={6} p={1}
													gap={1}
													templateRows='repeat(3, 1fr)'
													templateColumns='repeat(2, 1fr)'
													overflowY={"scroll"}
													maxH={"800px"}
												>

													<GridItem rounded={6} bg="black" colSpan={1} rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
														<Image src={require("./images/stockPhotos/person_1.jpg")} />
													</GridItem>

													<GridItem rounded={6} bg="black" colSpan={1} rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
														<Image src={require("./images/stockPhotos/person_2.jfif")} />
													</GridItem>

													<GridItem rounded={6} bg="black" colSpan={1} rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
														<Image src={require("./images/stockPhotos/person_3.jpg")} />
													</GridItem>

													<GridItem rounded={6} bg="black" colSpan={1} rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
														<Image src={require("./images/stockPhotos/person_4.jpg")} />
													</GridItem>

													<GridItem rounded={6} bg="black" colSpan={1} rowSpan={1} display={"flex"} justifyContent={"center"} minH={"300px"}>
														<Image src={require("./images/stockPhotos/person_5.jpg")} />
													</GridItem>

												</Grid>
											</TabPanel>
											<TabPanel>
												<Grid boxShadow={"2xl"} mb={3} rounded={6} p={1}
													gap={1}
													templateRows='repeat(3, 1fr)'
													templateColumns='repeat(2, 1fr)'
													overflowY={"scroll"}
													maxH={"800px"}
												>
													<LiscenceReader />
												</Grid>
											</TabPanel>
										</TabPanels>
									</Tabs>
								</Box>
					</>
					: 
					<>
								<SkeletonText mt='4' mr={6} noOfLines={2} spacing='4' height={35} />

								<Grid mt={"5%"}
									templateColumns={"repeat(1,1fr)"}
									templateRows={"repeat(3,1fr)"}
									gap={3}>
									<GridItem>
										<Skeleton height={250}>

										</Skeleton>
									</GridItem>
									<GridItem>
										<Skeleton height={250}>

										</Skeleton>
									</GridItem>
									<GridItem>
										<Skeleton height={250}>

										</Skeleton>
									</GridItem>

								</Grid>
					</>
					}
				</GridItem>
				
		  	</Grid>
	  </Box>
  </ChakraProvider>
)}
