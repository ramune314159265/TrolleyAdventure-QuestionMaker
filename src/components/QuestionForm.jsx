import { AbsoluteCenter, AccordionItem, AccordionItemContent, AccordionItemIndicator, AccordionItemTrigger, AccordionRoot, Box, Button, FieldErrorText, FieldLabel, FieldRoot, FileUploadFileText, FileUploadHiddenInput, FileUploadLabel, FileUploadRoot, FileUploadTrigger, Input, NativeSelectField, NativeSelectIndicator, NativeSelectRoot, Span, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { HiPlusCircle } from 'react-icons/hi'
import { z } from 'zod'
import { categories } from '../utils/categories'

const schema = z.object({
	content: z.string(),
	group: z.string(),
	options: z.array(
		z.object({
			content: z.string().optional(),
			image: z.instanceof(File).optional(),
			explanation: z.string().optional()
		})
	),
	answer: z.object({
		content: z.string().optional(),
		image: z.instanceof(File).optional(),
		explanation: z.string().optional(),
		explanationImage: z.instanceof(File).optional()
	})
})

export const QuestionForm = ({ defaultValues }) => {
	const {
		register,
		control,
		handleSubmit,
		watch,
		setValue,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			content: '',
			group: '',
			options: [],
			answer: {
				content: '',
				image: undefined,
				explanation: '',
				explanationImage: undefined,
			},
			...defaultValues
		}
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'options'
	})

	const onSubmit = data => {
		console.log(data)
	}

	return (
		<Box as="form" onSubmit={handleSubmit(onSubmit)} p={4} w="full">
			<VStack gap={4} w="full" align="stretch">
				<FieldRoot>
					<FieldLabel>班・カテゴリー</FieldLabel>
					<NativeSelectRoot>
						<NativeSelectField
							placeholder='カテゴリーを選択'
							{...register('group')}
						>
							{Object.entries(categories).map(([id, name]) => (
								<option value={id} key={id}>{name}</option>
							))}
						</NativeSelectField>
						<NativeSelectIndicator></NativeSelectIndicator>
					</NativeSelectRoot>
					<FieldErrorText>{errors.group?.message}</FieldErrorText>
				</FieldRoot>
				<FieldRoot>
					<FieldLabel>問題文(だいたい20文字以下)</FieldLabel>
					<Input {...register('content')} ></Input>
					<FieldErrorText>{errors.content?.message}</FieldErrorText>
				</FieldRoot>

				<FieldRoot>
					<FieldLabel>不正解の選択肢(ランダムで一つ選ばれる)</FieldLabel>
					<VStack gap={4} bg="gray.subtle" w="full" p={4}>
						<AccordionRoot spaceY="4" collapsible>
							{fields.map((field, index) => (
								<AccordionItem key={field.id} value={index}>
									<Box position="relative">
										<AccordionItemTrigger>
											<Span flex="1">{index + 1}個目</Span>
											<AccordionItemIndicator></AccordionItemIndicator>
										</AccordionItemTrigger>
										<AbsoluteCenter axis="vertical" insetEnd="36px">
											<Button
												size="xs"
												colorPalette="red"
												onClick={() => remove(index)}
											>削除</Button>
										</AbsoluteCenter>
									</Box>
									<AccordionItemContent>
										<VStack gap={4} w="full" align="stretch" pb={4}>
											<FieldRoot>
												<FieldLabel>不正解の選択肢</FieldLabel>
												<Input {...register(`options.${index}.content`)} ></Input>
												<FieldErrorText>{errors.options?.index?.content?.message}</FieldErrorText>
											</FieldRoot>
											<FileUploadRoot
												accept={['image/jpeg', 'image/webp', 'image/png', 'image/heic']}
												onChange={e => {
													const file = e.target.files?.[0]
													if (file) {
														setValue(`options.${index}.image`, file)
													}
												}}
											>
												<FileUploadHiddenInput></FileUploadHiddenInput>
												<FileUploadLabel>不正解の選択肢の画像</FileUploadLabel>
												<Input asChild>
													<FileUploadTrigger>
														<FileUploadFileText></FileUploadFileText>
													</FileUploadTrigger>
												</Input>
											</FileUploadRoot>
											<FieldRoot>
												<FieldLabel>不正解の解説</FieldLabel>
												<Input {...register(`options.${index}.explanation`)} ></Input>
												<FieldErrorText>{errors.options?.index?.explanation?.message}</FieldErrorText>
											</FieldRoot>
										</VStack>
									</AccordionItemContent>
								</AccordionItem>
							))}
						</AccordionRoot>
						<Button onClick={() => append({ content: '', explanation: '' })} w="full"><HiPlusCircle /> 不正解の選択肢を追加</Button>
					</VStack>
				</FieldRoot>

				<FieldRoot>
					<FieldLabel>正解の選択肢</FieldLabel>
					<Input {...register(`answer.content`)} ></Input>
					<FieldErrorText>{errors.answer?.content?.message}</FieldErrorText>
				</FieldRoot>
				<FileUploadRoot
					accept={['image/jpeg', 'image/webp', 'image/png', 'image/heic']}
					onChange={e => {
						const file = e.target.files?.[0]
						if (file) {
							setValue(`answer.image`, file)
						}
					}}
				>
					<FileUploadHiddenInput></FileUploadHiddenInput>
					<FileUploadLabel>正解の選択肢の画像</FileUploadLabel>
					<Input asChild>
						<FileUploadTrigger>
							<FileUploadFileText></FileUploadFileText>
						</FileUploadTrigger>
					</Input>
				</FileUploadRoot>
				<FieldRoot>
					<FieldLabel>正解の解説</FieldLabel>
					<Input {...register(`answer.explanation`)} ></Input>
					<FieldErrorText>{errors.answer?.explanation?.message}</FieldErrorText>
				</FieldRoot>
				<FileUploadRoot
					accept={['image/jpeg', 'image/webp', 'image/png', 'image/heic']}
					onChange={e => {
						const file = e.target.files?.[0]
						if (file) {
							setValue(`answer.explanationImage`, file)
						}
					}}
				>
					<FileUploadHiddenInput></FileUploadHiddenInput>
					<FileUploadLabel>解説の画像</FileUploadLabel>
					<Input asChild>
						<FileUploadTrigger>
							<FileUploadFileText></FileUploadFileText>
						</FileUploadTrigger>
					</Input>
				</FileUploadRoot>

				<Button type="submit" colorScheme="blue">送信</Button>
			</VStack>
		</Box>
	)
}
