export const realDate = Date;

export const mockDate = (epochTime) => {
	const constantDate = new Date(epochTime);
	(global).Date = class extends Date {
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
