import { pdoScorecard } from '../../../patterns/pdoScorecard';
import Layout from '../../layout/Layout';
import styles from './FillScoreCard.module.scss';

const FillScorecard = () => {
	return (
		<Layout>
			<section className={styles.fillScorecard}>
				<form className={styles.wrapper}>
					<h2>Оценочный лист показателей эффективности деятельности</h2>
					{pdoScorecard.map(field => (
						<div className={styles.row}>
							<p>{field.test}</p>
							<p>0-{field.score}</p>
							<input type='number' min={0} max={field.score} defaultValue={0} />
							<textarea></textarea>
						</div>
					))}
				</form>
			</section>
		</Layout>
	);
};

export default FillScorecard;
