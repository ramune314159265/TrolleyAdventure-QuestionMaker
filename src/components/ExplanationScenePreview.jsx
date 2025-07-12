import { Box, Text } from '@chakra-ui/react'
import { Application, Assets, Container, Graphics } from 'pixi.js'
import { useEffect, useRef } from 'react'
import { FitSprite } from '../pixiComponents/fitSprite'
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
			window.__PIXI_DEVTOOLS__ = { app }
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
				data.answer?.explanation,
				data.option?.explanation
			].join('\n'),
			styleOverride: {
				fontSize: 48,
				wordWrap: true,
				wordWrapWidth: hologramWidth,
				breakWords: true,
			}
		})
		explanationText.anchor = { x: 0.5, y: 0 }
		explanationText.x = hologramWidth / 2
		explanationText.y = 100
		explanationInnerContainer.addChild(explanationText)
		optionsContainer.addChild(explanationHologram)
		if (data.answer?.explanationImage) {
			(async () => {
				const texture = await Assets.load({
					src: data.answer.explanationImage,
					format: 'png',
					loadParser: 'loadTextures'
				})
				const image = new FitSprite({ texture, width: hologramWidth, height: hologramHeight })
				image.x = (1280 / 4) * 1
				optionsContainer.addChild(image)
				URL.revokeObjectURL(data.answer.explanationImage)
			})()
		} else {
			const backgroundGraphics = new Graphics()
			backgroundGraphics.rect(-hologramWidth / 2, -hologramHeight / 2, hologramWidth, hologramHeight)
			backgroundGraphics.x = (1280 / 4) * 1
			backgroundGraphics.fill({ color: '#bbbbbb' })
			optionsContainer.addChild(backgroundGraphics)
			const noImageText = new MainText({
				content: 'No Image',
				styleOverride: {
					fontSize: 72,
					fill: '#ffffff'
				}
			})
			noImageText.x = (1280 / 4) * 1
			optionsContainer.addChild(noImageText)
		}
		app.stage.addChild(optionsContainer)
	}, [data])

	return (
		<>
			<Text>解説を表示するところ</Text>
			<Box ref={pixiContainer}></Box>
		</>
	)
}
