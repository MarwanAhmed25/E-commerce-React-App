
export default function Card({obj}){

    

    return (
    <>
            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/5" key={obj.id}>
            <div className="max-w-sm  sm:mx-auto md:m-2 bg-white border border-gray-200 rounded-lg hover:shadow dark:bg-gray-800 dark:border-gray-700">
                <div style={{
                        backgroundImage: `url(${obj.image})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        height: "220px",
                        width: "100%", // Use 100% width to fit the container
                    }} height="200px" width="400px">

                </div>
                
                <div className="px-5 pb-5">
                    
                <div className="flex items-center justify-center">
                    
                    <h5 className="text-lg font-semibold tracking-tight text-blue-900 dark:text-white">{obj.name}</h5>
                </div>
                </div>
            </div>
        </div>
  
    </> )   
}