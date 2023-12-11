import { useState } from 'react';
import Layout from '../../layout/Layout';
import styles from './Register.module.scss';

const Register = () => {
	const [password, setPassword] = useState('');
	const [doublePosition, setDoublePosition] = useState(false);
	function generatePassword(length) {
		let newPassword = '';
		for (let i = 0; i <= length; i++) {
			var chars =
				'0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			const randomNumber = Math.floor(Math.random() * chars.length);
			newPassword += chars[randomNumber];
		}
		setPassword(newPassword);
	}

	return (
		<Layout>
			<section className={styles.register}>
				<div className={styles.wrapper}>
					<h2 className={styles.title}>Регистрация</h2>

					<input
						className={styles.textInput}
						type='text'
						placeholder='Фамилия'
					/>
					<input className={styles.textInput} type='text' placeholder='Имя' />
					<input
						className={styles.textInput}
						type='text'
						placeholder='Отчество'
					/>
					<div className={styles.sex}>
						Пол
						<label for='female'>
							<input
								name='sex'
								value='female'
								id='female'
								type='radio'
								checked
							/>
							женский
						</label>
						<label for='male'>
							<input name='sex' value='male' id='male' type='radio' />
							мужской
						</label>
					</div>
					<input className={styles.textInput} type='text' placeholder='Email' />
					<input
						className={styles.textInput}
						type='text'
						placeholder='Пароль'
						onFocus={() => {
							generatePassword(8);
						}}
						value={password}
					/>
					<div className={styles.moduleInputs}>
						<input
							className={styles.textInput}
							type='text'
							list='positions'
							placeholder='Занимаемая должность'
						/>
						<datalist id='positions'>
							<option value='педагог доп. образования'></option>
							<option value='учитель'></option>
							<option value='секретарь'></option>
							<option value='заместитель директора'></option>
							<option value='директор'></option>
							<option value='воспитатель'></option>
							<option value='младший воспитатель'></option>
						</datalist>
						<button
							onClick={evt => {
								if (!doublePosition) {
									setDoublePosition(true);
									evt.target.textContent = '-';
								} else {
									setDoublePosition(false);
									evt.target.textContent = '+';
								}
							}}
							className={styles.addButton}
							title='Добавить другую должность'
						>
							+
						</button>
					</div>
					{doublePosition && (
						<input
							className={styles.textInput}
							type='text'
							list='positions'
							placeholder='Занимаемая должность'
						/>
					)}
					<select name='' className={styles.accesses} title='Отдел'>
						<option className={styles.test} value='ПДО'>
							ПДО
						</option>
						<option value='администратор'>администратор</option>
					</select>
					<select name='' className={styles.accesses} title='Доступы'>
						<option className={styles.test} value='администратор'>
							сотрудник
						</option>
						<option value='администратор'>администратор</option>
					</select>
					<button type='submit' className={styles.submitButton}>
						Зарегистрировать
					</button>
				</div>
			</section>
		</Layout>
	);
};

export default Register;
