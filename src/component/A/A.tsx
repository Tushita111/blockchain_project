import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { ClientInterface } from "../../entities/ClientInterface";
import useApiClient from "../../hook/useApiClient";
import NewClientModal from "./NewClientModal";



const Client = () => {
    const clientApi = useApiClient();
    const [clients, setClients] = useState<ClientInterface[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientToModify, setclientToModify] = useState<ClientInterface | undefined>(undefined);

    const columns : ColumnsType<ClientInterface> = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Nom",
            dataIndex: "nom",
            key: "nom",
        },
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Action",
            key: "action",
            render : (_, record : ClientInterface) => (
                <>
                    <Popconfirm
                        title="Etes-vous sur de vouloir supprimer ce client ?"
                        onConfirm={() => {clientApi.removeClient({id : record.id}).then(() => {
                            clientApi.getAll().then(setClients);
                        })}}
                        okText="Oui"
                        cancelText="Non"
                    >
                        <DeleteOutlined />

                    </Popconfirm>

                    <EditOutlined onClick={() => {
                        setclientToModify(record);
                        setIsModalOpen(true);
                    }}/>
                </>
            )
        }
    ];

    useEffect(() => {
        clientApi.getAll().then(setClients);
    }, [isModalOpen, clientApi]); // update when add client

    return (
        <>
            <div style={{textAlign : "right"}}>
                <Button type="primary" onClick={() => {setIsModalOpen(true)}}>
                    Nouveau client
                </Button>
            </div>
            
            <Table dataSource={clients} columns={columns}></Table>
            <NewClientModal clientToModify={clientToModify} isModalOpen={isModalOpen} closeModal={()=>{
                setIsModalOpen(false);
                setclientToModify(undefined);
            }}/>
        </>
    );
};

export default Client;
