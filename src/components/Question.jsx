import { Button, ButtonGroup, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { HiTrash } from 'react-icons/hi'
import { useQuestion } from '../atoms/questions'
import { QuestionEditDialog } from './QuestionEditDialog'

export const Question = ({ questionId }) => {
	const [dialogOpen, setDialogOpen] = useState(false)
	const [questions, { editQuestion, deleteQuestion }] = useQuestion()

	const submitHandle = async newData => {
		setDialogOpen(false)
		editQuestion(questionId, newData)
	}

	return (
		<>
			<ButtonGroup
				size="xl"
				w="full"
				variant="subtle"
				attached
			>
				<Button
					justifyContent="flex-start"
					flexGrow={1}
					onClick={() => setDialogOpen(true)}
				>
					{questions[questionId].content}
				</Button>
				<IconButton
					colorPalette="red"
					onClick={() => {
						if (confirm('本当に削除しますか?')) {
							deleteQuestion(questionId)
						}
					}}
				>
					<HiTrash />
				</IconButton>
			</ButtonGroup >
			<QuestionEditDialog
				dialogState={{ dialogOpen, setDialogOpen }}
				onDataSubmit={submitHandle}
				defaultValues={questions[questionId]}
			></QuestionEditDialog>
		</>
	)
}
