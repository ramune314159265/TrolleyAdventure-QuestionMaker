import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useQuestion } from '../atoms/questions'
import { QuestionEditDialog } from './QuestionEditDialog'

export const Question = ({ questionId }) => {
	const [dialogOpen, setDialogOpen] = useState(false)
	const [questions, { editQuestion }] = useQuestion()

	const submitHandle = async newData => {
		setDialogOpen(false)
		editQuestion(questionId, newData)
	}

	return (
		<>
			<Button
				w="full"
				variant="subtle"
				size="xl"
				justifyContent="flex-start"
				onClick={() => setDialogOpen(true)}
			>
				{questions[questionId].content}
			</Button>
			<QuestionEditDialog
				dialogState={{ dialogOpen, setDialogOpen }}
				onDataSubmit={submitHandle}
				defaultValues={questions[questionId]}
			></QuestionEditDialog>
		</>
	)
}
