import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import React from "react";
import "./style/input.less";
import { CookiesProvider } from "react-cookie";

function App() {
    return (
        <CookiesProvider>
            <Layout className="h-screen">
                <Header />
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </CookiesProvider>
    );
}

export default App;
