import React from "react";
import { Header as BaseHeader } from "antd/lib/layout/layout";
import { Menu, Dropdown, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import useConnection from '../hook/useConnection';

const menuKey = ["/", "/client"];

const Header = () => {
    const {logout} = useConnection();
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
            label: "CRA",
            onClick: () => navigate("/"),
        },
        {
            key: "1",
            label: "Clients",
            onClick: () => navigate("/client"),
        },
        {
            key: "2",
            label: "Evenements",
            onClick: () => navigate("/event"),
        },
        {
            key: "3",
            label: "Contrats",
            onClick: () => navigate("/contrat"),
        },
    ];

    // user menu
    const userItems: MenuProps["items"] = [
        {
            key: "0",
            label: "Déconnexion",
            onClick: () => {
                logout();
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
