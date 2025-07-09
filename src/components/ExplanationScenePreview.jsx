import { Box, Text } from '@chakra-ui/react'
import { Application, Container } from 'pixi.js'
import { useEffect, useRef } from 'react'
import { HologramContainer } from '../pixiComponents/hologramContainer'
import { MainText } from '../pixiComponents/mainText'

const stringSplitByLength = (str, length) => {
	const result = []
	for (let i = 0; i < str.length; i += length) {
		result.push(str.slice(i, i + length))
	}
	return result
}

export const ExplanationScenePreview = ({ data }) => {
	const pixiContainer = useRef(null)
	const appRef = useRef(null)
	let ran = false

	useEffect(() => {
		(async () => {
			if (ran) {
				return
			}
			ran = true
			if (appRef.current) {
				return
			}
			const app = new Application()
			await app.init({
				background: '#000000',
				width: 1280,
				height: 720
			})
			pixiContainer.current.appendChild(app.canvas)
			window.__PIXI_DEVTOOLS__ = { app }
			app.canvas.style.width = 'stretch'
			appRef.current = app
		})()
		return () => {
			appRef.current?.destroy?.(true, { children: true })
		}
	}, [])

	useEffect(() => {
		if (!appRef.current) {
			return
		}
		const app = appRef.current
		while (app.stage.children[0]) {
			app.stage.removeChild(app.stage.children[0])
		}

		const optionsContainer = new Container()
		optionsContainer.x = 1280 / 2
		optionsContainer.y = 400
		const hologramWidth = 500
		const hologramHeight = 425
		const explanationInnerContainer = new Container()
		const explanationHologram = new HologramContainer({
			maxWidth: hologramWidth,
			maxHeight: hologramHeight,
			color: '#00ffc8',
			innerContainer: explanationInnerContainer,
		})
		explanationHologram.show()
		explanationHologram.x = (1280 / 4) * -1
		optionsContainer.addChild(explanationHologram)
		const explanationTopText = new MainText({
			content: '解説',
			styleOverride: {
				fontSize: 72,
			}
		})
		explanationTopText.x = hologramWidth / 2
		explanationTopText.y = 50
		explanationInnerContainer.addChild(explanationTopText)
		const explanationText = new MainText({
			content: [
				...stringSplitByLength(data.answer?.explanation ?? '', 12),
				...stringSplitByLength(data.option?.explanation ?? '', 12)
			].join('\n'),
			styleOverride: {
				fontSize: 48,
			}
		})
		explanationText.anchor = { x: 0, y: 0 }
		explanationText.x = 10
		explanationText.y = 100
		explanationInnerContainer.addChild(explanationText)
		optionsContainer.addChild(explanationHologram)
		app.stage.addChild(optionsContainer)
	}, [data])

	return (
		<>
			<Text>解説を表示するところ</Text>
			<Box ref={pixiContainer}></Box>
		</>
	)
}
