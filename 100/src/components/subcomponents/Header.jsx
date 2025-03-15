import React from 'react'

const Header = () => {
  return (
    <div className="px-8">
      <div 
           style={{
            background: "rgba(255, 255, 255, 0.5)", 
            backdropFilter: "blur(50px)",
            WebkitBackdropFilter: "blur(50px)", 
            borderRadius: "16px", 
            padding: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)" 
          }}
          className="flex justify-between items-center p-3 rounded-2xl mt-4 cursor-pointer bg-white">
        <div className="text-lg font-bold">GrowStock</div>
        <div className="flex gap-10 absolute left-1/2 transform -translate-x-1/2">
          <span>Home</span>
          <span>Portfolio</span>
          <span>WatchList</span>
          <span>Explore</span>
        </div>
      </div>
    </div>
  )
}

export default Header
