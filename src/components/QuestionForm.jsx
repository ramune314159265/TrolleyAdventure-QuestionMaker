import { Box, Button, Input, Select, Textarea, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
	question: z.string(),
	group: z.string(),
	wrongChoices: z.array(
		z.object({
			text: z.string(),
			image: z.instanceof(File).optional(),
			explanation: z.string().optional()
		})
	),
	answer: z.object({
		text: z.string(),
		image: z.instanceof(File).optional(),
		explanation: z.string().optional()
	})
})

export const QuestionForm = () => {
	const {
		register,
		control,
		handleSubmit,
		watch,
		setValue
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			question: '',
			group: '',
			wrongChoices: [],
			answer: {
				text: '',
				image: undefined,
				explanation: ''
			}
		}
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'wrongChoices'
	})

	const onSubmit = data => {
		console.log(data)
	}

	return (
		<Box as="form" onSubmit={handleSubmit(onSubmit)} p={4}>
			<VStack spacing={4} align="stretch">
				<Textarea placeholder="問題文" {...register('question')} />
				<Select placeholder="グループを選択" {...register('group')}>
					<option value="group1">グループ1</option>
					<option value="group2">グループ2</option>
				</Select>

				{fields.map((field, index) => (
					<Box key={field.id} p={2} borderWidth={1} borderRadius="md">
						<Input placeholder="不正解の内容" {...register(`wrongChoices.${index}.text`)} />
						<Input
							type="file"
							accept="image/*"
							onChange={e => {
								const file = e.target.files?.[0]
								if (file) {
									setValue(`wrongChoices.${index}.image`, file)
								}
							}}
						/>
						<Textarea placeholder="不正解の解説" {...register(`wrongChoices.${index}.explanation`)} />
						<Button onClick={() => remove(index)} colorScheme="red" mt={2}>削除</Button>
					</Box>
				))}

				<Button onClick={() => append({ text: '', explanation: '' })}>不正解を追加</Button>

				<Box borderWidth={1} borderRadius="md" p={2}>
					<Input placeholder="答えの内容" {...register('answer.text')} />
					<Input
						type="file"
						accept="image/*"
						onChange={e => {
							const file = e.target.files?.[0]
							if (file) {
								setValue('answer.image', file)
							}
						}}
					/>
					<Textarea placeholder="答えの解説" {...register('answer.explanation')} />
				</Box>

				<Button type="submit" colorScheme="blue">送信</Button>
			</VStack>
		</Box>
	)
}
