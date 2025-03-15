import React from 'react'

const StockCard = () => {
  return (
    <div className="px-12 py-8 w-2/5">
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)", 
          backdropFilter: "blur(50px)",
          borderRadius: "16px", 
          padding: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.7)" 
        }}
        className="flex flex-col justify-center w-auto h-[600px]"
      >



        <div className="flex flex-col justify-center flex-grow">
          <div className="text-4xl font-extrabold">
            Netflix
            <hr className="w-44 border-2"></hr>
          </div>
          <div className="text-[1em] font-extralight mt-2">
            A global streaming giant generating revenue through subscriptions and ad-supported plans.
            Strong growth potential but faces high content costs and competition.
          </div>
        </div>



        <div className="mb-15">
          <div className="text-[1.2em] font-extrabold mx-4">Overall Market Performance:</div>

          <div className='flex gap-8 mt-3 mx-10'>

            <div className='flex flex-col text-center'>
              <span className='font-bold text-[1.3em]'>65</span>
              <span className='text-gray-500 text-[0.7em]'>Growth</span>
            </div>
            <hr className='h-8 border-black border mt-2'></hr>

            <div className='flex flex-col text-center'>
              <span className='font-bold text-[1.3em]'>70</span>
              <span className='text-gray-500 text-[0.7em]'>Profit</span>
            </div>
            <hr className='h-8 border-black border mt-2'></hr>

            <div className='flex flex-col text-center'>
              <span className='font-bold text-[1.3em]'>60</span>
              <span className='text-gray-500 text-[0.7em]'>Value</span>
            </div>
            <hr className='h-8 border-black border mt-2'></hr>

            <div className='flex flex-col text-center'>
              <span className='font-bold text-[1.3em]'>80</span>
              <span className='text-gray-500 text-[0.7em]'>Health</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockCard
