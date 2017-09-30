import React from "react";
import * as renderer from "react-test-renderer";
import { PlayerPanel } from "src/components/panels/player-panel";

jest.mock("src/components/player/player", () => ({
	// eslint-disable-next-line react/prop-types
	Player: ({ onPlayerLoaded }) => (
		<div> Player component created and callback passed through to Player with value:
			{onPlayerLoaded()}
		</div>
	)
}));

describe("Player component tests", () => {
	test("Player component renders as expected", () => {
		const component = renderer.create(
			<PlayerPanel onPlayerLoaded={ () => ("mockCallback") } />
		);
		expect(component.toJSON()).toMatchSnapshot();
	});
});
