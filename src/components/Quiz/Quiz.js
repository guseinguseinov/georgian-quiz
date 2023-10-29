import { Button, Typography, FloatButton } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRandomQuestions } from "../../services/functions";
import DefaultComponent from "../Default";

function Quiz() {
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [pre, setPre] = useState(null);
    const [selected, setSelected] = useState();
    const [disabledNextBtn, setDisabledNextBtn] = useState(true);
    const [showResult, setShowResult] = useState(false);
    const [index, setIndex] = useState(0);
    var [questionNumber, setQuestionNumber] = useState(1);
    var [score, setScore] = useState(0);

    const navigate = useNavigate();
    const data = useLocation();
    const { Title, Text } = Typography;

    var randomQuestions = data?.state?.randomQuestions;
    var numberOfQuestions = data?.state?.numberOfQuestions;
    var rangeOfQuestions = data?.state?.rangeOfQuestions;

    useEffect(() => {
        if (randomQuestions?.length > 0) {
            setQuestion(randomQuestions[0]?.question);
            setIndex(randomQuestions[0]?.index);
            setAnswers(randomQuestions[0]?.options);
            setCorrectAnswer(randomQuestions[0]?.answer);
            (randomQuestions[0]?.pre) ? setPre(randomQuestions[0]?.pre) : setPre(null);
            randomQuestions?.splice(randomQuestions[0], 1);
        }
    }, []);

    function showNextQuestion() {
        setDisabledNextBtn(true);
        setSelected(false);

        if (randomQuestions?.length > 0) {
            setQuestion(randomQuestions[0]?.question);
            setAnswers(randomQuestions[0]?.options);
            setCorrectAnswer(randomQuestions[0]?.answer);
            setIndex(randomQuestions[0]?.index);
            (randomQuestions[0]?.pre) ? setPre(randomQuestions[0]?.pre) : setPre(null);

            randomQuestions?.splice(randomQuestions[0], 1);
        } else {
            (score / numberOfQuestions) * 100 >= 70
                ? setQuestion("You Passed !")
                : setQuestion("You Failed !");
            setShowResult(true);
        }
        setQuestionNumber(questionNumber + 1);
    }

    function checkCorrectAnswer(variant) {
        setSelected(variant);
        const clickedButton = document.querySelector(`.${variant}`);
        const correctAnswerButton = document.querySelector(`.${correctAnswer}`);
        if (variant == correctAnswer) {
            correctAnswerButton.style.setProperty("background-color", "green");
            correctAnswerButton.style.setProperty("color", "#fff");
            score++;
            setScore(score);
        } else {
            correctAnswerButton.style.setProperty("background-color", "green");
            correctAnswerButton.style.setProperty("color", "#fff");
            clickedButton.style.setProperty("background-color", "red");
            clickedButton.style.setProperty("color", "#fff");
        }
        setDisabledNextBtn(false);
    }

    function restartQuiz() {
        setScore(0);
        setQuestionNumber(1);

        randomQuestions = getRandomQuestions(
            numberOfQuestions - 1,
            rangeOfQuestions[0],
            rangeOfQuestions[1]
        );
        setQuestion(randomQuestions[0]?.question);
        navigate("/quiz", {
            state: {
                randomQuestions,
                numberOfQuestions,
                rangeOfQuestions,
            },
        });

        setShowResult(false);
    }

    return (
        <>
            <DefaultComponent>
                <div
                    style={{
                        height: "80vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        style={{
                            position: 'absolute',
                            top: 80,
                            left: 15,
                            zIndex: 1000,
                            border: "0px",
                            fontWeight: "bold",
                            color: "white",
                            backgroundColor: "green"
                        }}

                        onClick={() => navigate('/home')}
                    >
                        Back
                    </Button>
                    <div
                        style={{
                            border: "3px solid #001529",
                            borderRadius: "10px",
                            boxShadow: "5px 5px 15px ",
                            maxWidth: "600px",
                            minWidth: "300px"
                        }}
                    >
                        <div style={{
                            border: "2px solid #001529",
                            borderRadius: "10px",
                            margin: "20px",
                            padding: "20px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"

                        }}>
                            <Title style={{ marginTop: "0" }}>{`Score: ${score}/${numberOfQuestions}`}</Title>
                            {showResult ? null : <Title style={{ marginTop: "0", fontSize: "20px" }}>№: {index}</Title>}
                            {showResult ? null : <Title style={{ marginTop: "0" }}>{questionNumber}</Title>}
                        </div>

                        <div
                            className="question"
                            style={{
                                border: "2px solid #001529",
                                borderRadius: "10px",
                                margin: "20px",
                                padding: "20px",
                                textAlign: "center"
                            }}>
                            <Title >{question}</Title>
                            {pre ? showResult ? null : <Text>{pre}</Text> : null}

                        </div>

                        <div
                            style={{
                                border: "2px solid #001529",
                                borderRadius: "10px",
                                margin: "20px",
                                padding: "20px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "3px"

                            }}
                        >
                            {showResult ? (
                                <Button type="default" onClick={restartQuiz}>
                                    Restart
                                </Button>
                            ) : (
                                answers.map((answer) => (
                                    <Button
                                        className={answer?.split(".")[0]}
                                        classNames="answers"
                                        disabled={selected}
                                        onClick={() => checkCorrectAnswer(answer?.split(".")[0])}
                                        key={answer}
                                    >
                                        {answer}
                                    </Button>
                                ))
                            )}
                        </div>

                        <div
                            style={{
                                margin: "20px",
                                textAlign: "center"
                            }}
                        >
                            {showResult ? (
                                <Button type="primary" onClick={() => navigate("/home")}>
                                    Home
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    disabled={disabledNextBtn}
                                    onClick={showNextQuestion}
                                >
                                    Next
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </DefaultComponent>
        </>
    );
}

export default Quiz;
