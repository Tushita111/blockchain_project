import React from "react";
import { Button, Card, Form, InputNumber } from "antd";
import { useEffect } from "react";
import useContractInteraction from "../../hook/useContractInteraction";

interface TokenProps {
    maxToken : number;
    name : string;
    courseId : number;
    initialToken : number;
    tokenAlreadyUsedWithoutThisCourse : number;

    /**
     * call when the number of token is changed inside the input
     * @param value the new value of the input
     * @param name the name of the input
     * @returns nothing
     */
    tokenChange : (value : number, name : string) => void;
}

const Token = ({maxToken, tokenAlreadyUsedWithoutThisCourse, name, initialToken, tokenChange, courseId} : TokenProps) => {
    const [form] = Form.useForm();
    const [isAlreadyBid, setIsAlreadyBid] = React.useState(false);
    const contractInteraction = useContractInteraction();

    useEffect(() => {
        contractInteraction.isAlreadyBid(courseId).then((isAlreadyBid) => {
            setIsAlreadyBid(isAlreadyBid ? isAlreadyBid : false);
        })
    }, [contractInteraction, courseId])

    // when the count of token change, we revalidate the field
    useEffect(() => {
        form.validateFields();
    }, [tokenAlreadyUsedWithoutThisCourse, form])

    const onFinish = (values: any) => {
        contractInteraction.bidCourse(courseId, values[name]);
        setIsAlreadyBid(true);
    };

    return (
        <Form 
            form={form}
            layout="inline"
            onFinish={onFinish}
            initialValues={{[name] : initialToken ? initialToken : 0}}
            disabled={isAlreadyBid}
        >
            <Card className="TokenCard">
                <h1 className="TokenTitle">{name}</h1>
                {isAlreadyBid && <h2>You already bid for this course {initialToken} tokens.</h2>}
                <div className="TokenBody">
                    <div className="TokenContent">
                        <Form.Item 
                            name={name} 
                            rules={[
                                { required: true },
                                {
                                    validator: (_, value) =>
                                    tokenAlreadyUsedWithoutThisCourse + value <= maxToken ? Promise.resolve() : Promise.reject(new Error('The count of token must be under ' + maxToken)),
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
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>

                        <img src="/footer.png" alt="footer"></img>
                    </div>
                </div>
            </Card>
        </Form>
    );

}

export default Token;