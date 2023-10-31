import { Button, Form, InputNumber, Slider } from 'antd';
import React from "react";
import { useNavigate } from "react-router-dom";
import { questions } from '../../services/data';
import { getRandomQuestions } from '../../services/functions';
import DefaultComponent from "../Default";

function Home() {
    const navigate = useNavigate();

    const onFinish = (values) => {
        const { numberOfQuestions, rangeOfQuestions } = values;
        var countOfQuestions = numberOfQuestions;

        if (rangeOfQuestions[1] - rangeOfQuestions[0] < numberOfQuestions) {
            countOfQuestions = rangeOfQuestions[1] - rangeOfQuestions[0]
        }
        const randomQuestions = getRandomQuestions(countOfQuestions, rangeOfQuestions[0], rangeOfQuestions[1]);

        navigate('/quiz', {
            state: {
                randomQuestions,
                numberOfQuestions: countOfQuestions,
                rangeOfQuestions
            },
        });

    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };


    return (
        <DefaultComponent>
            <div
                style={{
                    height: "70vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "200px"
                }}
            >
                <Form
                    name="basic"
                    style={{
                        border: "3px solid #001529",
                        padding: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        boxShadow: "5px 5px 15px "

                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Number of questions"
                        name="numberOfQuestions"
                        rules={[
                            {
                                required: true,
                                message: "Please input number!",
                            },
                        ]}
                        initialValue={10}
                    >
                        <InputNumber
                            defaultValue={10}
                            min={5}
                            max={questions.length}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Range of questions"
                        name="rangeOfQuestions"
                        labelCol={{ span: 24 }}
                        initialValue={[0, 10]}
                        style={{ width: "100%" }}
                    >
                        <Slider
                            range
                            step={5}
                            defaultValue={[0, 200]}
                            max={questions.length}
                            marks={
                                {
                                    0: "0",
                                    50: "50",
                                    100: "100",
                                    150: "150",
                                    200: "200"
                                }}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Start
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </DefaultComponent >
    );
}

export default Home;
