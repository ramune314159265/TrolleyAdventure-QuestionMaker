import {
	DialogBackdrop, DialogBody, DialogContent,
	DialogHeader,
	DialogPositioner,
	DialogRoot,
	DialogTitle,
	Portal
} from '@chakra-ui/react'
import { QuestionForm } from './QuestionForm'

export const QuestionAddDialog = ({ dialogState, onDataSubmit, defaultValues }) => {
	return (
		<DialogRoot
			size="lg"
			placement="center"
			closeOnInteractOutside={false}
			open={dialogState.dialogOpen}
			scrollBehavior="inside"
		>
			<Portal>
				<DialogBackdrop></DialogBackdrop>
				<DialogPositioner>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>問題を作成</DialogTitle>
						</DialogHeader>
						<DialogBody>
							<QuestionForm
								onDataSubmit={onDataSubmit}
								onCancel={() => dialogState.setDialogOpen(false)}
								defaultValues={defaultValues}
							/>
						</DialogBody>
					</DialogContent>
				</DialogPositioner>
			</Portal>
		</DialogRoot >
	)
}
