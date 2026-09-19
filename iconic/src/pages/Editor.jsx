import { useRef, useState, useEffect } from "react"

export default function Editor() {
    const [gridSize, setGridSize] = useState(8);
    const [currentTool, setCurrentTool] = useState("Circle");
    const canvasRef = useRef(null);

    const [cursorDat, setCursorDat] = useState({
        start: [0, 0],
        end: [0, 0],
        offset: {
            position: [0, 0],
            scale: [0, 0],
        },
        mouseDown: false,
    })

    const [shapePreview, setShapePreview] = useState("")

    const [projectDat, setProjectDat] = useState({
        guides: [],
    })

    const canvasSize = 256;

    useEffect(() => {
        const controller = new AbortController();
        const gridUnit = canvasSize / gridSize;

        if (canvasRef.current) {
            canvasRef.current.innerHTML = ""

            for (let gx = 0; gx <= gridSize; gx++) {
                canvasRef.current.innerHTML += `
                    <line x1=${gx * gridUnit} y1=${0} x2=${(gx) * gridUnit} y2=${canvasSize} stroke="${gx == gridSize / 2 ? 'rgba(0, 255, 0, 0.2)" stroke-width="2"' : 'rgba(255, 255, 255, 0.1)" stroke-width="1"'}></line>`
            }
            for (let gy = 0; gy <= gridSize; gy++) {
                canvasRef.current.innerHTML += `
                    <line x1=${0} y1=${gy * gridUnit} x2=${canvasSize} y2=${gy * gridUnit} stroke="${gy == gridSize / 2 ? 'rgba(255, 0, 0, 0.2)" stroke-width="2"' : 'rgba(255, 255, 255, 0.1)" stroke-width="1"'}></line>`
            }


            canvasRef.current.addEventListener("mousedown", (e) => {
                const canvasBox = canvasRef.current.getBoundingClientRect();
                setCursorDat((prev) => ({
                    ...prev,
                    start: [
                        Math.round(((e.clientX - canvasBox.left) * (canvasSize / canvasBox.width)) / gridUnit) * gridUnit,
                        Math.round(((e.clientY - canvasBox.top) * (canvasSize / canvasBox.height)) / gridUnit) * gridUnit,
                    ],
                    offset: {
                        position: [canvasBox.left, canvasBox.top],
                        scale: [canvasBox.width, canvasBox.height],
                    },
                    mouseDown: true,
                }))

                console.log(
                    Math.round(((e.clientX - canvasBox.left) * (canvasSize / canvasBox.width)) / gridUnit) * gridUnit,
                    Math.round(((e.clientY - canvasBox.top) * (canvasSize / canvasBox.height)) / gridUnit) * gridUnit,
                )

            }, { signal: controller.signal })

            canvasRef.current.innerHTML += shapePreview;
        }

        window.addEventListener("mousemove", (e) => {
            if (cursorDat.mouseDown === true) {
                setCursorDat((prev) => ({
                    ...prev,
                    end: [
                        Math.round((e.clientX - prev.offset.position[0]) * (canvasSize / prev.offset.scale[0]) / gridUnit) * gridUnit,
                        Math.round((e.clientY - prev.offset.position[1]) * (canvasSize / prev.offset.scale[0]) / gridUnit) * gridUnit
                    ],
                }));

                switch (currentTool) {
                    case "Rectangle":
                        setShapePreview(`<rect x="${Math.min(cursorDat.start[0], cursorDat.end[0])}" y="${Math.min(cursorDat.start[1], cursorDat.end[1])}" width="${Math.abs(cursorDat.end[0] - cursorDat.start[0]) + 1}" height="${Math.abs(cursorDat.end[1] - cursorDat.start[1]) + 1}" stroke="rgba(255, 255, 255, 0.5)" stroke-width="3" fill="transparent" stroke-dasharray="10 10">
                        <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" />
                        </rect>`)
                        break;

                    case "Line":
                        setShapePreview(`<line x1="${Math.min(cursorDat.start[0])}" y1="${Math.min(cursorDat.start[1])}" x2="${Math.min(cursorDat.end[0])}" y2="${Math.min(cursorDat.end[1])}" width="${Math.abs(cursorDat.end[0] - cursorDat.start[0]) + 1}" height="${Math.abs(cursorDat.end[1] - cursorDat.start[1]) + 1}" stroke="rgba(255, 255, 255, 0.5)" stroke-width="3" fill="transparent" stroke-dasharray="10 10">
                        <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" />
                        </line>`)
                        break;
                }
            }

        }, { signal: controller.signal })


        window.addEventListener("mouseup", () => {
            setCursorDat((prev) => ({
                ...prev,
                mouseDown: false,
            }))
        }, { signal: controller.signal })

        return () => {
            controller.abort();
        }
    }, [gridSize, cursorDat, currentTool, shapePreview]);

    return (
        <>
            <div className="fixed top-0 left-0 z-99 w-full h-10 bg-text/15">
                <div className="max-w-screen-lg px-2 mx-auto py-2">
                    Iconic
                </div>
            </div>

            <div className="flex flex-row w-full pt-12 h-full">
                <div className="w-70 border-r-2 border-r-surface-med pr-3">
                    <h2 className="text-3xl font-semibold">Editor settings</h2>
                    <hr />
                    <div>
                        <div>Grid guide size</div>
                        <input onInput={(e) => { setGridSize([4, 8, 16][Number(e.target.value) - 1]) }} type="range" min={1} max={3} defaultValue={2} className="w-full" />
                        <div className="flex flex-row w-full opacity-50">
                            <div className="font-mono flex-1 text-left">4x4</div>
                            <div className="font-mono flex-1 text-center">8x8</div>
                            <div className="font-mono flex-1 text-right">16x16</div>
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