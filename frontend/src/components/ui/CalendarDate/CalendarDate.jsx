import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import styles from './CalendarDate.module.scss';

const CalendarDate = ({
	number,
	handleAddLunch,
	handleDeleteLunch,
	setCurrentUser,
}) => {
	const currentUser = useContext(CurrentUserContext);
	const [isBooked, setIsBooked] = useState(false);

	useEffect(() => {
		currentUser?.lunches.filter(
			l =>
				new Date(l.date.replace(' ', 'T')).toLocaleDateString('ru') ===
				number.date.toLocaleDateString('ru')
		)[0]
			? setIsBooked(true)
			: setIsBooked(false);
	}, [number]);

	const onClick = async number => {
		if (isBooked) {
			await handleDeleteLunch(number.date)
				.then(res => {
					setIsBooked(false);
					const lunches = currentUser.lunches.filter(l => l.id !== res.data.id);
					setCurrentUser({ ...currentUser, lunches });
				})
				.catch(console.error);
		} else {
			await handleAddLunch(number.date)
				.then(res => {
					const lunches = [...currentUser.lunches, res.data];
					setCurrentUser({ ...currentUser, lunches });
					setIsBooked(true);
				})
				.catch(console.error);
		}
	};
	const d = new Date();
	const localDateString = d.toLocaleDateString().split('.');
	const currentAccessDate = new Date(
		localDateString[2],
		Number(localDateString[1]) - 1,
		Number(localDateString[0]) + 1,
		10
	);

	const lastAccessDate = new Date(
		localDateString[2],
		Number(localDateString[1]) + 1,
		Number(localDateString[0]),
		10
	);
	const currentDate =
		number.date.toLocaleDateString() === d.toLocaleDateString();
	const disabled =
		new Date(number.date) <= currentAccessDate ||
		new Date(number.date) >= lastAccessDate;

	return (
		<button
			className={`${styles.number} ${isBooked ? styles.number_active : ''} ${
				currentDate ? styles.number_current : ''
			} ${disabled ? styles.number_disabled : ''} `}
			onClick={() => onClick(number)}
			disabled={disabled}
		>
			{number.dayNumber}
		</button>
	);
};

export default CalendarDate;
