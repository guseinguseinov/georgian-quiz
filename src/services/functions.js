import { questions } from "./data";

export function getRandomQuestion(array) {
    const index = Math.floor(Math.random() * array.length);
    const question = array[index];

    return { question, index };
}


export function getRandomQuestions(num, start = 0, end = 10) {

    const randomQuestions = [];
    const questionsClone = questions.slice(start, end + 1);

    while (num > 0) {
        const { question, index } = getRandomQuestion(questionsClone);
        randomQuestions.push(question);
        questionsClone.splice(index, 1);
        num--;
    }

    return randomQuestions;

}

