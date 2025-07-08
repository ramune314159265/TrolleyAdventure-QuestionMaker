import { Button } from '@chakra-ui/react'
import { useState } from 'react'
import { HiPlusCircle } from 'react-icons/hi'
import { useQuestion } from '../atoms/questions'
import { QuestionAddDialog } from './QuestionAddDialog'

export const QuestionAddButton = () => {
	const [dialogOpen, setDialogOpen] = useState(false)
	const [questions, { addQuestion }] = useQuestion()

	const submitHandle = async data => {
		setDialogOpen(false)
		const id = crypto.randomUUID()
		addQuestion({ id, ...data })
	}

	return (
		<>
			<Button w="full" onClick={() => setDialogOpen(true)}>
				<HiPlusCircle /> 問題を追加
			</Button>
			<QuestionAddDialog
				dialogState={{ dialogOpen, setDialogOpen }}
				onDataSubmit={submitHandle}
				defaultValues={{}}
			></QuestionAddDialog>
		</>
	)
}
