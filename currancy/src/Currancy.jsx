import React from 'react'

export default function Currancy(props) {
    const {
        currancyOptions,
        selectedCurrancy,
        curracyChange,
        amount,
        onAmountChange
    } = props
    return (
        <div>
           <input type = "number" value={amount} onChange={onAmountChange}></input>
           <select value ={selectedCurrancy} onChange={curracyChange}>
               {currancyOptions.map((option , idx)=> {
                   return <option key={idx} value={option}>{option}</option>
               })}
           </select>
        </div>
    )
}
