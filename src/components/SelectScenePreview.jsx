import { Box, Text } from '@chakra-ui/react'
import { Application, Assets, Container } from 'pixi.js'
import { useEffect, useRef } from 'react'
import { FitSprite } from '../pixiComponents/fitSprite'
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
			app.canvas.style.width = '100%'
			app.canvas.style.touchAction = 'unset'
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
				content: data.options[i]?.content,
				styleOverride: {
					fill: '#80ffce'
				},
				width: hologramWidth * 0.9,
				height: 150,
				maxFontSize: 144,
				minFontSize: 16
			})
			optionText.x = hologramWidth / 2
			optionText.y = data.options[i].image ? hologramHeight * 0.8 : hologramHeight / 2
			if (data.options[i].image) {
				const texture = await Assets.load({
					src: data.options[i].image,
					format: 'png',
					loadParser: 'loadTextures'
				})
				const image = new FitSprite({ texture, width: hologramWidth * 0.9, height: hologramHeight * 0.9 })
				image.x = hologramWidth / 2
				image.y = hologramHeight / 2
				optionInnerContainer.addChild(image)
				URL.revokeObjectURL(data.options[i].image)
			}
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
