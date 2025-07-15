import {
	Button,
	CloseButton,
	DialogBackdrop, DialogBody, DialogCloseTrigger, DialogContent,
	DialogHeader,
	DialogPositioner,
	DialogRoot,
	DialogTitle,
	Link,
	Portal,
	Text,
	VStack
} from '@chakra-ui/react'
import { useState } from 'react'
import { downloadQuestionsData } from '../export'
import { HowToSend } from './howToSend'

export const DownloadButton = () => {
	const [dialogOpen, setDialogOpen] = useState(false)
	const formUrl = new URL(location.href).searchParams.get('form')
	return (
		<>
			<Button
				variant="outline"
				onClick={() => {
					downloadQuestionsData()
					setDialogOpen(true)
				}}
			>
				問題を送る
			</Button>
			<DialogRoot
				size="lg"
				placement="center"
				closeOnInteractOutside={true}
				open={dialogOpen}
				onOpenChange={(e) => setDialogOpen(e.open)}
				scrollBehavior="inside"
			>
				<Portal>
					<DialogBackdrop></DialogBackdrop>
					<DialogPositioner>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>問題を送る</DialogTitle>
							</DialogHeader>
							<DialogBody>
								<VStack alignItems="stretch">
									<Text>下のGoogleフォームリンクから今ダウンロードされた「トロッコアドベンチャー問題.zip」を送ってください</Text>
									<Link
										variant="underline"
										href={`https://forms.gle/${formUrl}`}
										target='_blank'
										colorPalette="cyan"
									>
										https://forms.gle/{formUrl}
									</Link>
									<HowToSend></HowToSend>
								</VStack>
							</DialogBody>
							<DialogCloseTrigger asChild>
								<CloseButton size="sm" />
							</DialogCloseTrigger>
						</DialogContent>
					</DialogPositioner>
				</Portal>
			</DialogRoot >
		</>
	)
}
