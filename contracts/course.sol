// SPDX-License-Identifier: MIT
pragma solidity>=0.5.2;

contract CourseSelectionSystem{
    address public admin;
    uint public courseCount;
    uint public startTime;
    uint public duration;//unit:minute
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
        bool isFinshed; 
    }

    //initialization of course name, limit of duration(min), limit of #student in this course
    constructor(uint _duration) public {
        startTime = block.timestamp;
        duration = _duration;
        admin=msg.sender;
        courseCount = 0;
    }

    modifier isAdmin(){//check if the action is legal
        if (msg.sender == admin) _;
    }

    function getCourseList(address student_addr) public view returns (bool[] memory) {
        bool[] memory courseList = new bool[](courseCount-1);
        for(uint i=0;i<courseCount-1;i++){
            if(isInList(student_addr,i)){
                courseList[i] = true;
            }
        }
        return courseList;
	}


    function addCourse(string memory _name, uint _Nstudent) public isAdmin {
        CourseInfo memory course = CourseInfo(
            courseCount,
            _name, 
            _Nstudent,
            false
        );
        recordInfo[courseCount] = course;
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

    function isInList(address studentAddr, uint _courseId) public view returns(bool){//check if one student has already bid for this course
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
        require(block.timestamp<=startTime+duration*60,"Time is up.");
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
        require(block.timestamp>startTime+duration*60,"Can't close the selection in advance.");
        require(!courseinfo.isFinshed,"The selection is already finished.");
        courseinfo.isFinshed=true;
    }

    //for debug
    event Test(uint256 w);
    function test(uint _courseId) public{
        CourseInfo storage courseinfo = recordInfo[_courseId];
        for(uint256 i=0;i<courseinfo.Nstudent;i++){
            emit Test(recordBid[_courseId][i].amount);
        }
    }
}
