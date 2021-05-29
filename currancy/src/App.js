import React,{useEffect , useState} from 'react' 
import './App.css'
import Currancy from './Currancy'

const Api = 'http://api.exchangeratesapi.io/v1/latest?access_key=b540c23e50dd9b7640727b8dcd40a15f&format=1'
function App(){
  const [currancyOptions, setcurrancyOptions] = useState([])
  const [fromCurrancy, setfromCurrancy] = useState()
  const [toCurrancy, settoCurrancy] = useState()
  const [exchangeRate, setexchangeRate] = useState()
  const [amount, setamount] = useState(1)
  const [checkCurrancyStatus, setcheckCurrancyStatus] = useState(true)

  let fromAmount , toAmount
  if(fromAmount){
    fromAmount = amount 
    toAmount = amount * exchangeRate
  }else{
    toAmount = amount
    fromAmount = amount / exchangeRate
  }


useEffect(()=>{
    fetch(Api)
    .then(res=> res.json())
    .then(data =>{
      const firstcurrancy = Object.keys(data.rates)
      setcurrancyOptions([data.base , ...Object.keys(data.rates)])
      setfromCurrancy(data.base)
      settoCurrancy(firstcurrancy)
      console.log(data)
    })

},[])

useEffect(()=>{
  fetch(`${Api}$base=${fromCurrancy}$symbols=${toCurrancy}`)
  .then(res=> res.json())
  .then(data => {
           setexchangeRate(data.rates[toCurrancy])
  })
},[fromCurrancy, toCurrancy])

  const handleFromAmount =(e) =>{
    setamount(e.target.value)
    setcheckCurrancyStatus(true)
  }  

  const handleToAmount =(e) =>{
    setamount(e.target.value)
    setcheckCurrancyStatus(true)
  }   

  return(
    <>
    
    <Currancy
    currancyOptions={currancyOptions}
    selectedCurrancy ={toCurrancy}
    curracyChange = {e => settoCurrancy(e.target.value)}
    amount = {toAmount}
    onAmountChange = {handleToAmount}
   />
   <div>=</div>
    <Currancy 
    currancyOptions ={currancyOptions}
    selectedCurrancy = {fromCurrancy}
    curracyChange = {e => setfromCurrancy(e.target.value)}
    amount = {fromAmount}
    onAmountChange = {handleFromAmount}
   />
    
    </>
  )
}
export default App