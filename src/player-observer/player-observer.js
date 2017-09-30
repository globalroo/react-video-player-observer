import { getObservablePlayerProperties } from "src/player-observer/player-observer-helper";

export const createDispatcher = (context, eventName) => (evt) => context.dispatch(eventName, evt);

export class PlayerObserver {
	static instance = null;

	static initialised() {
		return (PlayerObserver.instance) ? true : false;
	}

	static getInstance() {
		if (!PlayerObserver.initialised()) {
			PlayerObserver.instance = new PlayerObserver();
		}
		return PlayerObserver.instance;
	}

	constructor() {
		this.events = {};
	}

	initialisePlayer(player) {
		this.player = player;
	}

	bindEvent(eventName) {
		this.events[eventName] = {};
		this.events[eventName].subscribers = [];
		const dispatcher = createDispatcher(this, eventName);
		this.player.addEventListener(eventName, dispatcher);
	}

	dispatch(eventName, evt) {
		if (!this.events[eventName]) {
			return -1;
		}
		this.events[eventName].subscribers.forEach(
			(subscriber) =>
				subscriber(eventName, getObservablePlayerProperties(this.player, evt))
		);
	}

	subscribe(eventName, subscriber) {
		if (!this.events[eventName]) {
			this.bindEvent(eventName);
		}
		this.events[eventName].subscribers.push(subscriber);
		return () => {
			this.events[eventName].subscribers = this.events[eventName].subscribers.filter((fn) => fn !== subscriber);
		};
	}
}
