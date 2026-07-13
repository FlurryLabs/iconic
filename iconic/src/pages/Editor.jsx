import { useRef, useState, useEffect } from "react"

export default function Editor() {
    const [gridSize, setGridSize] = useState(8);
    const [currentTool, setCurrentTool] = useState("Circle");
    const canvasRef = useRef(null);

    const canvasSize = 256;

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.innerHTML = ""
            console.log(gridSize)
            const gridUnit = canvasSize / gridSize;
            for (let gx = 0; gx <= gridSize; gx++) {
                canvasRef.current.innerHTML += `
                    <line x1=${gx * gridUnit} y1=${0} x2=${(gx) * gridUnit} y2=${canvasSize} stroke="${gx == gridSize / 2 ?  'rgba(0, 255, 0, 0.2)" stroke-width="2"' : 'rgba(255, 255, 255, 0.1)" stroke-width="1"'}></line>`
            }
            for (let gy = 0; gy <= gridSize; gy++) {
                canvasRef.current.innerHTML += `
                    <line x1=${0} y1=${gy * gridUnit} x2=${canvasSize} y2=${gy * gridUnit} stroke="${gy == gridSize / 2 ?  'rgba(255, 0, 0, 0.2)" stroke-width="2"' : 'rgba(255, 255, 255, 0.1)" stroke-width="1"'}></line>`
            }

        }
    }, [gridSize]);

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
                            <input onInput={(e) => { setGridSize(e.target.value) }} type="range" min={4} max={16} step={4} defaultValue={8} className="flex-1" />
                            <div className="font-mono">16x16</div>

                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="w-full h-90">
                        <div className="aspect-square h-full bg-surface-med mx-auto">
                            <svg ref={canvasRef} width={canvasSize} height={canvasSize} className="w-full h-full" viewBox={`0 0 ${canvasSize} ${canvasSize}`} preserveAspectRatio="none">

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