import React from 'react'
import Header from './subcomponents/Header'
import StockCard from './subcomponents/StockCard'
import CompanyInfo from './subcomponents/CompanyInfo'


const Landing = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <StockCard />
        <CompanyInfo />
      </div>
    </div>
  )
}

export default Landing
