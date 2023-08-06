import React from 'react'

function PlanCard({planName, id, setCurrentSelected, currentSelected}){
    return (
         <div className='flex flex-col items-center justify-center'>
             <div className= {(id) === currentSelected ? "flex flex-col w-[6em] h-[6em] bg-box-blue-color items-center justify-center" : "flex flex-col w-[6em] h-[6em] bg-box-light-blue-color items-center justify-center opacity-50"} onClick={() => setCurrentSelected(id)}>
                <div className="text-white text-xs">{planName}</div>
            </div>
            {(id) === currentSelected ? <div class="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-box-blue-color relative"></div> : <></>}
         </div>
    )
}

export default PlanCard;