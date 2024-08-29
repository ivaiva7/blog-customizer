import { createRoot } from 'react-dom/client'
import { StrictMode, CSSProperties, useState } from 'react'
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
import { OptionType } from './constants/articleProps'
import './styles/index.scss'
import styles from './styles/index.module.scss'

const domNode = document.getElementById('root') as HTMLDivElement
const root = createRoot(domNode)

const App = () => {
	const defaultArticleState = {
		fontFamilyOption: fontFamilyOptions[0],
		fontSizeOption: fontSizeOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
	}

	const [paramsFormVisible, setParamsFormVisible] = useState<boolean>(false)
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

	const handleApplyChanges = (changes: {
		fontFamily: OptionType
		fontSize: OptionType
		fontColor: OptionType
		backgroundColor: OptionType
		contentWidth: OptionType
	}) => {
		setSelectedFontFamily(changes.fontFamily)
		setSelectedFontSize(changes.fontSize)
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
				visible={paramsFormVisible}
				setVisible={setParamsFormVisible}
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
			/>
			<Article />
		</div>
	)
}

root.render(
	<StrictMode>
		<App />
	</StrictMode>
)
