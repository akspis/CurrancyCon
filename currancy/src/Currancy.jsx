import React from 'react'

 function Currancy(props) {
 const {
    CurrencyOption,
    selectedCurrency,
    CurrancyChange,
    Amount,
    changeAmount
 } = props
  return (
    <div >
     <input type='number' value={Amount} onChange={changeAmount} className='inp'/>
     <select value={selectedCurrency} onChange={CurrancyChange} className='sel'>
         { CurrencyOption.map((option,idx) =>{
           return <option key={idx} value={option}>{option}</option>
        }) }
     </select>
    </div>
  )
}export default Currancy