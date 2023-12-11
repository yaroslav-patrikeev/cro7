import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import Layout from '../../layout/Layout';
import Button from '../../ui/Button/Button';
import Popup from '../../ui/Popup/Popup';
import ConfirmDeleteScorecardPopup from './ConfirmDeleteScorecardPopup/ConfirmDeleteScorecardPopup';
import ScorecardPopup from './ScorecardPopup/ScorecardPopup';
import styles from './ScorecardsDesigner.module.scss';

const ScorecardsDesigner = ({
	onCreateScorecardPattern,
	getAllPatterns,
	updatePattern,
	deletePattern,
}) => {
	const [isAdd, setIsAdd] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [patterns, setPatterns] = useState([]);
	const [isConfirm, setIsConfirm] = useState(false);
	const [currentPattern, setCurrentPattern] = useState({});
	useEffect(() => {
		getAllPatterns().then(res => setPatterns(res.data));
	}, []);

	return (
		<Layout>
			<section className={styles.whiteBlock}>
				<ul>
					{patterns.map(pattern => (
						<li className={styles.item} key={pattern.id}>
							<span>{pattern.name}</span>
							<div className={styles.buttonContainer}>
								<button
									button='button'
									className={styles.button}
									onClick={() => {
										setIsEdit(true);
										setCurrentPattern(pattern);
									}}
								>
									<FiEdit2 />
								</button>
								<button
									button='button'
									className={styles.button}
									onClick={() => {
										setIsConfirm(true);
										setCurrentPattern(pattern);
									}}
								>
									<AiOutlineDelete />
								</button>
							</div>
						</li>
					))}
				</ul>

				<Button onClick={() => setIsAdd(true)} title='Новый оценочный лист' />
			</section>
			{isAdd && (
				<Popup
					setIsOpen={setIsAdd}
					children={
						<ScorecardPopup
							onCreateScorecardPattern={onCreateScorecardPattern}
							title='Добавить оценочный лист'
							textButton='Добавить'
							setIsAdd={setIsAdd}
							setPatterns={setPatterns}
						/>
					}
				/>
			)}
			{isEdit && (
				<Popup
					setIsOpen={setIsEdit}
					children={
						<ScorecardPopup
							title='Изменить оценочный лист'
							textButton='Сохранить'
							pattern={currentPattern}
							updatePattern={updatePattern}
							setPatterns={setPatterns}
							setIsEdit={setIsEdit}
						/>
					}
				/>
			)}
			{isConfirm && (
				<Popup
					setIsOpen={setIsConfirm}
					children={
						<ConfirmDeleteScorecardPopup
							setIsConfirm={setIsConfirm}
							onClick={() =>
								deletePattern(currentPattern.id).then(() => {
									setPatterns(state =>
										state.filter(obj => obj.id !== currentPattern.id)
									);
									setIsConfirm(false);
								})
							}
						/>
					}
				/>
			)}
		</Layout>
	);
};

export default ScorecardsDesigner;
