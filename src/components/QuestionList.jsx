import { VStack } from '@chakra-ui/react'
import { useQuestion } from '../atoms/questions'
import { QuestionAddButton } from './QuestionAddButton'

export const QuestionList = () => {
	const [questions] = useQuestion()

	return (
		<VStack gap={4} w="full" p="8px 16px">
			{/* {
				Object.values(questions)
					.sort((a, b) => a.index - b.index)
					.map(question => {
						return (
							<Question questionId={question.id} key={question.id} />
						)
					})
			} */}
			<QuestionAddButton></QuestionAddButton>
		</VStack>
	)
}
