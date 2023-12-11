import Header from './header/Header';
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<div className={styles.content}>{children}</div>
			</main>
			<footer></footer>
		</>
	);
};

export default Layout;
