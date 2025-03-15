import React from 'react';

const Companyinfo = () => {
  return (
    <div className="px-12 py-8 w-2/4 mx-5">
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(50px)",
          borderRadius: "16px",
          padding: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.7)",
        }}
        className="flex flex-col w-auto h-[600px]"
      >
        <div className="flex flex-col mt-20"> {/* Added mt-20 to push text down */}
          <span className="px-20 text-xl font-extrabold">NETFLIX</span>
          <span className="px-20 text-4xl font-extrabold">$163.45</span>
        </div>
      </div>
    </div>
  );
};

export default Companyinfo;
