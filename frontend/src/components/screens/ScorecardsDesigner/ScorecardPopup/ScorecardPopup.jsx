import { useFieldArray, useForm } from 'react-hook-form';
import { AiFillDelete } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import Button from '../../../ui/Button/Button';
import Field from '../../../ui/Field/Field';
import styles from './ScorecardPopup.module.scss';

const ScorecardPopup = ({
	title,
	textButton,
	onCreateScorecardPattern,
	pattern,
	updatePattern,
	setPatterns,
	setIsEdit,
	setIsAdd,
}) => {
	const { handleSubmit, register, control } = useForm({
		defaultValues: {
			name: pattern?.name,
			positions: pattern?.positions.join(', '),
			fields: pattern?.fields || [{ test: '', maxScore: 0 }],
		},
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'fields',
	});

	const onSubmit = async data => {
		const correctData = {
			...data,
			id: pattern?.id,
			positions: data.positions
				.toLowerCase()
				.split(', ')
				.map(position => position.trim()),
		};
		if (title === 'Добавить оценочный лист') {
			const pattern = await onCreateScorecardPattern(correctData);
			setPatterns(state => [...state, pattern.data]);
			setIsAdd(false);
		} else {
			const pattern = await updatePattern(correctData);
			setPatterns(state => {
				return state.map(el => {
					if (el.id === pattern.data.id) {
						return pattern.data;
					}
					return el;
				});
			});

			setIsEdit(false);
		}
	};
	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h2 className={styles.title}>{title}</h2>
			<Field
				type='text'
				placeholder='Название'
				register={register}
				name='name'
			></Field>
			<Field
				type='text'
				placeholder='Должности'
				register={register}
				name='positions'
			></Field>
			{fields.map((field, i) => (
				<div className={styles.scorecardField} key={field.id}>
					<textarea
						rows='4'
						type='text'
						placeholder='Критерий'
						className={styles.textarea}
						{...register(`fields.${i}.test`)}
					></textarea>
					<Field
						type='number'
						min='0'
						defaultValue='0'
						title='Максимальный балл'
						style={{ width: '65px', alignSelf: 'stretch', border: 0 }}
						register={register}
						name={`fields.${i}.maxScore`}
					></Field>
					{fields.length === i + 1 ? (
						<button
							type='button'
							className={styles.addButton}
							title='Добавить критерий'
							onClick={() => append({ test: '', maxScore: 0 })}
						>
							<GrAdd />
						</button>
					) : (
						<button
							type='button'
							className={styles.addButton}
							title='Удалить критерий'
							onClick={() => remove(i)}
						>
							<AiFillDelete />
						</button>
					)}
				</div>
			))}

			<Button title={textButton} type={'submit'} />
		</form>
	);
};

export default ScorecardPopup;
