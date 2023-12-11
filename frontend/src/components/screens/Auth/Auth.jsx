import { useForm } from 'react-hook-form';
import styles from './Auth.module.scss';

const Auth = ({ onLogin }) => {
	const { register, handleSubmit } = useForm();

	return (
		<div className={styles.window}>
			<form className={styles.wrapper} onSubmit={handleSubmit(onLogin)}>
				<h1 className={styles.title}>Корпоративная платформа ГБОУ ЦРО №7</h1>
				<input
					className={styles.input}
					type='email'
					placeholder='Логин'
					{...register('email')}
				/>
				<input
					className={styles.input}
					type='password'
					placeholder='Пароль'
					{...register('password')}
				/>
				<button type='submit' className={styles.button}>
					Войти
				</button>
			</form>
		</div>
	);
};

export default Auth;
