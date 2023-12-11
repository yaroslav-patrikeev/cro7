import createDate from './createDate';
import createMonth from './createMonth';

const createYear = ({
	year = createDate().year,
	monthNumber = createDate().monthNumber,
} = {}) => {
	const monthCount = 12;

	const month = createMonth(new Date(year, monthNumber - 1));

	const getMonthDays = monthIndex =>
		createMonth(new Date(year, monthIndex)).createMonthDays();

	const createYearMonths = () => {
		const months = Array(monthCount)
			.fill()
			.map((_, i) => getMonthDays(i));
		return months;
	};

	return {
		createYearMonths,
		month,
		year,
	};
};

export default createYear;
