import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const userregex=  /^[a-z][a-zA-Z0-9-_]{3,23}$/;
const pwdregex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@$%]).{8,25}/;
export default function Signup() {
  const [email, setEmail] = useState("");
  const navigate= useNavigate();
  const navi=useNavigate();
  const [password, setPassword] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", { email, password });
    
    
    try {
        // const response = await fetch("link here", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({email:email},password),
        // });
        console.log(JSON.stringify({email:email},{password}))
        // const data = await response.json();
        // console.log(data);
      } catch (error) {
        console.error("Error sending data:", error);
      }
      navigate("/login")
  };

  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-white text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Sign Up
          </button>

        </form>
        <a href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition " >login</a>
      </div>
      
    </div>
  );
}
