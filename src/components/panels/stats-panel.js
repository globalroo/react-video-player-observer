import "./stats-panel.css";
import React from "react";
import PropTypes from "prop-types";

export const StatsPanel = ({ playerState, eventHistory }) => {
	const currentTime = (playerState && playerState.currentTime) ? playerState.currentTime.toFixed(3) : 0;
	const remainingTime = (playerState && playerState.remainingTime) ? playerState.remainingTime.toFixed(3) : 0;
	const stateClass = ( playerState.error.code !== 0) ? "danger" : "info";
	return (
		<div className="panel panel-default">
			<div className="panel-heading">
				<h4>Observer</h4>
			</div>
			<div className="panel-body">
				<table className="table table-striped table-responsive">
					<tbody>
						<tr>
							<td className="halfColumn">currentTime</td>
							<td className="halfColumn">{currentTime}</td>
						</tr>
						<tr>
							<td>remainingTime</td>
							<td>{remainingTime}</td>
						</tr>
						<tr>
							<td>error?</td>
							<td className={stateClass}>{playerState.error.description} [{playerState.error.code}]</td>
						</tr>
						{
							eventHistory.map(({ event, timeStamp }, ix) => {
								const className = (ix === 0) ? "success latestEvent" : "";
								return (
									<tr className={className} key={ix} >
										<td>{event}</td>
										<td>{timeStamp}</td>
									</tr>
								);
							})
						}
					</tbody>
				</table>
			</div>
		</div>
	);
};

StatsPanel.propTypes = {
	playerState: PropTypes.object,
	eventHistory: PropTypes.array
};
