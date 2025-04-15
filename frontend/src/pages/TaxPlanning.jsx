import React, { useState } from 'react';
import './TaxPlanning.css';

const TaxPlanning = () => {
    const [income, setIncome] = useState('');
    const [deductions, setDeductions] = useState('');
    const [investment, setInvestment] = useState('');
    const [regime, setRegime] = useState('old');
    const [section80C, setSection80C] = useState('');
    const [section80D, setSection80D] = useState('');
    const [hra, setHra] = useState('');
    const [taxableIncome, setTaxableIncome] = useState(null);
    const [tax, setTax] = useState(null);
    const [savings, setSavings] = useState(null);
    const [showTips, setShowTips] = useState(false);
    
    // GenAI state variables
    const [aiAdvice, setAiAdvice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userQuery, setUserQuery] = useState('');
    const [geminiApiKey, setGeminiApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
    const [showApiKeyInput, setShowApiKeyInput] = useState(!import.meta.env.VITE_GEMINI_API_KEY);

    const calculateTax = () => {
        const incomeValue = parseFloat(income) || 0;
        const deductionsValue = parseFloat(deductions) || 0;
        const sec80CValue = parseFloat(section80C) || 0;
        const sec80DValue = parseFloat(section80D) || 0;
        const hraValue = parseFloat(hra) || 0;
        const investmentValue = parseFloat(investment) || 0;

        const totalDeductions = deductionsValue + sec80CValue + sec80DValue + hraValue;
        const taxable = Math.max(0, incomeValue - totalDeductions);
        setTaxableIncome(taxable);

        let calculatedTax = 0;

        if (regime === 'old') {
            // Old regime calculation
            if (taxable <= 250000) {
                calculatedTax = 0;
            } else if (taxable <= 500000) {
                calculatedTax = (taxable - 250000) * 0.05;
            } else if (taxable <= 1000000) {
                calculatedTax = 12500 + (taxable - 500000) * 0.2;
            } else {
                calculatedTax = 112500 + (taxable - 1000000) * 0.3;
            }
        } else {
            // New regime calculation
            if (taxable <= 300000) {
                calculatedTax = 0;
            } else if (taxable <= 600000) {
                calculatedTax = (taxable - 300000) * 0.05;
            } else if (taxable <= 900000) {
                calculatedTax = 15000 + (taxable - 600000) * 0.1;
            } else if (taxable <= 1200000) {
                calculatedTax = 45000 + (taxable - 900000) * 0.15;
            } else if (taxable <= 1500000) {
                calculatedTax = 90000 + (taxable - 1200000) * 0.2;
            } else {
                calculatedTax = 150000 + (taxable - 1500000) * 0.3;
            }
        }

        // Apply rebate under Section 87A if applicable (for old regime)
        let rebateAmount = 0;
        if (regime === 'old' && taxable <= 500000) {
            rebateAmount = Math.min(calculatedTax, 12500);
            calculatedTax -= rebateAmount;
        }

        // Calculate education and health cess (4%)
        const cess = calculatedTax * 0.04;
        calculatedTax += cess;

        setTax(calculatedTax);

        // Calculate potential tax savings
        if (investmentValue > 0) {
            const savingsRate = regime === 'old' ? 0.3 : 0.2; // Highest tax bracket rate
            const potentialSavings = investmentValue * savingsRate;
            setSavings(potentialSavings);
        }
        
        // Generate AI advice after calculation
        generateGeminiAdvice(incomeValue, taxable, calculatedTax, regime);
    };

    const toggleRegime = (selectedRegime) => {
        setRegime(selectedRegime);
    };
    
    // Function to generate AI advice using Gemini API
    const generateGeminiAdvice = async (incomeValue, taxable, calculatedTax, regime) => {
        if (!geminiApiKey) {
            setAiAdvice("Please enter a Gemini API key to get personalized tax advice.");
            setShowApiKeyInput(true);
            return;
        }

        setIsLoading(true);
        
        try {
            const taxRate = (calculatedTax / incomeValue) * 100;
            
            const prompt = `
                As a tax advisor in India, provide personalized advice based on the following tax information:
                - Annual Income: ₹${incomeValue.toFixed(2)}
                - Taxable Income: ₹${taxable.toFixed(2)}
                - Calculated Tax: ₹${calculatedTax.toFixed(2)}
                - Effective Tax Rate: ${taxRate.toFixed(2)}%
                - Tax Regime: ${regime === 'old' ? 'Old Regime (with deductions)' : 'New Regime (without deductions)'}
                
                Provide specific advice on:
                1. Tax saving opportunities 
                2. Investment recommendations
                3. Any changes they should consider for optimal tax planning
                
                Keep it concise (100-150 words) and specific to Indian tax laws. Use ₹ for currency.
            `;
            
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro:generateContent?key=${geminiApiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1024,
                    }
                })
            });
            
            const data = await response.json();
            
            if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                setAiAdvice(data.candidates[0].content.parts[0].text);
            } else {
                setAiAdvice("Sorry, I couldn't generate advice at this time. Please try again later.");
                console.error("Gemini API response error:", data);
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setAiAdvice("Sorry, there was an error generating tax advice. Please check your API key and try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    // Function to handle custom AI query using Gemini API
    const handleGeminiQuery = async () => {
        if (!userQuery.trim()) return;
        if (!geminiApiKey) {
            setAiAdvice("Please enter a Gemini API key to get personalized tax advice.");
            setShowApiKeyInput(true);
            return;
        }
        
        setIsLoading(true);
        
        try {
            const prompt = `
                As a tax advisor in India, answer the following question about Indian tax planning, tax laws, or investment advice for tax optimization. Be concise, accurate, and specific to Indian tax context:
                
                Question: ${userQuery}
                
                Mention specific sections of tax code when relevant. Use ₹ for currency.
            `;
            
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.2,
                        maxOutputTokens: 1024,
                    }
                })
            });
            
            const data = await response.json();
            
            if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                setAiAdvice(data.candidates[0].content.parts[0].text);
            } else {
                setAiAdvice("Sorry, I couldn't process your question at this time. Please try again later.");
                console.error("Gemini API response error:", data);
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setAiAdvice("Sorry, there was an error processing your question. Please check your API key and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleApiKeySubmit = () => {
        // Save the API key and hide the input
        if (geminiApiKey.trim()) {
            setShowApiKeyInput(false);
            // You can additionally save to localStorage if needed
            // localStorage.setItem('geminiApiKey', geminiApiKey);
        }
    };

    return (
        <div className="tax-planning-container">
            <h1 className="title">Tax Planning</h1>
            <p className="description">Use this calculator to estimate your income tax liability and plan your investments for tax benefits in India.</p>
            
            <div className="tax-regime-toggle">
                <div 
                    className={`regime-option ${regime === 'old' ? 'active' : ''}`}
                    onClick={() => toggleRegime('old')}
                >
                    Old Regime
                </div>
                <div 
                    className={`regime-option ${regime === 'new' ? 'active' : ''}`}
                    onClick={() => toggleRegime('new')}
                >
                    New Regime
                </div>
            </div>

            <div className="input-group">
                <label>Annual Income (₹)</label>
                <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="input-field"
                    placeholder="Enter your annual income"
                />
            </div>

            {regime === 'old' && (
                <>
                    <div className="input-group">
                        <label>Section 80C Deductions (₹)</label>
                        <input
                            type="number"
                            value={section80C}
                            onChange={(e) => setSection80C(e.target.value)}
                            className="input-field"
                            placeholder="EPF, ELSS, PPF, etc. (Max 1.5 Lakh)"
                            max="150000"
                        />
                    </div>

                    <div className="input-group">
                        <label>Section 80D Health Insurance (₹)</label>
                        <input
                            type="number"
                            value={section80D}
                            onChange={(e) => setSection80D(e.target.value)}
                            className="input-field"
                            placeholder="Medical insurance premium"
                        />
                    </div>

                    <div className="input-group">
                        <label>HRA Exemption (₹)</label>
                        <input
                            type="number"
                            value={hra}
                            onChange={(e) => setHra(e.target.value)}
                            className="input-field"
                            placeholder="House Rent Allowance exemption"
                        />
                    </div>
                </>
            )}

            <div className="input-group">
                <label>Other Deductions (₹)</label>
                <input
                    type="number"
                    value={deductions}
                    onChange={(e) => setDeductions(e.target.value)}
                    className="input-field"
                    placeholder="Other eligible deductions"
                />
            </div>

            <div className="input-group">
                <label>Planned Investments (₹)</label>
                <input
                    type="number"
                    value={investment}
                    onChange={(e) => setInvestment(e.target.value)}
                    className="input-field"
                    placeholder="Enter planned investment amount"
                />
            </div>

            <button onClick={calculateTax} className="calculate-button">Calculate Tax</button>
            <button onClick={() => setShowTips(!showTips)} className="calculate-button">
                {showTips ? "Hide Tax Saving Tips" : "Show Tax Saving Tips"}
            </button>

            {taxableIncome !== null && (
                <div className="results">
                    <h2>Tax Calculation Results</h2>
                    <p>Taxable Income: ₹{taxableIncome.toFixed(2)}</p>
                    <p>Estimated Tax Liability: ₹{tax.toFixed(2)}</p>
                    <p>Effective Tax Rate: {((tax / parseFloat(income)) * 100).toFixed(2)}%</p>
                    {savings !== null && (
                        <p>Potential Tax Savings from Investments: ₹{savings.toFixed(2)}</p>
                    )}
                </div>
            )}
            
            {/* Gemini-powered TaxGPT */}
            <div className="genai-advisor">
                <h2>TaxGPT: Gemini-Powered Tax Advisor</h2>
                <p className="genai-description">Get personalized tax advice powered by Google's Gemini AI</p>
                
                {showApiKeyInput && (
                    <div className="api-key-input">
                        <label>Enter Gemini API Key</label>
                        <div className="api-key-field">
                            <input
                                type="password"
                                value={geminiApiKey}
                                onChange={(e) => setGeminiApiKey(e.target.value)}
                                className="input-field"
                                placeholder="Enter your Gemini API key"
                            />
                            <button onClick={handleApiKeySubmit} className="api-key-button">
                                Save
                            </button>
                        </div>
                        <p className="api-key-info">
                            You can get a Gemini API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio</a>
                        </p>
                    </div>
                )}
                
                {isLoading ? (
                    <div className="ai-loading">
                        <div className="ai-loading-spinner"></div>
                        <p>Consulting Gemini AI for tax advice...</p>
                    </div>
                ) : aiAdvice ? (
                    <div className="ai-response">
                        <div className="ai-response-header">
                            <div className="ai-icon"></div>
                            <h3>Gemini Tax Advice</h3>
                        </div>
                        <p>{aiAdvice}</p>
                    </div>
                ) : null}
                
                <div className="ai-query">
                    <input
                        type="text"
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                        className="input-field"
                        placeholder="Ask about specific tax deductions, investment strategies, etc."
                    />
                    <button onClick={handleGeminiQuery} className="ai-query-button">Ask TaxGPT</button>
                </div>
            </div>
            
            {showTips && (
                <div className="investment-tips">
                    <h3>Tax Saving Investment Tips</h3>
                    <ul>
                        <li>Invest in ELSS (Equity Linked Saving Scheme) for tax benefits with potential market returns</li>
                        <li>Contribute to your EPF (Employee Provident Fund) for long-term tax benefits</li>
                        <li>Consider PPF (Public Provident Fund) for a secure, tax-free investment option</li>
                        <li>Purchase health insurance for yourself and family to claim deductions under Section 80D</li>
                        <li>Invest in National Pension System (NPS) for additional tax benefits under Section 80CCD</li>
                        <li>Home loan principal repayment qualifies for deduction under Section 80C</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TaxPlanning;