import { BlobReader, BlobWriter, TextReader, ZipWriter } from '@zip.js/zip.js'
import { db } from './db'

export const exportQuestionsData = async () => {
	const questions = await db.questions.toArray()

	const zipFileWriter = new BlobWriter()
	const zipWriter = new ZipWriter(zipFileWriter)
	await Promise.all(questions
		.flatMap(question => (
			[
				question.answer.image,
				question.answer.explanationImage,
				...question.options.flatMap(option => (
					[
						option.image,
						option.explanationImage,
					]
				))
			]
		))
		.filter(file => file)
		.map(file => {
			const blobReader = new BlobReader(file)
			return zipWriter.add(crypto.randomUUID(), blobReader)
		})
	)

	const questionsJsonReader = new TextReader(JSON.stringify(questions))
	await zipWriter.add('questions.json', questionsJsonReader)

	await zipWriter.close()

	const blob = await zipFileWriter.getData()
	return blob
}

export const downloadQuestionsData = async () => {
	const blob = await exportQuestionsData()
	const a = document.createElement('a')
	const url = URL.createObjectURL(blob)
	a.href = url
	a.download = 'トロッコアドベンチャー問題.zip'
	a.click()
	URL.revokeObjectURL(url)
}
