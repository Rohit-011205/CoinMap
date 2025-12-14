import React, { useEffect,useState } from 'react'
import axios, { Axios } from 'axios'

const Tabs = () => {
    const [coins,setcoins] = useState([])

    useEffect(()=>{
      
         axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&id")
         
         .then((response)=>{
            console.log(response.data)
         })
         .catch((error)=>{
            console.log(error.message)
         })

    },[])
  return (
    <div>
      
    </div>
  )
}

export default Tabs
