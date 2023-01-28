export interface CourseInfoContract{//basic info of one course
    courseId : number;
    courseName : string;
    Nstudent : number;
    startTime : number;
    duration : number;//unit:minute
    isFinshed : boolean; 
}