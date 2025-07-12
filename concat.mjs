import AdmZip from 'adm-zip'
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'fs'
import { basename, join } from 'path'
import sharp from 'sharp'

const zipDir = 'zip/'
const outputDir = 'output/'
const mergedQuestions = []

if (!existsSync(outputDir))
	mkdirSync(outputDir)

const handleZip = async file => {
	const zipPath = join(zipDir, file)
	const zip = new AdmZip(zipPath)

	const entry = zip.getEntry('questions.json')
	if (entry) {
		const content = zip.readAsText(entry)
		const json = JSON.parse(content)
		mergedQuestions.push(...json)
	}

	for (const entry of zip.getEntries()) {
		const name = basename(entry.entryName)
		if (!entry.isDirectory && !name.includes('.') && name !== 'questions') {
			const buffer = zip.readFile(entry)
			const outputPath = join(outputDir, `${name}.webp`)

			await sharp(buffer)
				.toFormat('webp')
				.toFile(outputPath)
		}
	}
}

await Promise.all(readdirSync(zipDir)
	.filter(file => file.endsWith('.zip'))
	.map(file => handleZip(file)))

writeFileSync('output/questions.json', JSON.stringify(mergedQuestions, null, '\t'))
