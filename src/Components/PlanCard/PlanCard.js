import React from 'react'

function PlanCard({planName, id, setCurrentSelected, currentSelected}){
    return (
         <div className='flex flex-col items-center justify-center'>
             <div className= {(id) === currentSelected ? "flex flex-col w-[6em] h-[6em] bg-box-blue-color items-center justify-center" : "flex flex-col w-[6em] h-[6em] bg-box-light-blue-color items-center justify-center opacity-50"} onClick={() => setCurrentSelected(id)}>
                <div className="text-white text-xs">{planName}</div> 
            </div>
         </div>
    )
}

export default PlanCard;