import { Layout, Menu, Breadcrumb } from 'antd';
import React, { useState } from 'react';
import { Redirect } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = (e) => {
        setClicked(true)
    }

    return (
        <div>
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item onClick={handleClick} key="1">Lyrics Sentiment</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'left' }}>Middlebury College Jackson Chen '21 Eric Leung '21</Footer>
            </Layout>
            {clicked === true && <Redirect push to={`/`} />}
        </div>
    );
}

export default CustomLayout;