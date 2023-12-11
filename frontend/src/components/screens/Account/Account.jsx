import { useContext } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import Layout from '../../layout/Layout';
import styles from './Account.module.scss';

const Account = () => {
	const user = useContext(CurrentUserContext);
	return (
		<Layout>
			<section className={styles.info}>
				<div className={styles.wrapper}>
					<div className={styles.userImage} />
					<div className={styles.title}>
						<h2>{user.name}</h2>
						<p>{user.positions.join(', ')}</p>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Account;
