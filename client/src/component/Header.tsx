import React, { useState } from "react";
import { Header as BaseHeader } from "antd/lib/layout/layout";
import { Alert, Button, Form, Input, Menu, MenuProps, Modal } from 'antd';
import { Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useContractInteraction from "../hook/useContractInteraction";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const menuKey = ["/", "/result"];

const Header = () => {
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useSearchParams();
    const [cannotConnectToMetaMask, setCannotConnectToMetaMask] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const contractInteraction = useContractInteraction();

    const navigationItems: MenuProps["items"] = [
        {
            key: "-1",
            label: "",
        },
        {
            key: "0",
            label: "home",
            onClick: () => navigate(
                {
                    pathname: '/',
                    search: searchParams.toString(),
                }
            ),
        },
        {
            key: "1",
            label: "result",
            onClick: () => navigate(
                {
                    pathname: '/result',
                    search: searchParams.toString(),
                }
            ),
            disabled : contractInteraction.deadline.getTime() >= Date.now()
        },
    ];

    // user menu
    const dropdownItems: MenuProps['items'] = [
        {
            key: "0",
            label: "Connexion",
            onClick: () => {
                setIsModalOpen(true);
            }
        },
        {
            key: "1",
            label: "Déconnexion",
            onClick: () => {
                searchParams.delete("address");
                setSearchParams(searchParams);
                contractInteraction.setNewAddress("");
            }
        },
    ];

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values: any) => {
        const result = await contractInteraction.setNewAddress(values.address);
        console.log(result);
        if (result) {
            setIsModalOpen(false);
        }else{
            setCannotConnectToMetaMask(true);
        }
    };

    return (
        <>
            <BaseHeader className="flex items-center shadow-md shadow-gray-300/60">
                <Menu
                    mode="horizontal"
                    selectedKeys={[menuKey.indexOf(location.pathname).toString()]}
                    className="flex-1 border-transparent"
                    items={navigationItems}
                ></Menu>
                
                <Dropdown menu={{items : dropdownItems}} trigger={["click"]}>
                    <UserOutlined className="text-lg" />
                </Dropdown>
            </BaseHeader>
            <Modal 
                title="Type your address" 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                      Return
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                      Submit
                    </Button>,
                  ]}
            >
                {cannotConnectToMetaMask && <Alert message="please connect to MetaMask with the right account ! Be sure to check it is selectionned" type="error" />}
                <Form
                    form={form}
                    layout="inline"
                    onFinish={onFinish}
                    initialValues={{"address" : contractInteraction.getAddress()}}
                >
                    <Form.Item 
                        rules={[
                            { required: true }
                        ]}    
                        name="address" 
                    >
                        <Input/>
                    </Form.Item> 
                </Form>
            </Modal>
        </>
        
    );
};

export default Header;
