import { AccordionItem, AccordionItemContent, AccordionItemIndicator, AccordionItemTrigger, AccordionRoot, Image, Span, Text, VStack } from '@chakra-ui/react'

export const HowToSend = () => {
	return (
		<AccordionRoot collapsible multiple >
			<AccordionItem value='windows'>
				<AccordionItemTrigger>
					<Span>送り方（学校のタブレット）</Span>
					<AccordionItemIndicator></AccordionItemIndicator>
				</AccordionItemTrigger>
				<AccordionItemContent>
					<VStack gap={4} alignItems="flex-start">
						<Text>1. 保存を押す</Text>
						<Image src='windows1.png' />
						<Text>2. 上のGoogleフォームのリンクを開く</Text>
						<Text>3. 所属している班を選択する</Text>
						<Text>4. ファイルを追加を押す</Text>
						<Text>5. 青色の参照ボタンを押す</Text>
						<Image src='googleform1.png' />
						<Text>6. 左側にあるダウンロードを押す</Text>
						<Image src='windows2.png' />
						<Text>7. トロッコアドベンチャー問題をダブルクリックする</Text>
						<Image src='windows3.png' />
						<Text>5. 送信ボタンを押す</Text>
					</VStack>
				</AccordionItemContent>
			</AccordionItem>
			<AccordionItem value='iphone'>
				<AccordionItemTrigger>
					<Span>送り方（iPhone）</Span>
					<AccordionItemIndicator></AccordionItemIndicator>
				</AccordionItemTrigger>
				<AccordionItemContent>
					<VStack gap={4} alignItems="flex-start">
						<Text>1. ダウンロードを押す</Text>
						<Image src='iphone1.png' />
						<Text>2. 青色の下矢印ボタンを押す</Text>
						<Image src='iphone2.png' />
						<Text>3. ダウンロードを押す</Text>
						<Image src='iphone3.png' />
						<Text>4. トロッコアドベンチャー問題を押す</Text>
						<Image src='iphone4.png' />
						<Text>5. 上のトロッコアドベンチャー問題を押し”ファイル”に保存を押す</Text>
						<Image src='iphone5.png' />
						<Text>6. ダウンロードに保存する</Text>
						<Image src='iphone6.png' />
						<Text>7. 上のGoogleフォームのリンクを開く</Text>
						<Text>8. 所属している班を選択する</Text>
						<Text>9. ファイルを追加を押す</Text>
						<Text>10. 青色の参照ボタンを押してファイルを追加を押す</Text>
						<Image src='iphone7.png' />
						<Text>11. 下の最近使った項目からトロッコアドベンチャー問題を押す</Text>
						<Image src='iphone8.png' />
						<Text>12. 送信ボタンを押す</Text>
					</VStack>
				</AccordionItemContent>
			</AccordionItem>
		</AccordionRoot>
	)
}
