import { Button, Form, InputNumber, List } from "antd";
import React, { useEffect, useState } from "react";

interface Course {
    name : string;
    ects : number;
}

const coursesName = ["cours 1", "cours 2", "cours 3"]
const maxEcts = 20;

const EctsChoice = () => {
    const [form] = Form.useForm();
    
    const [ectsUsed, setEctsUsed] = useState<number>(0);
    const [courses, setCourses] = useState<Course[]>(
        coursesName.map((i) => {return {name : i, ects : 0}})
    )

    // when the count of ects change, we revalidate the field
    useEffect(() => {
        form.validateFields();
    }, [ectsUsed, form])

    // when the courses change, we update the count of ects
    useEffect(() => {
        setEctsUsed(
            courses.reduce(
                (previous : number, current : Course) => previous + current.ects,
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


    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };


    return (
        <Form 
            form={form}
            initialValues={
                // transform the array of course in an object like : {name : ects}
                coursesName.reduce((object, course) => ({ ...object, [course]: 0}), {}) 
            }
            onFinish={onFinish}
        >
            <List
                size="small"
                header={<div><strong>list of course</strong> - {ectsUsed} ECTS used for a maximum of {maxEcts}</div>}
                bordered
                dataSource={courses}
                renderItem={(item) => 
                    <List.Item>
                        <Form.Item 
                            label={item.name + " - "}
                            name={item.name} 
                            rules={[
                                { required: true },
                                {
                                    validator: () =>
                                    ectsUsed <= maxEcts ? Promise.resolve() : Promise.reject(new Error('The count of ECTS must be under ' + maxEcts)),
                                }
                            ]} 
                            
                        >
                            <InputNumber 
                                name={item.name}
                                min={0} 
                                max={maxEcts}
                                onChange={(value) => ectsChange(value, item.name)} 
                            />
                            <span style={{ marginLeft: 8 }}>
                            ECTS
                            </span> 
                        </Form.Item>  
                    </List.Item>
                }
            />

            <Form.Item>
                <Button type="primary">Submit</Button>
            </Form.Item>
        </Form>
    )
}


export default EctsChoice;