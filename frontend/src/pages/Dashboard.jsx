import React from 'react'
import { useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Sample data for charts
const profitLossData = [
  { name: "Jan", profit: 4000, loss: 2400 },
  { name: "Feb", profit: 3000, loss: 1398 },
  { name: "Mar", profit: 2000, loss: 9800 },
  { name: "Apr", profit: 2780, loss: 3908 },
  { name: "May", profit: 1890, loss: 4800 },
  { name: "Jun", profit: 2390, loss: 3800 },
  { name: "Jul", profit: 3490, loss: 4300 },
  { name: "Aug", profit: 4000, loss: 2400 },
  { name: "Sep", profit: 5000, loss: 1398 },
  { name: "Oct", profit: 6000, loss: 9800 },
  { name: "Nov", profit: 7000, loss: 3908 },
  { name: "Dec", profit: 9000, loss: 4800 },
]

const portfolioData = [
  { name: "Stocks", value: 400, color: "#0088FE" },
  { name: "Bonds", value: 300, color: "#00C49F" },
  { name: "Real Estate", value: 300, color: "#FFBB28" },
  { name: "Crypto", value: 200, color: "#FF8042" },
  { name: "Cash", value: 100, color: "#8884d8" },
]

const performanceData = [
  { name: "Stocks", current: 4000, previous: 2400 },
  { name: "Bonds", current: 3000, previous: 1398 },
  { name: "Real Estate", current: 2000, previous: 9800 },
  { name: "Crypto", current: 2780, previous: 3908 },
  { name: "Cash", current: 1890, previous: 4800 },
]

const cumulativeReturnsData = [
  { name: "Jan", returns: 4000 },
  { name: "Feb", returns: 7000 },
  { name: "Mar", returns: 9000 },
  { name: "Apr", returns: 11780 },
  { name: "May", returns: 13670 },
  { name: "Jun", returns: 16060 },
  { name: "Jul", returns: 19550 },
  { name: "Aug", returns: 23550 },
  { name: "Sep", returns: 28550 },
  { name: "Oct", returns: 34550 },
  { name: "Nov", returns: 41550 },
  { name: "Dec", returns: 50550 },
]

const adviceData = [
  {
    title: "Diversify Your Portfolio",
    description: "Consider allocating your investments across different asset classes to reduce risk.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
        />
      </svg>
    ),
  },
  {
    title: "Increase Emergency Fund",
    description: "Aim to have 6-9 months of expenses saved in a liquid emergency fund.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Review Tax Strategies",
    description: "Optimize your investments for tax efficiency by utilizing tax-advantaged accounts.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Consider Dollar-Cost Averaging",
    description: "Invest a fixed amount regularly to reduce the impact of market volatility.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
]

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
     

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-8 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 md:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export
            </button>
            <button className="relative rounded-md border border-gray-300 p-1.5 text-gray-700 hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                3
              </span>
            </button>
            <button className="rounded-md border border-gray-300 p-1.5 text-gray-700 hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
            <button className="rounded-md border border-gray-300 p-1.5 text-gray-700 hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Main Dashboard */}
        <main className="flex-1 overflow-auto p-6">
          <div className="flex flex-col gap-6">
            {/* Dashboard Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome back, John. Here's an overview of your investments.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Last 30 days
                </button>
                <button className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Investment
                </button>
              </div>
            </div>

            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between pb-2">
                  <p className="text-sm font-medium text-gray-500">Total Portfolio Value</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-900">$45,231.89</div>
                <div className="flex items-center text-sm text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>+20.1%</span>
                  <span className="ml-1 text-gray-500">from last month</span>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between pb-2">
                  <p className="text-sm font-medium text-gray-500">Monthly Returns</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-900">$2,350.45</div>
                <div className="flex items-center text-sm text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>+5.2%</span>
                  <span className="ml-1 text-gray-500">from last month</span>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between pb-2">
                  <p className="text-sm font-medium text-gray-500">YTD Performance</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-900">+18.2%</div>
                <div className="flex items-center text-sm text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>+2.5%</span>
                  <span className="ml-1 text-gray-500">from last year</span>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between pb-2">
                  <p className="text-sm font-medium text-gray-500">Risk Score</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-2xl font-bold text-gray-900">Moderate</div>
                <div className="flex items-center text-sm text-gray-500">
                  <span>65/100 risk points</span>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="space-y-4">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "overview"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("performance")}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "performance"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Performance
                </button>
                <button
                  onClick={() => setActiveTab("allocation")}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "allocation"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Allocation
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "history"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  History
                </button>
              </div>

              {activeTab === "overview" && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Profit/Loss Chart */}
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:col-span-4">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">Profit & Loss</h3>
                        <p className="text-sm text-gray-500">Monthly profit and loss overview</p>
                      </div>
                      <div className="h-[300px] pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={profitLossData}
                            margin={{
                              top: 5,
                              right: 10,
                              left: 10,
                              bottom: 0,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                              }}
                            />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="profit"
                              stroke="#10b981"
                              strokeWidth={2}
                              dot={{ r: 0 }}
                              activeDot={{ r: 6 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="loss"
                              stroke="#ef4444"
                              strokeWidth={2}
                              dot={{ r: 0 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Portfolio Diversity */}
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:col-span-3">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">Portfolio Diversity</h3>
                        <p className="text-sm text-gray-500">Asset allocation breakdown</p>
                      </div>
                      <div className="h-[300px] pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={portfolioData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              labelLine={false}
                            >
                              {portfolioData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => [`$${value}`, "Value"]}
                              contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Performance Comparison */}
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:col-span-3">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">Performance Comparison</h3>
                        <p className="text-sm text-gray-500">Current vs Previous Period</p>
                      </div>
                      <div className="h-[300px] pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={performanceData}
                            margin={{
                              top: 5,
                              right: 10,
                              left: 10,
                              bottom: 20,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                              }}
                            />
                            <Legend />
                            <Bar dataKey="current" name="Current" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="previous" name="Previous" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Cumulative Returns */}
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:col-span-4">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">Cumulative Returns</h3>
                        <p className="text-sm text-gray-500">Year-to-date growth</p>
                      </div>
                      <div className="h-[300px] pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={cumulativeReturnsData}
                            margin={{
                              top: 5,
                              right: 10,
                              left: 10,
                              bottom: 0,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                              formatter={(value) => [`$${value}`, "Returns"]}
                              contentStyle={{
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="returns"
                              stroke="#8884d8"
                              fill="url(#colorReturns)"
                              strokeWidth={2}
                            />
                            <defs>
                              <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                              </linearGradient>
                            </defs>
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "performance" && (
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Performance Analysis</h3>
                    <p className="text-sm text-gray-500">Detailed performance metrics</p>
                  </div>
                  <div className="pt-4">
                    <p>Performance content will be displayed here.</p>
                  </div>
                </div>
              )}

              {activeTab === "allocation" && (
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Asset Allocation</h3>
                    <p className="text-sm text-gray-500">Current allocation and recommendations</p>
                  </div>
                  <div className="pt-4">
                    <p>Allocation content will be displayed here.</p>
                  </div>
                </div>
              )}

              {activeTab === "history" && (
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Transaction History</h3>
                    <p className="text-sm text-gray-500">Recent investment activities</p>
                  </div>
                  <div className="pt-4">
                    <p>History content will be displayed here.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Investment Advice */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight text-gray-900">Investment Advice</h2>
                <button className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  View All
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {adviceData.map((advice, index) => (
                  <div key={index} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center gap-3 p-4 pb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        {advice.icon}
                      </div>
                      <h3 className="text-base font-semibold text-gray-900">{advice.title}</h3>
                    </div>
                    <div className="px-4 pb-4">
                      <p className="text-sm text-gray-600">{advice.description}</p>
                    </div>
                    <div className="border-t bg-gray-50 p-3">
                      <button className="flex h-8 w-full items-center justify-start gap-1 rounded-md px-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                        <span>Learn More</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard

