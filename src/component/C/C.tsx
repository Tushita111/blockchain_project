import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { EventInterface } from "../../entities/EventInterface";
import useApiEvent from "../../hook/useApiEvent";
import NewEventModal from "./NewEventModal";



const Event = () => {
    const eventApi = useApiEvent();
    const [events, setEvents] = useState<EventInterface[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventToModify, setEventToModify] = useState<EventInterface | undefined>(undefined);

    const columns : ColumnsType<EventInterface> = [
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
            title: "Unitée",
            dataIndex: "unite",
            key: "unite",
        },
        {
            title: "Action",
            key: "action",
            render : (_, record : EventInterface) => (
                <>
                    <Popconfirm
                        title="Etes-vous sur de vouloir supprimer cet évenement ?"
                        onConfirm={() => {eventApi.removeEvent({id : record.id}).then(() => {
                            eventApi.getAll().then(setEvents);
                        })}}
                        okText="Oui"
                        cancelText="Non"
                    >
                        <DeleteOutlined />

                    </Popconfirm>

                    <EditOutlined onClick={() => {
                        setEventToModify(record);
                        setIsModalOpen(true);
                    }}/>
                </>
            )
        }
    ];

    useEffect(() => {
        eventApi.getAll().then(setEvents);
    }, [isModalOpen, eventApi]); // update when add client

    return (
        <>
            <div style={{textAlign : "right"}}>
                <Button type="primary" onClick={() => {setIsModalOpen(true)}}>
                    Nouveau évenement
                </Button>
            </div>
            
            <Table dataSource={events} columns={columns}></Table>
            <NewEventModal eventToModify={eventToModify} isModalOpen={isModalOpen} closeModal={()=>{
                setIsModalOpen(false);
                setEventToModify(undefined);
            }}/>
        </>
    );
};

export default Event;
