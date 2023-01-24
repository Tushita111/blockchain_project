import React from "react";
import { Button, Card, Form, InputNumber } from "antd";
import { useEffect } from "react";

interface EctsProps {
    maxEcts : number;
    name : string;
    initialEcts : number;
    ectsAlreadyUsed : number;

    /**
     * call when the number of ects is changed inside the input
     * @param value the new value of the input
     * @param name the name of the input
     * @returns nothing
     */
    ectsChange : (value : number, name : string) => void;
}

const Ects = ({maxEcts, ectsAlreadyUsed, name, initialEcts, ectsChange} : EctsProps) => {
    const [form] = Form.useForm();

    // when the count of ects change, we revalidate the field
    useEffect(() => {
        form.validateFields();
    }, [ectsAlreadyUsed, form])

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form 
            form={form}
            layout="inline"
            onFinish={onFinish}
            initialValues={{[name] : initialEcts}}
        >
            <Card title={name}>
                <Form.Item 
                    name={name} 
                    rules={[
                        { required: true },
                        {
                            validator: (_, value) =>
                            ectsAlreadyUsed + value <= maxEcts ? Promise.resolve() : Promise.reject(new Error('The count of ECTS must be under ' + maxEcts)),
                        }
                    ]} 
                    
                >
                    <InputNumber 
                        name={name}
                        min={0} 
                        max={maxEcts}
                        onChange={(value) => ectsChange(value ? value : 0, name)} 
                        addonAfter="ECTS"
                    />
                </Form.Item> 
                <Form.Item>
                    <Button type="primary">Submit</Button>
                </Form.Item>

                <img src="/footer.png" alt="footer" style={{width : "100%"}}></img>
            </Card>
        </Form>
    );

}

export default Ects;