import { getPlayerError, getObservablePlayerProperties } from "src/player-observer/player-observer-helper";

describe ("Player observer helper test", () => {
	test("Error code 0 returns as expected", () => {
		const expected = {"code": 0, "description": "OK"};
		const code = 0;
		const errorObj = getPlayerError({ code });
		expect(errorObj).toEqual(expected);
	});
	test("Error code 1 returns as expected", () => {
		const expected = {"code": 1, "description": "Fetch aborted"};
		const code = 1;
		const errorObj = getPlayerError({ code });
		expect(errorObj).toEqual(expected);
	});
	test("Error code 2 returns as expected", () => {
		const expected = {"code": 2, "description": "Network error"};
		const code = 2;
		const errorObj = getPlayerError({ code });
		expect(errorObj).toEqual(expected);
	});
	test("Error code 3 returns as expected", () => {
		const expected = {"code": 3, "description": "Decoding error"};
		const code = 3;
		const errorObj = getPlayerError({ code });
		expect(errorObj).toEqual(expected);
	});
	test("Error code 4 returns as expected", () => {
		const expected = {"code": 4, "description": "Unsuitable media"};
		const code = 4;
		const errorObj = getPlayerError({ code });
		expect(errorObj).toEqual(expected);
	});
	test("Error code unknown returns as expected", () => {
		const expected = {"code": 12345, "description": "Unknown error"};
		const code = 12345;
		const errorObj = getPlayerError({ code });
		expect(errorObj).toEqual(expected);
	});
});

describe ("getObservableProperties returns expected structure", () => {
	test("getObservablePlayerProperties", () => {
		const evt = "test";
		const player = {
			buffered: 0,
			currentSrc: "test",
			currentTime: 10,
			duration: 100,
			error: { code: 0, description: "OK"},
			nativeEvent: evt,
			paused: false,
			seekable: null,
			seeking: false,
			src: "test"
		};
		const playerState = getObservablePlayerProperties(player, evt);
		expect(playerState).toMatchSnapshot();
	});

	test("getObservablePlayerProperties with bad values", () => {
		const evt = "test";
		const player = {
			buffered: 0,
			currentSrc: "test",
			currentTime: undefined,
			duration: undefined,
			nativeEvent: evt,
			paused: false,
			seekable: null,
			seeking: false,
			src: "test"
		};
		const playerState = getObservablePlayerProperties(player, evt);
		expect(playerState).toMatchSnapshot();
	});
});
