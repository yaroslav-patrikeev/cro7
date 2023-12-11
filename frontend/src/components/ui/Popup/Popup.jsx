import { useClickAway } from '@uidotdev/usehooks';
import { MdClose } from 'react-icons/md';
import styles from './Popup.module.scss';
const Popup = ({ setIsOpen, children }) => {
	const ref = useClickAway(() => {
		setIsOpen(false);
	});
	return (
		<section className={styles.wrapper}>
			<div className={styles.popup} ref={ref}>
				<button onClick={() => setIsOpen(false)} className={styles.close}>
					<MdClose />
				</button>
				{children}
			</div>
		</section>
	);
};

export default Popup;
