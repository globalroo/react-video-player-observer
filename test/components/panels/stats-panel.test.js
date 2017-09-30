import React from "react";
import * as renderer from "react-test-renderer";
import { StatsPanel } from "src/components/panels/stats-panel";

describe("Stats Panel tests", () => {
	test("Controls panel renders as expected when initialised", () => {
		const playerState = {
			currentTime: 0,
			remainingTime: 100,
			error: {
				code: 0,
				description: ""
			}
		};
		const eventHistory = [{ event: "test", timeStamp: "now" }];
		const component = renderer.create(
			<StatsPanel playerState={playerState} eventHistory={eventHistory}/>
		);
		expect(component.toJSON()).toMatchSnapshot();
	});

	test("Controls panel renders as expected when error state and player at non zero position", () => {
		const playerState = {
			currentTime: 49.500,
			remainingTime: 49.500,
			error: {
				code: 3,
				description: "Decoding error"
			}
		};
		const eventHistory = [{ event: "error", timeStamp: "now" },{ event: "test", timeStamp: "now" }];
		const component = renderer.create(
			<StatsPanel playerState={playerState} eventHistory={eventHistory}/>
		);
		expect(component.toJSON()).toMatchSnapshot();
	});

	test("Controls panel renders as expected when asset completed", () => {
		const playerState = {
			currentTime: 100,
			remainingTime: 0,
			error: {
				code: 0,
				description: "OK"
			}
		};
		const eventHistory = [{ event: "test", timeStamp: "now" }];
		const component = renderer.create(
			<StatsPanel playerState={playerState} eventHistory={eventHistory}/>
		);
		expect(component.toJSON()).toMatchSnapshot();
	});

});
