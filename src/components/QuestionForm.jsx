import { AbsoluteCenter, AccordionItem, AccordionItemContent, AccordionItemIndicator, AccordionItemTrigger, AccordionRoot, Box, Button, FieldErrorText, FieldLabel, FieldRoot, FileUploadHiddenInput, FileUploadLabel, FileUploadRoot, FileUploadTrigger, HStack, IconButton, Input, NativeSelectField, NativeSelectIndicator, NativeSelectRoot, Span, Text, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { HiPlusCircle, HiTrash } from 'react-icons/hi'
import { z } from 'zod'
import { categories } from '../utils/categories'
import { SelectScenePreview } from './SelectScenePreview'

const optionBaseSchema = z.object({
	content: z.string().optional(),
	image: z.instanceof(File).optional(),
	explanation: z.string().optional()
})

const optionSchema = optionBaseSchema
	.refine(data => data.content?.trim() || data.image instanceof File, {
		message: '選択肢のテキストまたは画像のどちらか一つ以上必要です',
		path: ['content']
	})

const answerSchema = optionBaseSchema
	.extend({
		explanationImage: z.instanceof(File).optional()
	})
	.refine(data => data.content?.trim() || data.image instanceof File, {
		message: '選択肢のテキストまたは画像のどちらか一つ以上必要です',
		path: ['content']
	})

const formSchema = z.object({
	content: z.string().min(1, '問題文は必須です'),
	group: z.string().min(1, '班・カテゴリーは必須です'),
	options: z.array(optionSchema).min(1, '不正解の択は一つ以上必要です'),
	answer: answerSchema
})

export const QuestionForm = ({ onDataSubmit, onCancel, defaultValues }) => {
	const {
		register,
		control,
		handleSubmit,
		watch,
		setValue,
		getValues,
		formState: { errors, isDirty }
	} = useForm({
		resolver: zodResolver(formSchema),
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

	const [previewData, setPreviewData] = useState(getValues())

	return (
		<Box as="form" onSubmit={handleSubmit(onDataSubmit)} w="full">
			<VStack gap={4} w="full" align="stretch">
				<FieldRoot invalid={!!errors.group}>
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
				<FieldRoot invalid={!!errors.content}>
					<FieldLabel>問題文(だいたい20文字以下)</FieldLabel>
					<Input {...register('content')} ></Input>
					<FieldErrorText>{errors.content?.message}</FieldErrorText>
				</FieldRoot>

				<FieldRoot invalid={!!errors.options}>
					<FieldLabel>不正解の選択肢(ランダムで一つ選ばれる)</FieldLabel>
					<VStack gap={4} bg="gray.subtle" w="full" p={4}>
						<AccordionRoot spaceY="4" collapsible>
							{fields.map((field, index) => (
								<AccordionItem key={field.id} value={index}>
									<Box position="relative">
										<AccordionItemTrigger>
											<Span flex="1">{index + 1}. {watch(`options.${index}.content`)}</Span>
											<AccordionItemIndicator></AccordionItemIndicator>
										</AccordionItemTrigger>
										<AbsoluteCenter axis="vertical" insetEnd="36px">
											<IconButton
												size="xs"
												variant="subtle"
												colorPalette="red"
												onClick={() => {
													if (confirm('本当に削除しますか?')) {
														remove(index)
													}
												}}
											><HiTrash /></IconButton>
										</AbsoluteCenter>
									</Box>
									<AccordionItemContent>
										<VStack gap={4} w="full" align="stretch" pb={4}>
											<FieldRoot invalid={!!errors.options?.[index]?.content}>
												<FieldLabel>不正解の選択肢</FieldLabel>
												<Input {...register(`options.${index}.content`)} ></Input>
												<FieldErrorText>{errors.options?.[index]?.content?.message}</FieldErrorText>
											</FieldRoot>
											<FileUploadRoot
												invalid={!!errors.options?.[index]?.image}
												accept={['image/jpeg', 'image/webp', 'image/png', 'image/heic']}
												onChange={e => {
													const file = e.target.files?.[0]
													if (file) {
														setValue(`options.${index}.image`, file, { shouldDirty: true })
													}
												}}
											>
												<FileUploadHiddenInput></FileUploadHiddenInput>
												<FileUploadLabel>不正解の選択肢の画像(できるだけ正方形に近い形)</FileUploadLabel>
												<Input asChild>
													<FileUploadTrigger>
														{watch(`options.${index}.image`)?.name ??
															<Text color="fg.muted">ここを押して画像を選択</Text>
														}
													</FileUploadTrigger>
												</Input>
											</FileUploadRoot>
											<FieldRoot invalid={!!errors.options?.[index]?.explanation}>
												<FieldLabel>不正解の解説</FieldLabel>
												<Input {...register(`options.${index}.explanation`)} ></Input>
												<FieldErrorText>{errors.options?.[index]?.explanation?.message}</FieldErrorText>
											</FieldRoot>
										</VStack>
									</AccordionItemContent>
								</AccordionItem>
							))}
						</AccordionRoot>
						<Button onClick={() => append({ content: '', explanation: '' })} w="full"><HiPlusCircle /> 不正解の選択肢を追加</Button>
					</VStack>
					<FieldErrorText>{errors.options?.message}</FieldErrorText>
				</FieldRoot>

				<FieldRoot invalid={!!errors.answer?.content}>
					<FieldLabel>正解の選択肢</FieldLabel>
					<Input {...register(`answer.content`)} ></Input>
					<FieldErrorText>{errors.answer?.content?.message}</FieldErrorText>
				</FieldRoot>
				<FileUploadRoot
					invalid={!!errors.answer?.image}
					accept={['image/jpeg', 'image/webp', 'image/png', 'image/heic']}
					onChange={e => {
						const file = e.target.files?.[0]
						if (file) {
							setValue(`answer.image`, file, { shouldDirty: true })
						}
					}}
				>
					<FileUploadHiddenInput></FileUploadHiddenInput>
					<FileUploadLabel>正解の選択肢の画像(できるだけ正方形に近い形)</FileUploadLabel>
					<Input asChild>
						<FileUploadTrigger>
							{watch('answer.image')?.name ??
								<Text color="fg.muted">ここを押して画像を選択</Text>
							}
						</FileUploadTrigger>
					</Input>
				</FileUploadRoot>
				<FieldRoot invalid={!!errors.answer?.explanation}>
					<FieldLabel>正解の解説</FieldLabel>
					<Input {...register(`answer.explanation`)} ></Input>
					<FieldErrorText>{errors.answer?.explanation?.message}</FieldErrorText>
				</FieldRoot>
				<FileUploadRoot
					invalid={!!errors.answer?.explanationImage}
					accept={['image/jpeg', 'image/webp', 'image/png', 'image/heic']}
					onChange={e => {
						const file = e.target.files?.[0]
						if (file) {
							setValue(`answer.explanationImage`, file, { shouldDirty: true })
						}
					}}
				>
					<FileUploadHiddenInput></FileUploadHiddenInput>
					<FileUploadLabel>解説の画像</FileUploadLabel>
					<Input asChild>
						<FileUploadTrigger>
							{watch('answer.explanationImage')?.name ??
								<Text color="fg.muted">ここを押して画像を選択</Text>
							}
						</FileUploadTrigger>
					</Input>
				</FileUploadRoot>

				<Text>プレビュー</Text>
				<Button onClick={() => setPreviewData(getValues())}>プレビューを更新する</Button>
				<SelectScenePreview data={previewData}></SelectScenePreview>

				<HStack width="full" justifyContent="space-between">
					<Button variant="outline" onClick={() => {
						if (!isDirty || confirm('保存してないデータを破棄しますか?')) {
							onCancel()
						}
					}}>キャンセル</Button>
					<Button type="submit">保存</Button>
				</HStack>
			</VStack>
		</Box>
	)
}
