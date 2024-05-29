import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Button, Card, Col, ConfigProvider, Form, Input, List, notification, Row, Statistic} from "antd";

import TextArea from "antd/es/input/TextArea";
import {dashGet} from "@/components/dashbord/dashFetch";
import {MehOutlined, SmileOutlined} from "@ant-design/icons";


export default function MessageComp(props) {
    const [messages, setMessages] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement,desc,isWarning) => {
        api.info({
            message: <p style={{color:isWarning ?"red":"green",fontWeight:"600",fontFamily:"'Poppins',sans-serif"}}>{isWarning ? "Warning!":"Success!"}</p>,
            description:
                <p style={{fontFamily:"'Poppins',sans-serif"}}>{desc}</p>,
            placement,
            icon: (
                isWarning ?
                    <SmileOutlined
                        style={{
                            color: 'red',
                        }}
                    />:<MehOutlined style={{color:"green"}}/>
            ),
        });
    };
    useEffect(() => {
        async function getMessage() {
            try{
                const {Find} = await dashGet();
                const {messages} = Find;
                setMessages(messages);
            }catch (e){
                openNotification("topRight","Something Went Wrong. Please check your internet connection!",true)
            }


        }

        getMessage();
    }, [])

    return (
        <div>
            {contextHolder}
            {
                messages.length ?

                    (<List dataSource={messages} layout="horizontal"

                           renderItem={(item, index) => (
                               <List.Item>

                                   <List.Item.Meta
                                       avatar={<Avatar src={item.imgUrl}/>}
                                       title={<a href="https://ant.design">{item.name}</a>}
                                       description={item.message}
                                   />

                               </List.Item>
                           )}
                    >

                    </List>)
                    : <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img
                            style={{width: "100%", height: "35vh"}}
                            src="/empty.svg"
                            alt="something"
                        />
                        <span>No Message!</span>
                    </div>
            }
        </div>
    )
}


export function Report() {
    const form = useRef();
    return (
        <div style={{
            display: 'flex',
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "80vh",
            width: "60vw",
            margin: "auto"
        }}>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, eligendi dignissimos mollitia dolorum
                aliquid possimus voluptatibus magnam ea minus, recusandae at totam, nulla ut odio. Repellat cumque
                architecto dolores ad!
            </div>
            <ConfigProvider
                theme={{
                components:{
                    Form:{
                        labelColor:"#3f505c",
                        labelFontSize:"15px"
                    }
                },
                token:{
                    fontFamily:"'Poppins',sans-serif"
                }
            }}

            >
                <Form  layout="vertical" style={{backgroundColor:"#dde6ed",width:"30vw",padding:"10px",fontWeight:"600",borderRadius:"10px"}}>
                    <Form.Item  label="Email">
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item label="Message">
                        <TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button danger={true} type="primary" htmlType="submit" >Report</Button>
                    </Form.Item>
                </Form>
            </ConfigProvider>

        </div>

    )
}
