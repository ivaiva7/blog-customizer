import { CSSProperties, useState } from 'react'
import clsx from 'clsx'
import { Article } from './components/article/Article'
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm'
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from './constants/articleProps'
import { OptionType, defaultArticleState, ArticleStateType } from './constants/articleProps'
import './styles/index.scss'
import styles from './styles/index.module.scss'

export const App = () => {

	const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	)
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	)
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	)
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(defaultArticleState.backgroundColor)
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	)

	const handleApplyChanges = (changes: ArticleStateType) => {
		setSelectedFontFamily(changes.fontFamilyOption)
		setSelectedFontSize(changes.fontSizeOption)
		setSelectedFontColor(changes.fontColor)
		setSelectedBackgroundColor(changes.backgroundColor)
		setSelectedContentWidth(changes.contentWidth)
	}


	const handleReset = () => {
		setSelectedFontFamily(defaultArticleState.fontFamilyOption)
		setSelectedFontSize(defaultArticleState.fontSizeOption)
		setSelectedFontColor(defaultArticleState.fontColor)
		setSelectedBackgroundColor(defaultArticleState.backgroundColor)
		setSelectedContentWidth(defaultArticleState.contentWidth)
	}

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': selectedFontFamily.value,
					'--font-size': selectedFontSize.value,
					'--font-color': selectedFontColor.value,
					'--container-width': selectedContentWidth.value,
					'--bg-color': selectedBackgroundColor.value,
				} as CSSProperties
			}
		>
			<ArticleParamsForm
				selectedFontFamily={selectedFontFamily}
				onSelectFontFamily={setSelectedFontFamily}
				selectedFontSize={selectedFontSize}
				onSelectFontSize={setSelectedFontSize}
				selectedFontColor={selectedFontColor}
				onSelectFontColor={setSelectedFontColor}
				selectedBackgroundColor={selectedBackgroundColor}
				onSelectBackgroundColor={setSelectedBackgroundColor}
				selectedContentWidth={selectedContentWidth}
				onSelectContentWidth={setSelectedContentWidth}
				fontFamilyOptions={fontFamilyOptions}
				fontSizeOptions={fontSizeOptions}
				fontColorOptions={fontColors}
				backgroundColorOptions={backgroundColors}
				contentWidthOptions={contentWidthArr}
				radioGroupName='fontSizeOptions'
				onApplyChanges={handleApplyChanges}
				onReset={handleReset}
				defaultArticleState={defaultArticleState}
			/>
			<Article />
		</div>
	)
}