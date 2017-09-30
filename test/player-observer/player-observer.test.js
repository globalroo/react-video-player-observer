import { PlayerObserver, createDispatcher } from "src/player-observer/player-observer";

const playerState = {
	buffered: 0,
	currentSrc: "test",
	currentTime: 0,
	duration: 0,
	error: {"code": 0, "description": "OK"},
	nativeEvent: {},
	paused: false,
	remainingTime: 0,
	seekeable: undefined,
	seeking: false,
	src: "test"
};

const player = {
	addEventListener: jest.fn(),
	name: "test",
	...playerState
};

describe("Test the PlayerObserver singleton", () => {
	test("getInstance returns the same instance", () => {
		const playerObserver = PlayerObserver.getInstance();
		playerObserver.initialisePlayer(player);
		const playerObserver2 = PlayerObserver.getInstance();
		expect(playerObserver2.player.name).toBe("test");
	});
});

describe("Test the observer subscribes and unsubscribes to the player correctly", () => {
	let unsubscribe;

	test("subscribe a listener to the PlayerObserver", () => {
		const playerObserver = PlayerObserver.getInstance();
		const spy = jest.fn();
		playerObserver.initialisePlayer(player);
		unsubscribe = playerObserver.subscribe("test", spy);
		expect(playerObserver.events).toEqual({"test": {"subscribers": [spy]}});
	});

	test("unsubscribe a listener to the PlayerObserver", () => {
		const playerObserver = PlayerObserver.getInstance();
		unsubscribe();
		expect(playerObserver.events).toEqual({"test": {"subscribers": []}});
	});
});

describe("Test the hocDispatcher creates a function as expected", () => {
	test("create a new dispatcher for an event", () => {
		const context = {
			dispatch: jest.fn()
		};
		const dispatch = createDispatcher(context, "eventName");
		dispatch({ fakeEvent: "evt" });
		expect(context.dispatch).toHaveBeenCalledWith("eventName", { fakeEvent: "evt" });
	});
});

describe("Test the dispatch function", () => {
	test("attempt to dispatch an un-subscribed event", () => {
		const playerObserver = PlayerObserver.getInstance();
		playerObserver.dispatch("unknownEvent", {});
	});
	test("attempt to dispatch an un-subscribed event", () => {
		const playerObserver = PlayerObserver.getInstance();
		const spy = jest.fn();
		const unsubscribe = playerObserver.subscribe("test", spy);
		playerObserver.dispatch("test", {});
		unsubscribe();
		expect(spy).toHaveBeenCalledWith("test", playerState);
	});
});
