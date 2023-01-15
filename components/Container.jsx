import { useEffect, useState } from "react";
const Container = ({title, tColor, desc, pic, skills, rev, children}) => {
    const [width, setWidth] = useState(0)
    useEffect(() => {
        setWidth(window.screen.availWidth * (1/8))
    }, [])
    const height = width / 0.478
    return (
        <div className={`w-full flex ${rev} justify-center mb-16`}>
        <div style={{"width": `${width}px`, "height": `${height}px`}} className="relative border-8 border-black rounded-3xl bg-white shadow-2xl">
            <img src={pic} alt="" className="rounded-xl"/>
            <div className="absolute top-0 bg-black rounded-b-lg" style={{width: `${width * 0.5}px`, height: `${height * 0.04}px`, left: `${width * 0.22}px`}}></div>
		</div>
        <div className="w-1/2 mx-10">
            <h1 className={`text-3xl font-bold ${tColor} text-center`}>{title}</h1>
            {children}
            <h2 className="font-semibold text-xl text-left mt-20">Built with...</h2>
            <h2 className="text-2xl uppercase font-semibold text-blue-500 text-left">{skills}</h2>
        </div>
        </div>
    )
}

export default Container;