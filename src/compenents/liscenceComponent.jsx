import React, { useState } from 'react'

import {
	Text,
	theme,
	GridItem,
	Image,
	Button,
	Tooltip,
	Input,
	InputGroup,
} from "@chakra-ui/react"

import { FaClipboardCheck } from 'react-icons/fa'
import { GoClippy, GoHome } from 'react-icons/go'
import { BsFillPersonLinesFill, BsFillPersonFill } from 'react-icons/bs'


export const LiscenceReader = () => {
	const [copied, setCopied] = useState(false)
	const [addressCopied, setAddressCopied] = useState(false)
	const [fullCopy, setFullCopy] = useState(false)
	const [IDFirst, setIDFirst] = useState("Joseph")
	const [IDMiddle, setIDMiddle] = useState("A")
	const [IDLast, setIDLast] = useState("Sample")
	const [IDAddress, setIDAddress] = useState("3456 Somewhere Ave, Tallahassee, FL, 32399")
	const [clipboardText, setClipboardText] = useState("")

	return(
		<>
			<GridItem rounded={6} colSpan={1} rowSpan={1} justifyContent={"center"} minH={"300px"} theme={theme}>
				<InputGroup mt={3}>
					<Text ml={1} width={"150px"}>First Name</Text>
					<Input mr={2} value={IDFirst} readOnly/>
				</InputGroup>

				<InputGroup mt={3}>
					<Text ml={1} width={"150px"}>Middle Name</Text>
					<Input mr={2} value={IDMiddle} readOnly/>
				</InputGroup>

				<InputGroup mt={3}>
					<Text ml={1} width={"150px"}>Last Name</Text>
					<Input mr={2} value={IDLast} readOnly/>
				</InputGroup>

				<InputGroup mt={3}>
					<Text ml={1} width={"150px"}>Address</Text>
					<Input mr={2} value={IDAddress} readOnly/>
				</InputGroup>

				<Tooltip label="Copy Name To Clipboard" hasArrow placement="left">
					<Button width={"100%"}
						onClick={() => {
							setClipboardText(IDFirst + " " + IDMiddle + " " + IDLast)
							console.log(clipboardText)
							navigator.clipboard.writeText(clipboardText)
							setCopied(!copied)

							setTimeout(() => {
								setCopied(copied)
							}, 500);
						}}
						isDisabled={copied}>
						{copied
							? <FaClipboardCheck />
							: <GoClippy />}
						<BsFillPersonFill />

					</Button>
				</Tooltip>
				<Tooltip label="Copy Address To Clipboard" hasArrow placement="left">
					<Button width={"100%"}
						onClick={() => {
							setClipboardText(IDAddress)
							console.log(clipboardText)
							navigator.clipboard.writeText(clipboardText)
							setAddressCopied(!addressCopied)

							setTimeout(() => {
								setAddressCopied(addressCopied)
							}, 500);
						}}
						isDisabled={addressCopied}>
						{addressCopied
							? <FaClipboardCheck />
							: <GoClippy />}
						<GoHome />

					</Button>
				</Tooltip>
				<Tooltip label="Copy Everything To Clipboard" hasArrow placement="left">
					<Button width={"100%"}
						onClick={() => {
							setClipboardText(IDFirst + " " + IDMiddle + " " + IDLast + ", " + IDAddress)
							console.log(clipboardText)
							navigator.clipboard.writeText(clipboardText)
							setFullCopy(!fullCopy)

							setTimeout(() => {
								setFullCopy(fullCopy)
							}, 500);
						}}
						isDisabled={fullCopy}>
						{fullCopy
							? <FaClipboardCheck />
							: <GoClippy />}
						<BsFillPersonLinesFill />

					</Button>
				</Tooltip>
			</GridItem>
			<GridItem rounded={6} bg="black" colSpan={1} rowSpan={1} display={"flex"} justifyContent={"center"} >
				<Image src={require("../images/stockPhotos/florida-driver-license.png")} rounded={6} />
			</GridItem>
		</>
	)
}

