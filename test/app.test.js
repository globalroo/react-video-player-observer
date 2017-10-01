import * as renderer from "react-test-renderer";
import React from "react";
import { PlayerApp, initialState } from "src/app";
import { getAvailableMedia, HISTORICAL_EVENTS } from "src/configuration";
import { mockDate, realDate } from "test/helpers/date-helper";

const testData = getAvailableMedia();

jest.mock("src/components/panels/controls-panel", () => ({
	ControlsPanel: () => <div> Controls Mock </div>
}));

jest.mock("src/components/panels/stats-panel", () => ({
	StatsPanel: () => <div> Stats Mock </div>
}));

jest.mock("src/components/panels/player-panel", () => ({
	PlayerPanel: ({ onPlayerLoaded }) => {
		onPlayerLoaded({
			src: "SRC",
			poster: "POSTER"
		});
		return <div> Player Mock </div>;
	}
}));

jest.mock("src/player-observer/player-observer", () => ({
	PlayerObserver: {
		getInstance: () => ({
			initialisePlayer: jest.fn(),
			subscribe: jest.fn(),
			unsubscribe: jest.fn()
		}),
	}
}));

describe("Application tests", () => {
	test("Application state is initialised as expected", () => {
		const component = new PlayerApp({ availableMedia: testData });
		expect(component.state).toBe(initialState);
	});

	test("Application state is updated by handleState (called from the observer) correctly", () => {
		const component = new PlayerApp({ availableMedia: testData });
		const newState = { "eventHistory": [{ "event": "test", "timeStamp": "14:00:00.000" }], "playerState": { "currentTime": 0 } };
		component.setState = jest.fn();

		mockDate(1506780000000); // Saturday, 30 September 2017 14:00:00
		component.handleState("test", { currentTime: 0 });
		expect(component.setState).toBeCalledWith(newState);
	});

	test("Application unsubscribes from the registered events in the observer", () => {
		const component = new PlayerApp({ availableMedia: testData });
		const unSubscribeFunction = jest.fn();
		component.eventListeners.push(unSubscribeFunction);
		component.unsubscribeEvents();
		expect(unSubscribeFunction).toHaveBeenCalledTimes(1);
	});

	test("Application cleans up after itself by removing event listeners when unmounting", () => {
		const component = new PlayerApp({ availableMedia: testData });
		component.unsubscribeEvents = jest.fn();
		component.componentWillUnmount();
		expect(component.unsubscribeEvents).toHaveBeenCalledTimes(1);
	});

	test("Application is rendered as expected", () => {
		const component = renderer.create(
			<PlayerApp availableMedia={testData} />
		);
		expect(component.toJSON()).toMatchSnapshot();
	});
});

describe("Event history works as intended", () => {
	afterEach(() => {
		(global).Date = realDate;
	});
	test("Add event history adds a new event", () => {
		const component = new PlayerApp({ availableMedia: testData });
		const expectedResult = [{ "event": "test", "timeStamp": "14:00:00.000" }];
		mockDate(1506780000000); // Saturday, 30 September 2017 14:00:00
		const newEventHistory = component.addEventToHistory("test", []);
		expect(newEventHistory).toEqual(expectedResult);
	});

	test("Add event history adds a new event to the front of the list and pops one off the end of the list", () => {
		const component = new PlayerApp({ availableMedia: testData });
		const fakeEvent = [{ "event": "test", "timeStamp": "13:59:00.000" }];
		const listSize = HISTORICAL_EVENTS;
		const fakeEvents = [];
		for (let i = 0; i < listSize; i++) {
			fakeEvents.push(fakeEvent);
		}
		mockDate(1506780000000); // Saturday, 30 September 2017 14:00:00
		const newEventHistory = component.addEventToHistory("test", fakeEvents);
		expect(newEventHistory).toMatchSnapshot();
		expect(newEventHistory[0].timeStamp).toBe("14:00:00.000");
		expect(newEventHistory).toHaveLength(HISTORICAL_EVENTS);
	});
});
