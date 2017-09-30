import React from "react";
import * as renderer from "react-test-renderer";
import { Player } from "src/components/player/player";

describe("Player component tests", () => {
	test("Player component renders as expected", () => {
		const spy = jest.fn();
		const component = renderer.create(
			<Player onPlayerLoaded={spy} />
		);
		expect(component.toJSON()).toMatchSnapshot();
		expect(spy).toHaveBeenCalledTimes(1);
	});
});
