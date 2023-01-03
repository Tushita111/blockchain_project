import { Button, Form, InputNumber, List } from "antd";
import React, { useEffect, useState } from "react";

interface Courses {
    name : string;
    ects : number;
}

const coursesName = ["cours 1", "cours 2", "cours 3"]
const maxEcts = 20;

const EctsChoice = () => {
    const [form] = Form.useForm();
    
    const [ectsUsed, setEctsUsed] = useState<number>(0);
    const [courses, setCourses] = useState<Courses[]>(
        coursesName.map((i) => {return {name : i, ects : 0}})
    )

    // when the courses change, we update the count of ects
    useEffect(() => {
        setEctsUsed(
            courses.reduce(
                (previous : number, current : Courses) => previous + current.ects,
                0
            )
        )
    }, [courses]);
    
    /**
     * on change of a ects number, we update the state
     * @param value the new value
     * @param name the name of the courses
     */
    const ectsChange = (value : number | null, name : string ) => {
        if(value){
            setCourses(
                courses.map((i) => 
                {
                    if(i.name === name){
                        return {ects : value, name : i.name}
                    }else{
                        return i;
                    }
                })
            )
        }
    }


    return (
        <Form form={form} layout="horizontal">
            <List
                size="small"
                header={<div><strong>list of course</strong> - {ectsUsed} ECTS used for a maximum of {maxEcts}</div>}
                bordered
                dataSource={courses}
                renderItem={(item) => 
                    <List.Item>
                        {item.name} - 
                        <Form.Item name={item.name} rules={[{ required: true }]}>
                            <InputNumber 
                                min={0} 
                                max={10} 
                                defaultValue={0} 
                                onChange={(value) => ectsChange(value, item.name)} 
                            /> 
                        </Form.Item>
                        
                        ECTS
                    </List.Item>}
            />

            <Form.Item>
                <Button type="primary">Submit</Button>
            </Form.Item>
        </Form>
    )
}


export default EctsChoice;