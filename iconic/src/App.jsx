import './App.css'

function App() {
  return (
    <>
      <div className='h-screen py-0 my-0 flex items-center max-w-150 mx-auto'>
        <div className='my-auto flex flex-col w-full'>
          <h1 className='text-7xl mb-10 animate-pan-l'>Welcome.</h1>
          <div className='text-right animate-pan-r'>
            <button className='secondary text-2xl!'>Open from file</button>
            <button className='primary text-2xl!'>Create an icon</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
