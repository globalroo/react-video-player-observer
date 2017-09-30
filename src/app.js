import "./app.css";

import React, { Component } from "react";
import PropTypes from "prop-types";

import { ControlsPanel } from "src/components/panels/controls-panel";
import { PLAYER_EVENTS_TO_OBSERVE, HISTORICAL_EVENTS } from "./configuration";
import { PlayerPanel } from "src/components/panels/player-panel";
import { StatsPanel } from "src/components/panels/stats-panel";
import { PlayerObserver } from "src/player-observer/player-observer";
import { getFormattedTime } from "src/utils/date-helper";

import logo from "./logo.svg";

const playerState = {
	currentTime: 0,
	remainingTime: 0,
	error: {
		code: 0,
		description: ""
	}
};

const selectedAsset = {
	name: "",
	poster: "",
	src: "",
};

export const initialState = {
	playerState,
	selectedAsset,
	eventHistory: []
};

export class PlayerApp extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
		this.eventListeners = [];
		this.observer = PlayerObserver.getInstance();
	}

	primePlayer(payload) {
		this._player.src = this.state.selectedAsset.src;
		this._player.poster = this.state.selectedAsset.poster;
	}

	onPlayerLoaded = (player) => {
		this._player = player;
		this.observer.initialisePlayer(player);
	}

	loadAsset = (selectedAsset) => {
		this.setState(
			() => ({ ...this.state, selectedAsset }),
			this.primePlayer
		);
	}

	addEventToHistory(event, oldEventHistory) {
		const eventHistory = [...oldEventHistory];
		const latestEvent = {
			timeStamp: getFormattedTime(new Date()),
			event,
		};
		if (eventHistory &&
			eventHistory.length === HISTORICAL_EVENTS) {
			eventHistory.pop();
		}
		eventHistory.unshift(latestEvent);
		return eventHistory;
	}

	handleState = (event, playerState) => {
		const eventHistory = this.addEventToHistory(event, this.state.eventHistory);
		const newState = { playerState, eventHistory };
		this.setState (newState);
	}

	subscribeEvents(trackEvents) {
		Object.keys(trackEvents).forEach((event) => {
			this.eventListeners.push(this.observer.subscribe(trackEvents[event], this.handleState));
		});
	}

	unsubscribeEvents() {
		this.eventListeners.forEach((eventUnsubscribeFn) => {
			eventUnsubscribeFn();
		});
	}

	componentDidMount() {
		this.subscribeEvents(PLAYER_EVENTS_TO_OBSERVE);
		this.loadAsset(this.props.availableMedia[0]);
	}

	componentWillUnmount() {
		this.unsubscribeEvents();
	}

	render() {
		return (
			<div className="App container">
				<div className="App-header col-xs-12">
					<img src={logo} className="App-logo" alt="logo" />
					<h4> Player Observer Test Harness </h4>
				</div>
				<div className="player-observer-container">
					<div className="col-xs-12 col-sm-6">
						<PlayerPanel onPlayerLoaded={this.onPlayerLoaded} />
						<ControlsPanel asset={this.state.selectedAsset} loadAsset={this.loadAsset} availableMedia={this.props.availableMedia}/>
					</div>
					<div className="col-xs-12 col-sm-6">
						<StatsPanel playerState={this.state.playerState} eventHistory={this.state.eventHistory}/>
					</div>
				</div>
			</div>
		);
	}
}

PlayerApp.propTypes = {
	availableMedia: PropTypes.array,
};
