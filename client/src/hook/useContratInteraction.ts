import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
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
    address: string | null;
    // contract interaction
    getContractsInfo(): Promise<CourseInfoContract>;
    // contract interaction with user (not doing anything if no address is set)
    bidCourse(courseId: number, bidPrice: number): Promise<void>;
    isAlreadyBid(courseId: number): Promise<boolean | null>;
    // set a new address
    setNewAddress(address : string) : Promise<boolean>;
    isAddressSet() : boolean;
    getAddress() : string | null;
}

const contractInfoType = contractInfo as ContractInfoInterface;
const web3 = new Web3(Web3.givenProvider);
const contractAddress = contractInfoType.networks["5777"].address;
const contractAbi = contractInfo.abi;

async function checkAddress(address : string) : Promise<boolean> {
    if(address.length === 42 && address.startsWith("0x")){
        let accounts = await web3.eth.requestAccounts();
        for(let i = 0; i < accounts.length; i++){
            if(accounts[i] === address){
                return true;
            }
        }
    }
    return false;
}

function useContractInteraction() : ContractInteractionInterface {
    const [searchParams, setSearchParams] = useSearchParams();

    const address = useMemo(
        () => {
            if(searchParams.has("address")){
                return searchParams.get("address");
            }else{
                return null;
            }
        },
        [searchParams]
    )

    const returnValue = useMemo(() => {
        const contract = new web3.eth.Contract(contractAbi as any, contractAddress);

        const getContractsInfo = async () => {
            const courseInfo = await contract.methods.getCourseInfo().call();
            return courseInfo as CourseInfoContract;
        };
    
        const bidCourse = async (courseId: number, bidPrice: number) => {
            if(address && await checkAddress(address)){
                await contract.methods.bid_course(courseId).send({from: address, value: bidPrice});;
            }else{
                searchParams.delete("address");
                setSearchParams(searchParams);
            }
        };
    
        const isAlreadyBid = async (courseId : number) => {
            if(address && await checkAddress(address)){
                const courseInfo = await contract.methods.isInList(address, courseId).call();
                return courseInfo as boolean;
            }else{
                searchParams.delete("address");
                setSearchParams(searchParams);
                return null;
            }
        };
    
        const setNewAddress = async (address : string) => {
            let accounts = await web3.eth.requestAccounts();
            for(let i = 0; i < accounts.length; i++){
                if(accounts[i] === address){
                    searchParams.set("address", address);
                    setSearchParams(searchParams);
                    return true;
                }
            }
            return false;
        };
    
        const isAddressSet = () => {
            return address !== null;
        };
    
        const getAddress = () => {return address;};

        return {
            address,
            getContractsInfo,
            bidCourse,
            isAlreadyBid,
            setNewAddress,
            isAddressSet,
            getAddress
        };
    }, [address, searchParams, setSearchParams]);

    return returnValue;
}

export default useContractInteraction;
