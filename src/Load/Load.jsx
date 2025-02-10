import './Load.css';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
export default function Load(){

    return <div className="w-full h-screen text-blue-700 border-blue-700 flex justify-center items-center">
            <ClimbingBoxLoader color="blue" />
        </div> 
}