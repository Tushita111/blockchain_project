import React from "react";
import { Header as BaseHeader } from "antd/lib/layout/layout";
import type { MenuProps } from 'antd';
import { Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";

const Header = () => {
    const navigate = useNavigate();

    // user menu
    const dropdownItems: MenuProps['items'] = [
        {
            key: "0",
            label: "Déconnexion",
            onClick: () => {
                navigate("/");
            }
        },
    ];

    return (
        <BaseHeader className="flex items-center shadow-md shadow-gray-300/60">
            <div className="flex-1 border-transparent">
            Nom du site    Il reste <Timer endTime={new Date("January, 5, 2023")}/>
            </div>
            
            
            <Dropdown menu={{items : dropdownItems}} trigger={["click"]}>
                <UserOutlined className="text-lg" />
            </Dropdown>
        </BaseHeader>
    );
};

export default Header;
