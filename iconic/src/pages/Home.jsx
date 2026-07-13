import { useNavigate } from "react-router"

export default function Home() {
    const navigate = useNavigate();
    return (<>
        <div className='h-screen py-0 my-0 flex items-center max-w-150 mx-auto'>
            <div className='my-auto flex flex-col w-full'>
                <h1 className='text-7xl mb-10 animate-pan-l'>Welcome.</h1>
                <div className='text-right animate-pan-r'>
                    <button onClick={()=>{}} className='secondary text-2xl!'>Open from file</button>
                    <button onClick={()=>{navigate("/editor")}} className='primary text-2xl!'>New file</button>
                </div>
            </div>
        </div>
    </>)
}