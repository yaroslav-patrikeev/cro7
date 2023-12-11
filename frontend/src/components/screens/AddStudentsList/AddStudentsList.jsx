import { useForm } from 'react-hook-form';
import api from '../../../utils/api';
import Layout from '../../layout/Layout';
import styles from './AddStudentsList.module.scss';

const AddStudentsList = () => {
	const { register, handleSubmit } = useForm();

	const onSubmit = async data => {
		const formData = new FormData();
		formData.append('studentsList', data.studentsList[0]);
		await api.addStudentsList(formData);
	};
	return (
		<Layout>
			<section className={styles.add}>
				<form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
					<h2 className={styles.title}>Добавить список воспитанников</h2>
					<p className={styles.desc}>
						Выберите файл и нажмите кнопку отправить. При повторной загрузке
						старый файл будет удален.
					</p>
					<input type='file' {...register('studentsList')} />
					<button type='submit' className={styles.button}>
						Отправить
					</button>
				</form>
			</section>
		</Layout>
	);
};

export default AddStudentsList;
