export const leftPad = (value, expectedLength = 2) => {
	let pad = value.length;
	let paddedValue = `${value}`;
	while (pad < expectedLength) {
		paddedValue = `0${paddedValue}`;
		pad += 1;
	}
	return paddedValue;
};

export const getFormattedTime = (date) => {
	const HH = leftPad(`${date.getHours()}`);
	const MM = leftPad(`${date.getMinutes()}`);
	const SS = leftPad(`${date.getSeconds()}`);
	const sss = leftPad(`${date.getMilliseconds()}`, 3);
	return `${HH}:${MM}:${SS}.${sss}`;
};
