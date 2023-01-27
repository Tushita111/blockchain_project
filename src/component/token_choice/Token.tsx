import React from "react";
import { Button, Card, Form, InputNumber } from "antd";
import { useEffect } from "react";

interface TokenProps {
    maxToken : number;
    name : string;
    initialToken : number;
    tokenAlreadyUsed : number;

    /**
     * call when the number of token is changed inside the input
     * @param value the new value of the input
     * @param name the name of the input
     * @returns nothing
     */
    tokenChange : (value : number, name : string) => void;
}

const Token = ({maxToken, tokenAlreadyUsed, name, initialToken, tokenChange} : TokenProps) => {
    const [form] = Form.useForm();

    // when the count of token change, we revalidate the field
    useEffect(() => {
        form.validateFields();
    }, [tokenAlreadyUsed, form])

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form 
            form={form}
            layout="inline"
            onFinish={onFinish}
            initialValues={{[name] : initialToken}}
        >
            <Card className="TokenCard">
                <h1 className="TokenTitle">{name}</h1>
                <div className="TokenBody">
                    <div className="TokenContent">
                        <Form.Item 
                            name={name} 
                            rules={[
                                { required: true },
                                {
                                    validator: (_, value) =>
                                    tokenAlreadyUsed + value <= maxToken ? Promise.resolve() : Promise.reject(new Error('The count of token must be under ' + maxToken)),
                                }
                            ]} 
                            
                        >
                            <InputNumber 
                                name={name}
                                min={0} 
                                max={maxToken}
                                onChange={(value) => tokenChange(value ? value : 0, name)} 
                                addonAfter="tokens"
                            />
                        </Form.Item> 
                        <Form.Item>
                            <Button type="primary">Submit</Button>
                        </Form.Item>

                        <img src="/footer.png" alt="footer"></img>
                    </div>
                </div>
            </Card>
        </Form>
    );

}

export default Token;