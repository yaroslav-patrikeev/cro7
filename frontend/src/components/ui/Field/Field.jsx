import styles from './Field.module.scss';

const Field = ({ type, placeholder, register, name, ...rest }) => {
	return (
		<input
			className={styles.field}
			type={type}
			placeholder={placeholder}
			{...register(name)}
			{...rest}
		/>
	);
};

export default Field;
