import { getWeekNumber } from './getWeekNumber';

const createDate = (d = new Date()) => {
	const dayNumber = d.getDate();
	const day = d.toLocaleDateString('ru', { weekday: 'long' });
	const dayNumberInWeek = d.getDay() + 1;
	const dayShort = d.toLocaleDateString('ru', { weekday: 'short' });
	const year = d.getFullYear();
	const yearShort = d.toLocaleDateString('ru', { year: '2-digit' });
	const month = d.toLocaleDateString('ru', { month: 'long' });
	const monthShort = d.toLocaleDateString('ru', { month: 'short' });
	const monthNumber = d.getMonth() + 1;
	const monthIndex = d.getMonth();
	const timeStamp = d.getTime();
	const week = getWeekNumber(d);
	return {
		date: d,
		dayNumber,
		day,
		dayNumberInWeek,
		dayShort,
		year,
		yearShort,
		month,
		monthShort,
		monthNumber,
		monthIndex,
		timeStamp,
		week,
	};
};

export default createDate;
