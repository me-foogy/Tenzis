
export default function EachDice(props){

    return(
        <>
        <button className={`bg-white h-24 cursor-pointer shadow-sm rounded-2xl hover:bg-[#C1E59F] duration-300 ease-in-out ${props.fixed==true?'border-[#A3D78A] border-6':''}`} onClick={()=>props.function(props.id)}>{props.diceValue}</button>
        </>
    )
}