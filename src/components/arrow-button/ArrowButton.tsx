import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import React from 'react';
import clsx from 'clsx';


export type OnClick = () => void;

interface IArrowButtonProps {
	onClick?: OnClick;
	isActive?: boolean;
}

export const ArrowButton = ({
								onClick,
								isActive = false,
							}: IArrowButtonProps) => {
	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	};

	return (
		<div
			role='button'
			aria-label={
				isActive
					? 'Закрыть форму параметров статьи'
					: 'Открыть форму параметров статьи'
			}
			tabIndex={0}
			onClick={handleClick}
			onKeyPress={(e) => {
				if (e.key === 'Enter') {
					handleClick();
				}
			}}
			className={clsx(styles.container, {
				[styles.container_open]: isActive,
			})}
		>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow_open]: isActive,
				})}
			/>
		</div>
	);
};
