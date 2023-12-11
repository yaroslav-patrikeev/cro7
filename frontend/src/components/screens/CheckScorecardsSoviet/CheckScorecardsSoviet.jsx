import { useEffect, useState } from 'react';
import { useCalendar } from '../../../hooks/useCalendar';
import Layout from '../../layout/Layout';
import DDList from '../../ui/DDList/DDList';
import styles from './CheckScorecardsSoviet.module.scss';

const CheckScorecardsSoviet = ({ onScorecards }) => {
	const { state } = useCalendar();
	const [scoreCards, setScorecards] = useState([]);
	useEffect(() => {
		onScorecards().then(cards => {
			setScorecards(
				cards.data.filter(data =>
					data.user.positions.includes('педагог дополнительного образования')
				)
			);
		});
	}, []);
	const getYears = () => {
		const years = scoreCards.map(card => new Date(card.createAt).getFullYear());
		return years;
	};
	return (
		<Layout>
			<section className={styles.checkScorecard}>
				<form className={styles.form}>
					<DDList defaultValue={state.selectedMonth.monthName}>
						{state.monthNames.map(data => (
							<option key={data.monthIndex} value={data.month}>
								{data.month}
							</option>
						))}
					</DDList>
					<DDList>
						{getYears().map(year => (
							<option value={year}>{year}</option>
						))}
					</DDList>
				</form>
				<div className={styles.wrapper}>
					{scoreCards.map(card => (
						<div>{card.user.name}</div>
					))}
				</div>
			</section>
		</Layout>
	);
};

export default CheckScorecardsSoviet;
