import { useMemo, useState } from 'react';
import createDate from '../utils/createDate';
import createMonth from '../utils/createMonth';
import getMonthNumberOfDays from '../utils/getMonthNumberOfDays';
import getMonthsNames from '../utils/getMonthsNames';
import getWeekDaysNames from '../utils/getWeekDaysNames';

export const useCalendar = date => {
	const [mode, setMode] = useState('days');
	const [selectedDate, setSelectedDate] = useState(createDate(date));

	const [selectedMonth, setSelectedMonth] = useState(
		createMonth(new Date(selectedDate.year, selectedDate.monthIndex))
	);

	const [selectedYear, selectedSetYear] = useState(selectedDate.year);
	const monthNames = useMemo(() => getMonthsNames(), []);
	const weekDaysNames = useMemo(() => getWeekDaysNames(), []);
	const days = useMemo(() => {
		return selectedMonth.createMonthDays();
	}, [selectedMonth, selectedYear]);
	const firstWeekDay = 2; //Первый день недели понедельник(второй после воскресенья)
	const calendarDays = useMemo(() => {
		const monthNumberOfDays = getMonthNumberOfDays(
			selectedMonth.monthIndex,
			selectedYear
		);
		const prevMonthDays = createMonth(
			new Date(selectedYear, selectedMonth.monthIndex - 1)
		).createMonthDays();

		const nextMonthDays = createMonth(
			new Date(selectedYear, selectedMonth.monthIndex + 1)
		).createMonthDays();

		const firstDay = days[0];
		const lastDay = days[monthNumberOfDays - 1];
		const shiftIndex = firstWeekDay - 1; //Индекс понедельника

		const numberOfPrevDays =
			firstDay.dayNumberInWeek - 1 - shiftIndex < 0
				? 7 - (firstWeekDay - firstDay.dayNumberInWeek)
				: firstDay.dayNumberInWeek - 1 - shiftIndex;

		const numberOfNextDays =
			7 - lastDay.dayNumberInWeek + shiftIndex > 6
				? 7 - lastDay.dayNumberInWeek - (7 - shiftIndex)
				: 7 - lastDay.dayNumberInWeek + shiftIndex;

		const totalCalendarDays = days.length + numberOfNextDays + numberOfPrevDays;
		const result = [];
		for (let i = 0; i < numberOfPrevDays; i++) {
			const inverted = numberOfPrevDays - i;
			result[i] = prevMonthDays[prevMonthDays.length - inverted];
		}
		for (
			let i = numberOfPrevDays;
			i < totalCalendarDays - numberOfNextDays;
			i++
		) {
			result[i] = days[i - numberOfPrevDays];
		}
		for (
			let i = totalCalendarDays - numberOfNextDays;
			i < totalCalendarDays;
			i++
		) {
			result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
		}
		return result;
	}, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

	const onClickArrow = direction => {
		const monthIndex =
			direction === 'left'
				? selectedMonth.monthIndex - 1
				: selectedMonth.monthIndex + 1;
		if (monthIndex === -1) {
			const year = selectedYear - 1;
			selectedSetYear(year);
			return setSelectedMonth(createMonth(new Date(year, 11)));
		}
		if (monthIndex === 12) {
			const year = selectedYear + 1;
			selectedSetYear(year);
			return setSelectedMonth(createMonth(new Date(year, 0)));
		}
		return setSelectedMonth(createMonth(new Date(selectedYear, monthIndex)));
	};

	return {
		state: {
			mode,
			calendarDays,
			weekDaysNames,
			monthNames,
			selectedDate,
			selectedMonth,
			selectedYear,
		},
		functions: {
			onClickArrow,
		},
	};
};
