import { useRef, useState } from "react"

export default function Editor() {
    const gridSizeRef = useRef(null);
    const [currentTool, setCurrentTool] = useState("Circle");
    const canvasRef = useRef(null);



    return (
        <>
            <div className="fixed top-0 left-0 z-99 w-full h-10 bg-text/15">
                <div className="max-w-screen-lg px-2 mx-auto py-2">
                    Iconic
                </div>
            </div>

            <div className="flex flex-row w-full pt-12 h-full">
                <div className="w-70 border-r-2 border-r-surface-med pr-3">
                    <h2 className="text-3xl font-semibold">Project</h2>
                    <div>
                        <div>Grid size</div>
                        <div className="flex gap-2">
                            <div className="font-mono">4x4</div>
                            <input ref={gridSizeRef} type="range" min={4} max={16} step={4} defaultValue={8} className="flex-1" />
                            <div className="font-mono">16x16</div>

                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="w-full h-90">
                        <div className="aspect-square h-full bg-surface-med mx-auto">
                            <svg ref={canvasRef} width={256} height={256}>

                            </svg>
                        </div>
                    </div>

                    <div className="overflow-x-auto p-1 flex flex-row scrollbar-thin w-fit mx-auto h-14 mt-2 rounded-xl">
                        <button onMouseDown={() => {
                            setCurrentTool("Circle");
                        }} className={`toolbarBtn ${currentTool == "Circle" ? " primary" : "secondary"}`}>Circle</button>
                        <button onMouseDown={() => {
                            setCurrentTool("Rectangle");
                        }} className={`toolbarBtn ${currentTool == "Rectangle" ? " primary" : "secondary"}`}>Rectangle</button>
                        <button onMouseDown={() => {
                            setCurrentTool("Line");
                        }} className={`toolbarBtn ${currentTool == "Line" ? " primary" : "secondary"}`}>Line</button>
                        <button onMouseDown={() => {
                            setCurrentTool("Fill");
                        }} className={`toolbarBtn ${currentTool == "Fill" ? " primary" : "secondary"}`}>Fill</button>
                        <button onMouseDown={() => {
                            setCurrentTool("Erase");
                        }} className={`toolbarBtn ${currentTool == "Erase" ? " primary" : "secondary"}`}>Erase</button>
                    </div>

                </div>
            </div>
        </>
    )
}