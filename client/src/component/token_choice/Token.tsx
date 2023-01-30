import React, { useState } from "react";
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
    const [img, setImg] = useState<string>();
    const [isAlreadyBid, setIsAlreadyBid] = React.useState(false);
    const contractInteraction = useContractInteraction();

    useEffect(() => {
        contractInteraction.isAlreadyBid(courseId).then((isAlreadyBid) => {
            setIsAlreadyBid(isAlreadyBid ? isAlreadyBid : false);
        })
    }, [contractInteraction, courseId])

    // get the img of the token
    // https://stackoverflow.com/questions/73678855/fetch-and-display-image-from-api-react#:~:text=To%20fetch%20image%20from%20API,can%20use%20the%20fetch%20function.&text=We%20call%20fetch%20with%20the,response%20object%20to%20a%20blob.
    useEffect(() => {
        const fetchImage = async () => {
            const cid = await contractInteraction.getCourseCid(courseId);
            const imageUrl = `http://localhost:8080/ipfs/${cid}`;
            const res = await fetch(imageUrl);
            const imageBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImg(imageObjectURL);
        };
        fetchImage();
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
                <img src={img} alt={"cours " + name} width="100px" height="100px"/>
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