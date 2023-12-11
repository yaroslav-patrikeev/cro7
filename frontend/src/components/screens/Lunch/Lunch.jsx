import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useCalendar } from '../../../hooks/useCalendar.js';
import Layout from '../../layout/Layout.jsx';
import CalendarDate from '../../ui/CalendarDate/CalendarDate.jsx';
import styles from './Lunch.module.scss';

const Lunch = ({ handleAddLunch, handleDeleteLunch, setCurrentUser }) => {
	const { state, functions } = useCalendar(new Date());
	return (
		<Layout>
			<div className={styles.wrapper}>
				<section className={styles.info}>
					<h2>Записаться на обед</h2>
					<p>
						Выберите даты в календаре, когда собираетесь обедать. Дождитесь,
						пока день выделится цветом.
					</p>
					<p>
						Запись на обед возможна до 10:00 предыдущего дня и в течение двух
						месяцев.
					</p>
				</section>
				<section className={styles.calendar}>
					<div className={styles.header}>
						<button
							className={styles.arrow}
							type='button'
							onClick={() => functions.onClickArrow('left')}
						>
							<FaArrowLeft />
						</button>
						<span
							className={styles.month}
						>{`${state.selectedMonth.monthName} ${state.selectedYear}`}</span>
						<button
							className={styles.arrow}
							type='button'
							onClick={() => functions.onClickArrow('right')}
						>
							<FaArrowRight />
						</button>
					</div>
					<div className={styles.days}>
						{state.weekDaysNames.map((day, i) => (
							<span key={i} className={styles.day}>
								{day.dayShort}
							</span>
						))}
					</div>
					<div className={styles.numbers}>
						{state.calendarDays.map((number, i) => (
							<CalendarDate
								number={number}
								key={i}
								handleAddLunch={handleAddLunch}
								handleDeleteLunch={handleDeleteLunch}
								setCurrentUser={setCurrentUser}
							/>
						))}
					</div>
				</section>
			</div>
		</Layout>
	);
};

export default Lunch;
