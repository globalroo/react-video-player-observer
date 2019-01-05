export const realDate = Date;

export const mockDate = (epochTime) => {
	const msOffset = new Date().getTimezoneOffset() * 60 * 1000;
	const utcTime = epochTime + msOffset;
	const constantDate = new Date(utcTime);

	global.Date = class extends Date {
		constructor(timestamp) {
			super();
			if (timestamp) {
				return new realDate(timestamp);
			} else {
				return constantDate;
			}
		}
	};
};
