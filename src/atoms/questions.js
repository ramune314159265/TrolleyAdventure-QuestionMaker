import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { db } from '../db'

export const questionsAtom = atom({})

export const useQuestion = () => {
	const [questions, setQuestions] = useAtom(questionsAtom)
	useEffect(() => {
		db.questions.toArray()
			.then(questions => {
				const data = {}
				questions.forEach(questions => {
					data[questions.id] = questions
				})
				setQuestions(data)
			})
	}, [setQuestions])

	const addQuestion = async ({ id, group, content, options, answer }) => {
		const index = Object.keys(questions).length
		try {
			await db.questions.add({ id, group, content, options, answer, index })
		} catch (e) {
			console.error(e)
		}
		const data = {
			...questions,
			[id]: { id, group, content, options, answer }
		}
		setQuestions(data)
	}

	const deleteQuestion = async id => {
		try {
			await db.questions.delete(id)
		} catch (e) {
			console.error(e)
		}
		const copy = structuredClone(questions)
		delete copy[id]
		setQuestions(copy)
	}

	const editQuestion = async (id, newData) => {
		try {
			await db.questions.update(id, newData)
		} catch (e) {
			console.error(e)
		}
		const copy = structuredClone(questions)
		copy[id] = {
			...questions[id],
			...newData
		}
		setQuestions(copy)
	}

	return [questions, { addQuestion, deleteQuestion, editQuestion }]
}
