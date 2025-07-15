import { AlertIndicator, AlertRoot, AlertTitle } from '@chakra-ui/react'

export const Info = () => {
	return (
		<AlertRoot status="warning">
			<AlertIndicator></AlertIndicator>
			<AlertTitle>問題を全て作成し終わったら一番下のボタンから問題を送信してください</AlertTitle>
		</AlertRoot>
	)
}
