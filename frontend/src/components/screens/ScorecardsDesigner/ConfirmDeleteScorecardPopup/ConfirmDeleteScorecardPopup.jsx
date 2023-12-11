import Button from '../../../ui/Button/Button';
import styles from './ConfirmDeleteScorecardPopup.module.scss';
const ConfirmDeleteScorecardPopup = ({ onClick, setIsConfirm }) => {
	return (
		<div className={styles.confirm}>
			<h2>Вы уверены?</h2>
			<p>
				Обратите внимание, что на платформе не предусмотрена возможность
				удаления в корзину. Оценочный лист будет удален безвозвратно!
			</p>
			<div className={styles.buttonContainer}>
				<Button title='Удалить' onClick={onClick} />
				<Button title='Отмена' onClick={() => setIsConfirm(false)} />
			</div>
		</div>
	);
};

export default ConfirmDeleteScorecardPopup;
