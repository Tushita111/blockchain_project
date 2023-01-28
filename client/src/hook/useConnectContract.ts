import { useCallback } from "react";
import Web3 from "web3";
import contractInfo from "../CourseSelectionSystem.json";
import { CourseInfoContract } from "../interfaces/CourseInfoContract";


interface ContractInfoInterface {
    // define the type of contractInfo
    networks: {
        [key: string]: {
            address: string;
            transactionHash: string;
        };
    };
    abi: any;
}

interface ContractInteractionInterface {
    getContractsInfo(): Promise<CourseInfoContract>;
    bidCourse(courseId: number, bidPrice: number): Promise<void>;
    isAllreadyBid(courseId: number): Promise<boolean>;
}

const contractInfoType = contractInfo as ContractInfoInterface;
const web3 = new Web3(Web3.givenProvider);
const contractAddress = contractInfoType.networks["5777"].address;
const contractAbi = contractInfo.abi;

const contract = new web3.eth.Contract(contractAbi as any, contractAddress);
console.log(contract.methods);

function useContractInteraction() : ContractInteractionInterface {

    const getContractsInfo = useCallback(async () => {
        const courseInfo = await contract.methods.getCourseInfo().call();
        return courseInfo as CourseInfoContract;
    }, []);

    const bidCourse = useCallback(async (courseId: number, bidPrice: number) => {
        let accounts = await web3.eth.requestAccounts();
        let account = accounts[0];
        console.log(account);
        await contract.methods.bid_course(courseId).send({from: account, value: bidPrice});;
    }, []);

    const isAllreadyBid = useCallback(async (courseId : number) => {
        let accounts = await web3.eth.requestAccounts();
        let account = accounts[0];

        const courseInfo = await contract.methods.isInList(account, courseId).call();
        return courseInfo as boolean;
    }, []);

    return {
        getContractsInfo,
        bidCourse,
        isAllreadyBid
    };
}

export default useContractInteraction;
