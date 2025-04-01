
/* using api: https://opentdb.com/api.php?amount=10
 * config here:   https://opentdb.com/api_config.php
 */

import { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "./Util"
import * as motion from "motion/react-client"


export type Difficulty = 'easy' | 'medium' | 'hard'

export type QuestionType = 'multiple' | 'boolean'

export type TriviaQuestion = {
    type: QuestionType
    difficulty: Difficulty
    category: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
}

export type TriviaResponse = {
    response_code: number
    results: TriviaQuestion[]
}


export async function getQuestions(amount: number, type: QuestionType) {
    const url = `https://opentdb.com/api.php?amount=${amount}&type=${type}`
    const res = await fetch(url)
    const data: TriviaResponse = await res.json()
    return data.results
}

export function shuffle<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

export function QuestionsPanel() {
    const [questions, setQuestions] = useState<TriviaQuestion[]>([])
    const hasFetched = useRef(false)
    useEffect(() => {
        (async () => {
            if (hasFetched.current) {
                return
            }
            hasFetched.current = true
            const qs = await getQuestions(5, 'multiple')
            setQuestions(qs)
        })()
    }, [])

    return (
        <div className="flex flex-col gap-4 items-center">
            {questions.map((question, index) => (
                <QuestionPanel key={index} delayMs={100 + index * 200} question={question} />
            ))}
        </div>
    )
}

export function QuestionPanel({ delayMs, question }: { delayMs: number, question: TriviaQuestion }) {
    const shuffledAnswers = useMemo(() => {
        const allAnswers = [...question.incorrect_answers, question.correct_answer]
        shuffle(allAnswers)
        return allAnswers
    }, [question])
    const stars = question.difficulty === 'easy' ? 1 : question.difficulty === 'medium' ? 2 : 3
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                delay: delayMs / 1000,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            className="w-[600px] flex flex-col m-4 gap-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <div className="flex justify-between gap-2 items-start">
                <div>{question.question}</div>
                <div className="flex items-center m-[-4px]">
                    {[...Array(3)].map((_, index) => (
                        <span
                            key={index}
                            className={cn("text-xl", index < stars ? "text-yellow-500" : "text-gray-400")}>
                            ★
                        </span>
                    ))}
                </div>
            </div>
            <div className="mt-2 self-center grid grid-cols-2 gap-2 items-center" >
                {shuffledAnswers.map((answer, index) => (
                    <motion.button
                        key={index} className="min-w-[180px] cursor-pointer text-sm bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-lg">
                        {answer}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    )
}
