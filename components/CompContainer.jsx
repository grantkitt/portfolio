import { useEffect, useState } from "react";
const CompContainer = ({title, tColor, desc, pic, skills, rev, children}) => {
    const [width, setWidth] = useState(0)
    useEffect(() => {
        setWidth(window.screen.width * (1/6))
    }, [])
    const height = width * 0.5
    return (
        <div className={`w-full flex ${rev} justify-center mb-16`}>
        <div style={{"width": `${width}px`}}>
        <div style={{"width": `${width}px`, "height": `${height}px`}} className="relative border-8 border-black rounded-t-xl bg-white shadow-2xl">
            <img src={pic} alt="" className="rounded-t-xl"/>
            
		</div>
        <div style={{"width": `${width}px`, "height": `${height * 0.2}px`}} className='bg-black rounded-b-xl pt-1'>
        <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' width="20" height="25" viewBox="0 0 496.255 608.728"><path d="M273.81 52.973C313.806.257 369.41 0 369.41 0s8.271 49.562-31.463 97.306c-42.426 50.98-90.649 42.638-90.649 42.638s-9.055-40.094 26.512-86.971zM252.385 174.662c20.576 0 58.764-28.284 108.471-28.284 85.562 0 119.222 60.883 119.222 60.883s-65.833 33.659-65.833 115.331c0 92.133 82.01 123.885 82.01 123.885s-57.328 161.357-134.762 161.357c-35.565 0-63.215-23.967-100.688-23.967-38.188 0-76.084 24.861-100.766 24.861C89.33 608.73 0 455.666 0 332.628c0-121.052 75.612-184.554 146.533-184.554 46.105 0 81.883 26.588 105.852 26.588z" fill="#FFF"/></svg>
        </div>
        <div className="mx-auto bg-black" style={{"width": `${width * 0.2}px`, "height": `${height * 0.2}px`}}></div>
        <div className="mx-auto bg-black rounded-full" style={{"width": `${width * 0.5}px`, "height": `${height * 0.05}px`}}></div>
        </div>
        <div className="w-2/5 mx-10">
            <h1 className={`text-3xl font-bold ${tColor} text-center`}>{title}</h1>
            {children}
            <h2 className="font-semibold text-xl text-left mt-20">Built with...</h2>
            <h2 className="text-2xl uppercase font-semibold text-blue-500 text-left">{skills}</h2>
        </div>
        </div>
    )
}

export default CompContainer;