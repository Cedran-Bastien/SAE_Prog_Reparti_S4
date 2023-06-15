import React from 'react';
import {Card} from "@/app/utils";


export const Home = ({tab}) => {
    const content = tab.map((item) => <Card key={item.title} title={item.title} titleColor={"text-blue-800"} content={item.content}  HtmlContent={item.html}/>)
    return (
        <div>
            {content}
        </div>
    )
}
