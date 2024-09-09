import React, { useRef, useState } from 'react';
import { ArrowButton } from '../arrow-button';
import { Button } from '../button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import styles from './ArticleParamsForm.module.scss';
import { OptionType } from 'src/constants/articleProps';
import { useClose } from 'src/hooks/useClose';
import { defaultArticleState, ArticleStateType } from 'src/constants/articleProps';
import {clsx} from "clsx";

interface IArticleParamsFormProps {
	selectedFontFamily: OptionType;
	onSelectFontFamily: (option: OptionType) => void;
	selectedFontSize: OptionType;
	onSelectFontSize: (option: OptionType) => void;
	selectedFontColor: OptionType;
	onSelectFontColor: (option: OptionType) => void;
	selectedBackgroundColor: OptionType;
	onSelectBackgroundColor: (option: OptionType) => void;
	selectedContentWidth: OptionType;
	onSelectContentWidth: (option: OptionType) => void;
	fontFamilyOptions: OptionType[];
	fontSizeOptions: OptionType[];
	fontColorOptions: OptionType[];
	backgroundColorOptions: OptionType[];
	contentWidthOptions: OptionType[];
	radioGroupName: string;
	onApplyChanges: (changes: ArticleStateType) => void;
	onReset: () => void;
	defaultArticleState: ArticleStateType;
}

export const ArticleParamsForm = ({
									  selectedFontFamily,
									  onSelectFontFamily,
									  selectedFontSize,
									  onSelectFontSize,
									  selectedFontColor,
									  onSelectFontColor,
									  selectedBackgroundColor,
									  onSelectBackgroundColor,
									  selectedContentWidth,
									  onSelectContentWidth,
									  fontFamilyOptions,
									  fontSizeOptions,
									  fontColorOptions,
									  backgroundColorOptions,
									  contentWidthOptions,
									  radioGroupName,
									  onApplyChanges,
									  onReset,
									  defaultArticleState,
								  }: IArticleParamsFormProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [visible, setVisible] = useState<boolean>(false)
	const [tempChanges, setTempChanges] = useState(defaultArticleState);

	const handleSubmit = () => {
		onApplyChanges(tempChanges);
	};

	const handleReset = () => {
		setTempChanges(defaultArticleState);
		onReset();
	};

	const handleClose = () => {
		setVisible(false);
	};

	const handleFormClick = (event: React.MouseEvent<HTMLFormElement>) => {
		event.stopPropagation();
	};

	useClose({
		isOpen: visible,
		onClose: handleClose,
		rootRef: containerRef,
	});

	const containerClasses = clsx(styles.container, {
		[styles.container_open]: visible,
	});

	return (
		<>
			<ArrowButton onClick={() => setVisible(!visible)} isActive={visible} />
			<aside
				className={containerClasses}
				ref={containerRef}
				onClick={handleClose}
			>
				<form className={styles.form} onClick={handleFormClick} onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<div style={{ paddingTop: '50px' }}></div>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						placeholder='Выберите опцию'
						selected={tempChanges.fontFamilyOption}
						onChange={(option) =>
							setTempChanges({ ...tempChanges, fontFamilyOption: option })
						}
					/>
					<div style={{ paddingTop: '50px' }}></div>
					<RadioGroup
						name={radioGroupName}
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={tempChanges.fontSizeOption}
						onChange={(option) =>
							setTempChanges({ ...tempChanges, fontSizeOption: option })
						}
					/>
					<div style={{ paddingTop: '50px' }}></div>
					<Select
						title='Цвет шрифта'
						options={fontColorOptions}
						placeholder='Выберите опцию'
						selected={tempChanges.fontColor}
						onChange={(option) =>
							setTempChanges({ ...tempChanges, fontColor: option })
						}
					/>
					<div style={{ marginTop: '50px', marginBottom: '50px' }}>
						<Separator />
					</div>
					<Select
						title='Цвет фона'
						options={backgroundColorOptions}
						placeholder='Выберите опцию'
						selected={tempChanges.backgroundColor}
						onChange={(option) =>
							setTempChanges({ ...tempChanges, backgroundColor: option })
						}
					/>
					<div style={{ paddingTop: '50px' }}></div>
					<Select
						title='Ширина контента'
						options={contentWidthOptions}
						placeholder='Выберите опцию'
						selected={tempChanges.contentWidth}
						onChange={(option) =>
							setTempChanges({ ...tempChanges, contentWidth: option })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
