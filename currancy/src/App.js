import React, { useEffect, useState } from 'react';
import './App.css';
import Currancy from './Currancy'

const URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=b540c23e50dd9b7640727b8dcd40a15f&format=1'

function App() {
  const [CurrencyOption, setCurrencyOption] = useState([])
  const [fromCurrency, setfromCurrency] = useState()
  const [toCurrency, settoCurrency] = useState()
  const [exchangeRate, setexchangeRate] = useState()
  const [Amount, setAmount] = useState(1)
  const [CurrencyStatus, setCurrencyStatus] = useState(true)
  

  let fromAmount , toAmount
  if(CurrencyStatus){
    fromAmount = Amount 
    toAmount = Amount * exchangeRate
  }else{
    toAmount = Amount
    fromAmount = Amount / exchangeRate
  }

useEffect(()=>{
    fetch(`${URL}$base=${fromCurrency}$symbols=${toCurrency}`)
    .then(res => res.json())
    .then(info => setexchangeRate(info.rates[toCurrency]))
},[fromCurrency, toCurrency])

  useEffect(()=>{
        fetch(URL)
        .then(res => res.json())
        .then(info => {
          const firstCurrency = Object.keys(info.rates)[0]
          setCurrencyOption([info.base , ...Object.keys(info.rates)])
          setfromCurrency(info.base)
          settoCurrency(firstCurrency)
        })
  },[])

  const handlefromCurrency = (e) =>{
    setAmount(e.target.value)
    setCurrencyStatus(true)
  }

  const handletoCurrency = (e) =>{
    setAmount(e.target.value)
    setCurrencyStatus(false)
  }

  return (
    <div className = 'App'>
    <h2 className='name'>Currency Converter</h2>
    <div className='currency1'>
     <Currancy
     CurrencyOption = {CurrencyOption}
     selectedCurrency ={fromCurrency}
     CurrancyChange = {e =>{setfromCurrency(e.target.value)}}
     Amount = {fromAmount}
     changeAmount = {handlefromCurrency}
     />
     </div>
     <div className='currency2'>
     <Currancy 
     CurrencyOption = {CurrencyOption}
     selectedCurrency ={toCurrency}
     CurrancyChange = {e =>{settoCurrency(e.target.value)}}
     Amount = {toAmount}
     changeAmount = {handletoCurrency}
     />
     </div>
    </div>
  );
}

export default App;