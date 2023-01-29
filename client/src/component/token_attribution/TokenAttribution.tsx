import { List } from "antd";
import { useEffect, useState } from "react";
import useContractInteraction from "../../hook/useContractInteraction";
import {coursesInfo} from "../token_choice/TokenChoice";

interface AppliedCourses {
    courseId: number;
    courseName: string;
}


const TokenAttribution = () => {
    const contractInteraction = useContractInteraction();
    const [courses, setCourses] = useState<AppliedCourses[]>([]);

    useEffect(() => {
        contractInteraction.getConfirmedCourseList().then((courses) => {
            const appliedCourses: AppliedCourses[] = [];
            for(let i = 0; i < courses.length; i++) {
                if(courses[i]) {
                    appliedCourses.push({courseId: i, courseName: coursesInfo[i].courseName});
                }
            }

            setCourses(appliedCourses);
        });
    }, [contractInteraction]);

    return (
        <List
            header={<div><strong>list of your course</strong></div>}
            bordered
            dataSource={courses}
            renderItem={(item) => 
                <List.Item>
                    {item.courseName}
                </List.Item>
            }
        />
    );
};

export default TokenAttribution;