import { List } from "antd";
import { useEffect, useState } from "react";
import Ects from "./Ects";

interface Course {
    name : string;
    ects : number;
}

const coursesName = ["cours 1", "cours 2", "cours 3"]
const maxEcts = 20;

const EctsChoice = () => {
    const [courses, setCourses] = useState<Course[]>(coursesName.map((courseName) => {return {name : courseName, ects : 0} as Course}));
    const [ectsUsed, setEctsUsed] = useState<number>(0);

    
    // when the count of ects for a course change, we update the state to recalculate the ects used
    useEffect(() => {
        setEctsUsed(courses.reduce((acc, course) => acc + course.ects, 0));
    }, [courses])

    /**
     * on change of a ects number, we update the state
     * @param value the new value
     * @param name the name of the courses
     */
    const ectsChange = (value : number, name : string ) => {
        const newCourses = courses.map((course) => {
            if(course.name === name) {
                return {name : course.name, ects : value} as Course;
            }
            return course;
        });
        setCourses(newCourses);
    }

    return (
        <List
            size="small"
            header={<div><strong>list of course</strong> - {ectsUsed} ECTS used for a maximum of {maxEcts}</div>}
            bordered
            dataSource={courses}
            renderItem={(item) => 
                <List.Item>
                    <Ects maxEcts={maxEcts} name={item.name} ectsAlreadyUsed={ectsUsed} initialEcts={item.ects} ectsChange={ectsChange}></Ects>
                </List.Item>
            }
        />
    )
}


export default EctsChoice;