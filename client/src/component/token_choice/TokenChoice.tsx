import { List } from "antd";
import { useEffect, useMemo, useState } from "react";
import Timer from "../Timer";
import Token from "./Token";
import { useSearchParams } from "react-router-dom";
import { CourseInfo } from "../../interfaces/CourseInfo";

// genere a list of 15 courses of information system
const coursesName: string[] = [
    "Introduction to Computer Engineering",
    "Computer Organization and Architecture",
    "Programming in C and C++",
    "Data Structures and Algorithms",
    "Digital Logic Design",
    "Microprocessors and Microcontroller Systems",
    "Computer Networks",
    "Operating Systems",
    /*"Database Systems",
    "Software Engineering",
    "Computer Architecture",
    "Computer Graphics",
    "Artificial Intelligence",
    "Computer Security",
    "Parallel and Distributed Systems",
    "Embedded Systems",
    "Computer Vision",
    "Machine Learning",
    "Robotics",
    "Computer-Aided Design (CAD)"*/
  ];
const maxToken = 20;


const TokenChoice = () => {
    const [searchParams, ] = useSearchParams();
    const [courses, setCourses] = useState<CourseInfo[]>(coursesName.map((courseName, index) => {return {courseId : index, courseName : courseName, token : 0} as CourseInfo}));
    const [tokenUsed, setTokenUsed] = useState<number>(0);
    
    const address = useMemo(
        () => searchParams.get("address"),
        [searchParams]
    );

    // when the count of token for a course change, we update the state to recalculate the token used
    useEffect(() => {
        setTokenUsed(courses.reduce((acc, course) => acc + course.token, 0));
    }, [courses])

    /**
     * on change of a token number, we update the state
     * @param value the new value
     * @param name the name of the courses
     */
    const tokenChange = (value : number, name : string ) => {
        const newCourses = courses.map((course) => {
            if(course.courseName === name) {
                return {courseId : course.courseId, courseName : course.courseName, token : value} as CourseInfo;
            }
            return course;
        });
        setCourses(newCourses);
    }

    return (
        <div>
            {address && <>
                <div className="TimerDiv">
                    <Timer endTime={new Date("2023-12-31T23:59:59")}></Timer>
                </div>
                <List
                    grid={{ 
                        gutter: 10,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 8, 
                    }}
                    header={<div><strong>list of course</strong> - {tokenUsed} tokens used for a maximum of {maxToken}</div>}
                    bordered
                    dataSource={courses}
                    renderItem={(item) => 
                        <List.Item>
                            <Token courseId={item.courseId} maxToken={maxToken} name={item.courseName} tokenAlreadyUsedWithoutThisCourse={tokenUsed - item.token} initialToken={item.token} tokenChange={tokenChange}></Token>
                        </List.Item>
                    }
                />
            </>}
            {
                !address && 
                <div className="NotConnected">
                    <h1>You are not connected to the blockchain</h1>
                </div>
            }
        </div>
    )
}


export default TokenChoice;
