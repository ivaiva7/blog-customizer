import React, { useRef, useState, useEffect } from 'react'
import { ArrowButton } from '../arrow-button'
import { Button } from '../button'
import { Text } from '../text'
import { Select } from '../select'
import { RadioGroup } from '../radio-group'
import { Separator } from '../separator'
import styles from './ArticleParamsForm.module.scss'
import { OptionType } from 'src/constants/articleProps'

interface IArticleParamsFormProps {
	visible: boolean
	setVisible: (visible: boolean) => void
	selectedFontFamily: OptionType
	onSelectFontFamily: (option: OptionType) => void
	selectedFontSize: OptionType
	onSelectFontSize: (option: OptionType) => void
	selectedFontColor: OptionType
	onSelectFontColor: (option: OptionType) => void
	selectedBackgroundColor: OptionType
	onSelectBackgroundColor: (option: OptionType) => void
	selectedContentWidth: OptionType
	onSelectContentWidth: (option: OptionType) => void
	fontFamilyOptions: OptionType[]
	fontSizeOptions: OptionType[]
	fontColorOptions: OptionType[]
	backgroundColorOptions: OptionType[]
	contentWidthOptions: OptionType[]
	radioGroupName: string
	onApplyChanges: (changes: {
		fontFamily: OptionType
		fontSize: OptionType
		fontColor: OptionType
		backgroundColor: OptionType
		contentWidth: OptionType
	}) => void
	onReset: () => void
}

export const ArticleParamsForm = ({
	visible,
	setVisible,
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
}: IArticleParamsFormProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [tempChanges, setTempChanges] = useState({
		fontFamily: selectedFontFamily,
		fontSize: selectedFontSize,
		fontColor: selectedFontColor,
		backgroundColor: selectedBackgroundColor,
		contentWidth: selectedContentWidth,
	})

	const handleApply = () => {
		onApplyChanges(tempChanges)
	}

	const handleClose = () => {
		setVisible(false)
	}

	const handleFormClick = (event: React.MouseEvent<HTMLFormElement>) => {
		event.stopPropagation()
	}

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				handleClose()
			}
		}
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				handleClose()
			}
		}

		if (visible) {
			document.addEventListener('mousedown', handleClickOutside)
			document.addEventListener('keydown', handleKeyDown)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [visible])

	const containerClasses = [styles.container]
	if (visible) {
		containerClasses.push(styles.container_open)
	}

	return (
		<>
			<ArrowButton onClick={() => setVisible(!visible)} isActive={visible} />
			<aside
				className={containerClasses.join(' ')}
				ref={containerRef}
				onClick={handleClose}
			>
				<form className={styles.form} onClick={handleFormClick}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<div style={{ paddingTop: '50px' }}></div>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						placeholder='Выберите опцию'
						selected={tempChanges.fontFamily}
						onChange={(option) =>
							setTempChanges({ ...tempChanges, fontFamily: option })
						}
					/>
					<div style={{ paddingTop: '50px' }}></div>
					<RadioGroup
						name={radioGroupName}
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={tempChanges.fontSize}
						onChange={(option) =>
							setTempChanges({ ...tempChanges, fontSize: option })
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
						<Button title='Сбросить' type='reset' onClick={onReset} />
						<Button title='Применить' type='button' onClick={handleApply} />
					</div>
				</form>
			</aside>
		</>
	)
}
