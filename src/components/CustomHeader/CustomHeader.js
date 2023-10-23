import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title, Link } = Typography;

const CustomHeader = () => (
    <>
        <Header className="header"
            style={{
                height: "120px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px"
            }}
        >

            <Title type="warning"
                className='name'
                style={{
                    textAlign: "center"
                }}>Georgian Exam</Title>
        </Header>
    </>
);

export default CustomHeader;
