import styles from './Button.module.scss';
const Button = ({ title, type, onClick }) => {
	return (
		<button type={type} onClick={onClick} className={styles.button}>
			{title}
		</button>
	);
};

export default Button;
