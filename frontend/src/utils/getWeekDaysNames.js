import createDate from './createDate';

const getWeekDaysNames = () => {
	const weekDaysNames = Array(7).fill();
	const d = new Date();
	weekDaysNames.forEach((_, i) => {
		const { day, dayNumberInWeek, dayShort } = createDate(
			new Date(d.getFullYear(), d.getMonth(), d.getDate() + i)
		);
		weekDaysNames[dayNumberInWeek - 1] = { day, dayShort };
	});

	return [...weekDaysNames.slice(1), weekDaysNames[0]];
};

export default getWeekDaysNames;
