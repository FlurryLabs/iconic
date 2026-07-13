import { Route, Routes } from 'react-router'
import './App.css'
import Home from "./pages/Home";
import Editor from "./pages/Editor";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="*" element={<div className='text-center'>Page not found!</div>} />
      </Routes>
    </>
  )
}

export default App
