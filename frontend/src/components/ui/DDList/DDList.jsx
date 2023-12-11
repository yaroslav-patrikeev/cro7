import styles from './DDList.module.scss';

const DDList = ({ children, ...rest }) => {
	return (
		<select className={styles.ddList} {...rest}>
			{children}
		</select>
	);
};

export default DDList;
