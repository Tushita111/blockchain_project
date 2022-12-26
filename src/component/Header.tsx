import React from "react";
import { Header as BaseHeader } from "antd/lib/layout/layout";
import { Menu, Dropdown, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const menuKey = ["/", "/b", "/c"];

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // navigation menu
    const navigationItems: MenuProps["items"] = [
        {
            key: "-1",
            label: "",
        },
        {
            key: "0",
            label: "A",
            onClick: () => navigate("/"),
        },
        {
            key: "1",
            label: "B",
            onClick: () => navigate("/b"),
        },
        {
            key: "2",
            label: "C",
            onClick: () => navigate("/c"),
        },
    ];

    // user menu
    const userItems: MenuProps["items"] = [
        {
            key: "0",
            label: "Déconnexion",
            onClick: () => {
                navigate("/");
            }
        },
    ];

    const UserMenu = (
        <Menu items={userItems}>
        </Menu>
    );

    return (
        <BaseHeader className="flex items-center shadow-md shadow-gray-300/60">
            <Menu
                mode="horizontal"
                selectedKeys={[menuKey.indexOf(location.pathname).toString()]}
                className="flex-1 border-transparent"
                items={navigationItems}
            ></Menu>
            <Dropdown overlay={UserMenu} trigger={["click"]}>
                <UserOutlined className="text-lg" />
            </Dropdown>
        </BaseHeader>
    );
};

export default Header;
