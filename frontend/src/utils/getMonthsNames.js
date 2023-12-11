import createDate from './createDate';

const getMonthsNames = () => {
	const monthsNames = Array(12).fill();
	const d = new Date();
	monthsNames.forEach((_, i) => {
		const { month, monthIndex, monthShort, date } = createDate(
			new Date(d.getFullYear(), d.getMonth() + i, d.getDate())
		);
		monthsNames[monthIndex] = { month, monthIndex, monthShort, date };
	});
	return monthsNames;
};

export default getMonthsNames;
