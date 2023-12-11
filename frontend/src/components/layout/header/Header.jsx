import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.content}>
				<Link to='/' className={styles.logo}>
					Корпоративная платформа ЦРО 7
				</Link>
				<Link to='/user' className={styles.account}>
					<AiOutlineUser />
					Аккаунт
				</Link>
			</div>
		</header>
	);
};

export default Header;
