import { Button, Result } from 'antd';
import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultComponent from "../Default";

function NotFound() {
    const navigate = useNavigate();

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
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary" onClick={() => navigate("/")} P>Back Home</Button>}
                />

            </div>
        </DefaultComponent >
    );
}

export default NotFound;
