import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Select, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ClientInterface } from "../../entities/ClientInterface";
import { ContratInterface } from "../../entities/ContratInterface";
import useApiClient from "../../hook/useApiClient";
import useApiContrat from "../../hook/useApiContrat";
import NewContratModal from "./NewContratModal";



const Contrat = () => {
    const contratApi = useApiContrat();
    const clientApi = useApiClient();
    let [searchParams, setSearchParams] = useSearchParams();

    /**
     * Get the clientId in the url
     */
    const clientId = useMemo(() => {
        return searchParams.get("clientId");
    }, [searchParams]);

    const [contrats, setContrats] = useState<ContratInterface[]>([]);
    const [clients, setClients] = useState<ClientInterface[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contratToModify, setcontratToModify] = useState<ContratInterface | undefined>(undefined);

    //////////////////////////////////////////////////////////////////////////
    // Table

    const columns : ColumnsType<ContratInterface> = [
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
            title: "Action",
            key: "action",
            render : (_, record : ContratInterface) => (
                <>
                    <Popconfirm
                        title="Etes-vous sur de vouloir supprimer ce contrat ?"
                        onConfirm={() => {contratApi.removeContrat({id : record.id}).then(() => {
                            contratApi.getAll().then(setContrats);
                        })}}
                        okText="Oui"
                        cancelText="Non"
                    >
                        <DeleteOutlined />

                    </Popconfirm>

                    <EditOutlined onClick={() => {
                        setcontratToModify(record);
                        setIsModalOpen(true);
                    }}/>
                </>
            )
        }
    ];

    //////////////////////////////////////////////////////////////////////////////
    // useEffect
    
    /**
     * Get all contrat when component is mounted and we have the clientId in the url
     */
    useEffect(() => {
        if(clientId){
            contratApi.getContratsByClient({id : parseInt(clientId)}).then(setContrats);
        }
    }, [isModalOpen, contratApi, clientId]); // update when add contrat

    /**
     * get all client when component is mounted
     */
    useEffect(() => {
        clientApi.getAll().then(setClients);
    }, [clientApi]);

    //////////////////////////////////////////////////////////////////////////////
    // logic

    const handleSelectClient = (value : number) => {
        searchParams.set("clientId", value.toString());
        setSearchParams(searchParams);
    }

    //////////////////////////////////////////////////////////////////////////////
    // Render

    return (
        <>
            <div style={{textAlign : "right"}}>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={clients.map((client) => ({label : client.nom, value : client.id}))}
                    onChange={handleSelectClient}
                />
                <Button type="primary" onClick={() => {setIsModalOpen(true)}}>
                    Nouveau contrat
                </Button>
            </div>
            
            {clientId && <Table dataSource={contrats} columns={columns}></Table>}
            {!clientId && <div>Vous devez selectionner un client</div>}
            <NewContratModal contratToModify={contratToModify} isModalOpen={isModalOpen} closeModal={()=>{
                setIsModalOpen(false);
                setcontratToModify(undefined);
            }}/>
        </>
    );
};

export default Contrat;

