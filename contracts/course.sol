// SPDX-License-Identifier: MIT
pragma solidity^0.5.2;

contract Course{
    address public admin;
    string public courseName; 
    bool isFinshed; 
    uint256 outTime; 
    uint256 public Nstudent;//maximum number of student allowed in this class

    struct rankListElement {//to store the amound of token each student bid
        address addr;
        uint256 amount;
    }

    rankListElement[] rankingList;//list of address->amount
    
    //initialization of course name, limit of duration(min), limit of #student in this course
    constructor(string memory _name, uint256 duration, uint256 _Nstudent) public{
        courseName=_name;
        admin=msg.sender; 
        outTime=block.timestamp+duration*60; //allowed duration of selection
        isFinshed=false; 
        Nstudent = _Nstudent;

        for(uint256 i=0; i<Nstudent;i++){//initialization
            rankingList.push(
                rankListElement(
                    admin,
                    0
                )
            );
        }
    }

    function sortRankingList() public{//test done
        for(uint256 i=0; i<Nstudent;i++){
            for(uint256 j=0;j<Nstudent-1;j++){
                if (rankingList[j].amount < rankingList[j+1].amount){
                    rankListElement memory temp = rankingList[j];
                    rankingList[j] = rankingList[j+1];
                    rankingList[j+1] = temp;
                }
            }
        }
    }

    function isInList(address studentAddr) public view returns(bool){//test done
        for(uint256 i=0; i<Nstudent;i++){
            if(rankingList[i].addr==studentAddr){
                return true;
            }
        }
        return false;
    }

    // select course
    function bid_course() public payable{
        require(!isInList(msg.sender),"You've already bid for this course.");
        require(msg.value>0,"You must bid at least one token.");
        require(block.timestamp<=outTime,"Time is up.");
        require(!isFinshed,"The course selection is finished.");
            
        if (msg.value > rankingList[rankingList.length-1].amount){
            rankingList.pop();
            rankingList.push(
                rankListElement(
                    msg.sender,
                    msg.value
                )
            );
            sortRankingList();
        }
    }
    
    function endAuction() public payable{
      require(msg.sender==admin,"only admin can do this");
      require(block.timestamp>outTime,"time is not ok");
      require(!isFinshed,"must not finshed");
      isFinshed=true;
    }

    //for debug
    event Test(uint256 w);
    function test() public{
        for(uint256 i=0;i<rankingList.length;i++){
            emit Test(rankingList[i].amount);
        }
    }
}