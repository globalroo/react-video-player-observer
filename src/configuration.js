export const HISTORICAL_EVENTS = 12;

export const getAvailableMedia = () => ([
	{
		name: "Sintel",
		poster: "http://media.w3.org/2010/05/sintel/poster.png",
		src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
	},
	{
		name: "Big Buck Bunny - Trailer",
		poster: "http://media.w3.org/2010/05/bunny/poster.png",
		src: "http://media.w3.org/2010/05/bunny/trailer.mp4",
	},
	{
		name: "Big Buck Bunny - Movie",
		poster: "http://media.w3.org/2010/05/bunny/poster.png",
		src: "http://media.w3.org/2010/05/bunny/movie.mp4",
	},
]);

export const PLAYER_EVENTS_TO_OBSERVE = {
	ABORT: "abort",
	CANPLAY: "canplay",
	CANPLAYTHROUGH: "canplaythrough",
	DURATIONCHANGE: "durationchange",
	EMPTIED: "emptied",
	ENDED: "ended",
	ERROR: "error",
	LOADEDDATA: "loadeddata",
	LOADEDMETADATA: "loadedmetadata",
	LOADSTART: "loadstart",
	PAUSE: "pause",
	PLAY: "play",
	PLAYING: "playing",
	PROGRESS: "progress",
	RATECHANGE: "ratechange",
	RESIZE: "resize",
	SEEKED: "seeked",
	SEEKING: "seeking",
	STALLED: "stalled",
	SUSPEND: "suspend",
	TIMEUPDATE: "timeupdate",
	VOLUMECHANGE: "volumechange",
	WAITING: "waiting",
};
