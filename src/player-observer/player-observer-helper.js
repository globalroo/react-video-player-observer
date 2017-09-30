export const PLAYER_ERRORS = {
	DECODING_ERROR: "Decoding error",
	FETCH_ABORTED: "Fetch aborted",
	NETWORK_ERROR: "Network error",
	STATE_OK: "OK",
	UNKNOWN_ERROR: "Unknown error",
	UNSUITABLE_MEDIA: "Unsuitable media",
};

export const getPlayerError = ({ code = 0 }) => {
	let description;
	switch (code) {
	case 0:
		description = PLAYER_ERRORS.STATE_OK;
		break;
	case 1:
		description = PLAYER_ERRORS.FETCH_ABORTED;
		break;
	case 2:
		description = PLAYER_ERRORS.NETWORK_ERROR;
		break;
	case 3:
		description = PLAYER_ERRORS.DECODING_ERROR;
		break;
	case 4:
		description = PLAYER_ERRORS.UNSUITABLE_MEDIA;
		break;
	default:
		description = PLAYER_ERRORS.UNKNOWN_ERROR;
	}
	return {
		code,
		description,
	};
};

export const getRemainingTime = ({ duration = 0, currentTime = 0 }) => duration - currentTime;

export const getObservablePlayerProperties = (player, evt) => ({
	buffered: player.buffered,
	currentSrc: player.currentSrc,
	currentTime: player.currentTime,
	duration: player.duration,
	error: getPlayerError(player.error || {}),
	nativeEvent: evt,
	paused: player.paused,
	remainingTime: getRemainingTime(player),
	seekeable: player.seekable,
	seeking: player.seeking,
	src: player.src,
});
