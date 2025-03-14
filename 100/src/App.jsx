import React from "react";
import Header from "./components/Header";
import StockCard from "./components/StockCard";
import Companyinfo from "./components/Companyinfo";

function App() {

  return (

    <div>
      <Header />
      <div className="flex">
      <StockCard />
      <Companyinfo />
      </div>
      
    </div>

  )
}

export default App
