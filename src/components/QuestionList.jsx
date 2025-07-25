import { Box, VStack } from '@chakra-ui/react'
import { useQuestion } from '../atoms/questions'
import { DownloadButton } from './DownloadButton'
import { Info } from './Info'
import { Question } from './Question'
import { QuestionAddButton } from './QuestionAddButton'

export const QuestionList = () => {
	const [questions] = useQuestion()

	return (
		<>
			<VStack gap={4} w="full" p="8px 16px" alignItems="stretch">
				<Info></Info>
				<Box>作成した問題</Box>
				{
					Object.values(questions)
						.sort((a, b) => a.index - b.index)
						.map(question => {
							return (
								<Question questionId={question.id} key={question.id} />
							)
						})
				}
				<QuestionAddButton></QuestionAddButton>
				<DownloadButton></DownloadButton>
			</VStack>
		</>
	)
}
