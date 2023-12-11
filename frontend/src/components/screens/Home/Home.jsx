import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../../constants/path.constants';
import Layout from '../../layout/Layout';
import styles from './Home.module.scss';

const Home = () => {
	const navigate = useNavigate();
	return (
		<Layout>
			<section className={styles.cards}>
				<button className={styles.card} onClick={() => navigate('/lunch')}>
					Записаться на обед
				</button>
				<button
					className={styles.card}
					onClick={() => navigate('/fill-scorecard')}
				>
					Заполнить оценочный лист
				</button>
				<button
					className={styles.card}
					onClick={() =>
						(window.location.href = `${apiUrl}/uploads/studentsList.xlsx`)
					}
				>
					Список воспитанников
				</button>
				<button
					className={styles.card}
					style={{ backgroundColor: 'yellow' }}
					onClick={() => navigate('/sign-up')}
				>
					Зарегистрировать сотрудника
				</button>
				<button
					className={styles.card}
					onClick={() => navigate('/add-students-list')}
					style={{ backgroundColor: 'yellow' }}
				>
					Добавить список воспитанников
				</button>
				<button
					className={styles.card}
					style={{ backgroundColor: 'gray' }}
					onClick={() => navigate('/check-scorecards-soviet')}
				>
					Проверить оценочные листы (Управляющий совет)
				</button>
				<button
					className={styles.card}
					style={{ backgroundColor: 'gray' }}
					onClick={() => navigate('/check-scorecards-administration')}
				>
					Проверить оценочные листы (Руководство)
				</button>
				<button
					className={styles.card}
					style={{ backgroundColor: 'yellow' }}
					onClick={() => navigate('/scorecards-designer')}
				>
					Конструктор оценочных листов
				</button>
			</section>
		</Layout>
	);
};

export default Home;
