// SPDX-License-Identifier: MIT
pragma solidity>=0.5.2;

contract CourseSelectionSystem{
    address public admin;
    uint public courseCount;
    mapping(uint=>CourseInfo) public recordInfo;//store information for course
    mapping(uint=>mapping(uint=>rankListElement)) recordBid;//store information for bid

    struct rankListElement {//to store the amount of token each student bid
        address addr;
        uint256 amount;
    }

    struct CourseInfo{//basic info of one course
        uint courseId;
        string courseName;
        uint Nstudent;
        uint256 startTime;
        uint256 duration;//unit:minute
        bool isFinshed; 
    }

    //initialization of course name, limit of duration(min), limit of #student in this course
    constructor() {
        admin=msg.sender;
        courseCount = 0;
        addCourse("ALIA",5,10);
        addCourse("DBMS",2,10);
        // addCourse("OT4",20,10);
    }

    modifier isAdmin(){//check if the action is legal
        if (msg.sender == admin) _;
    }

    function addCourse(string memory _name, uint _Nstudent, uint _duration) public isAdmin {
        CourseInfo memory course = CourseInfo(
            courseCount,
            _name, 
            _Nstudent, 
            block.timestamp, 
            _duration, 
            false
        );
        recordInfo[courseCount] = course;

        for(uint i=0;i<_Nstudent;i++){
            recordBid[courseCount][i] = rankListElement(admin,0);
        }

        courseCount+=1;

    }

    function sortRankingList(uint _courseId) private {//used for sorting bid information
        for(uint i=0; i<recordInfo[_courseId].Nstudent;i++){
            for(uint j=0;j<recordInfo[_courseId].Nstudent-1;j++){
                if (recordBid[_courseId][j].amount <recordBid[_courseId][j+1].amount){
                    rankListElement memory temp = recordBid[_courseId][j];
                    recordBid[_courseId][j] = recordBid[_courseId][j+1];
                    recordBid[_courseId][j+1] = temp;
                }
            }
        }
    }

    function isInList(address studentAddr, uint _courseId) private view returns(bool){//check if one student has already bid for this course
        for(uint i=0; i<recordInfo[_courseId].Nstudent;i++){
            if(recordBid[_courseId][i].addr==studentAddr){
                return true;
            }
        }
        return false;
    }

    // select course
    function bid_course(uint _courseId) public payable returns(bool){//return if the transaction succeed
        require(!isInList(msg.sender,_courseId),"You've already bid for this course.");
        require(msg.value>0,"You must bid a number greater than 0.");
        require(block.timestamp<=recordInfo[_courseId].startTime+recordInfo[_courseId].duration*60,"Time is up.");
        require(!recordInfo[_courseId].isFinshed,"The selection is finished for this course.");
        
        if (msg.value > recordBid[_courseId][recordInfo[_courseId].Nstudent-1].amount){
            recordBid[_courseId][recordInfo[_courseId].Nstudent-1].addr = msg.sender;
            recordBid[_courseId][recordInfo[_courseId].Nstudent-1].amount = msg.value;
            sortRankingList(_courseId);
            return true;
        }
        return false;
    }
    
    function endSelection(uint _courseId) public payable isAdmin {
        CourseInfo storage courseinfo = recordInfo[_courseId];
        require(block.timestamp>courseinfo.startTime+courseinfo.duration*60,"Can't close the selection in advance.");
        require(!courseinfo.isFinshed,"The selection is already finished.");
        courseinfo.isFinshed=true;
    }

}
