/** should update at some interval
 * {
 * timeStamp, 
 * Q_Volume, 
 * AVGWaitingTime (determined once transaction is completed *the time the sensors go off until a client is connected*),
 * currentTransactionsVolume,
 *  Separate chart for client information 
 * (which they can view their report along with their report data being stored, admins request stored data)
 * ActiveClients ,
 *  AmntOfConnectedClients ,
 * ClientAvgHandlingTime,
 * PeerAvgHandlingTime,
 * {usualMetricst they use (this should be once hovered over available data trend line)}
 * 
 * }
 * there should be a separate section for the client to view their previous metrics,
 * admins view transaction history, volume history, avg wait times, outliers, etc.
*/
import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { render } from 'react-dom';

export default function QueueChart() {
	const data = [12, 36, 55, 25, 35, 10, 40];
	const barRef = useRef(null)
	const w = 600;
	const h = 400;

	useEffect(() => {
		let currentRef = d3.select(barRef.current)
			.append('svg')
			.attr('width', w)
			.attr('height', h)
			.style('padding', 10)
			.style('background-color', 'grey')
			.style("margin-left", 50);

		currentRef.selectAll('bar')
			.data(data)
			.enter()
			.append("rect")
			.attr("x", (d, i) => i * 70)
			.attr("y", (d, i) => h - 10 * d)
			.attr("width", 65)
			.attr("height", (d, i) => d * 10)
			.attr("fill", (d, i) => d > 35 ? "tomato" : "yellow");

	})
	return (
		<div className="parent">
			<div ref={barRef}>

			</div>
		</div>
	)
}