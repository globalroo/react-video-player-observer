import React from "react";
import * as renderer from "react-test-renderer";
import { getAvailableMedia } from "src/configuration";
import { ControlsPanel, MovieButton, createClickHandler } from "src/components/panels/controls-panel";

describe("Controls Panel tests", () => {

	const availableMedia = getAvailableMedia();

	test("Controls panel renders as expected", () => {
		const asset = availableMedia[0];
		const component = renderer.create(
			<ControlsPanel
				asset={asset}
				loadAsset={() => {}}
				availableMedia={availableMedia}
			/>
		);
		expect(component.toJSON()).toMatchSnapshot();
	});

	test("MovieButton renders as expected", () => {
		const asset = availableMedia[0];
		const component = renderer.create(
			<MovieButton
				asset={asset}
				loadAsset={() => {}}
			/>
		);
		expect(component.toJSON()).toMatchSnapshot();
	});

	test("Click handler creates a HoC that calls the callback triggernig asset to change in UI", () => {
		const asset = availableMedia[0];
		const spyLoadAsset = jest.fn();
		const hocClickHandler = createClickHandler({asset, loadAsset: spyLoadAsset});
		hocClickHandler();
		expect(spyLoadAsset).toHaveBeenCalledWith(asset);
	});
});
