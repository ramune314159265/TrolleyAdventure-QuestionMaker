import { Box, Text } from '@chakra-ui/react'
import { Application, Assets, Container } from 'pixi.js'
import { useEffect, useRef } from 'react'
import { FitText } from '../pixiComponents/fitText'
import { HologramContainer } from '../pixiComponents/hologramContainer'

export const SelectScenePreview = ({ data }) => {
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
			Assets.addBundle('font', [{ alias: 'Main', src: 'main.otf' }])
			await Assets.loadBundle('font')
		})()
		return () => {
			appRef.current?.destroy?.(true, { children: true })
		}
	}, [])

	useEffect(() => {
		console.log(data, appRef.current)
		if (!appRef.current) {
			return
		}
		const app = appRef.current
		while (app.stage.children[0]) {
			app.stage.removeChild(app.stage.children[0])
		}

		const options = [data.answer, data.options[Math.floor(Math.random() * data.options.length)]].toSorted(() => Math.random() - 0.5)

		const topText = new FitText({
			content: data.content,
			styleOverride: {},
			width: 1280 * 0.9,
			height: 125,
			maxFontSize: 72,
			minFontSize: 16
		})
		topText.x = 1280 / 2
		topText.y = 125
		app.stage.addChild(topText)
		const optionsContainer = new Container()
		optionsContainer.x = 1280 / 2
		optionsContainer.y = 400
		const optionPositions = [-1, 1]
		optionPositions.forEach(async (p, i) => {
			const optionInnerContainer = new Container()
			const hologramWidth = 500
			const hologramHeight = 425
			const optionHologram = new HologramContainer({
				maxWidth: hologramWidth,
				maxHeight: hologramHeight,
				color: '#00ffc8',
				innerContainer: optionInnerContainer,
			})
			optionHologram.x = (1280 / 4) * p
			optionsContainer.addChild(optionHologram)
			optionHologram.show()
			const optionText = new FitText({
				content: options[i]?.content,
				styleOverride: {
					fill: '#80ffce'
				},
				width: hologramWidth * 0.9,
				height: 150,
				maxFontSize: 144,
				minFontSize: 16
			})
			optionText.x = hologramWidth / 2
			optionText.y = hologramHeight / 2
			optionInnerContainer.addChild(optionText)
		})
		app.stage.addChild(optionsContainer)
	}, [data])

	return (
		<>
			<Text>問題が表示されるところ</Text>
			<Box ref={pixiContainer}></Box>
		</>
	)
}
