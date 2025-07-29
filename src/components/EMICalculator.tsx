import { useState, useEffect } from 'react';

interface EMICalculatorProps {
  defaultLoanAmount?: number;
  defaultInterestRate?: number;
  defaultTenure?: number;
}

export default function EMICalculator({
  defaultLoanAmount = 1500000,
  defaultInterestRate = 8.5,
  defaultTenure = 60,
}: EMICalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(defaultLoanAmount);
  const [interestRate, setInterestRate] = useState(defaultInterestRate);
  const [tenure, setTenure] = useState(defaultTenure);
  const [emi, setEMI] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculateEMI = () => {
    const principal = loanAmount;
    const ratePerMonth = (interestRate / 12) / 100;
    const numberOfPayments = tenure;

    const emiAmount = principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfPayments) 
                     / (Math.pow(1 + ratePerMonth, numberOfPayments) - 1);
    
    const totalAmount = emiAmount * numberOfPayments;
    const totalInterestAmount = totalAmount - principal;

    setEMI(Math.round(emiAmount));
    setTotalPayment(Math.round(totalAmount));
    setTotalInterest(Math.round(totalInterestAmount));
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="emi-calculator">
      <div className="space-y-6">
        {/* Loan Amount */}
        <div className="form-control">
          <div className="flex justify-between mb-2">
            <label className="text-base-content/80 text-sm font-medium">Loan Amount</label>
            <span className="font-semibold text-primary">{formatCurrency(loanAmount)}</span>
          </div>
          <input
            type="range"
            min="100000"
            max="10000000"
            step="10000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="range range-primary range-sm"
          />
          <div className="flex justify-between text-xs text-base-content/60 mt-1">
            <span>₹1L</span>
            <span>₹1Cr</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="form-control">
          <div className="flex justify-between mb-2">
            <label className="text-base-content/80 text-sm font-medium">Interest Rate (% p.a.)</label>
            <span className="font-semibold text-primary">{interestRate.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="20"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="range range-primary range-sm"
          />
          <div className="flex justify-between text-xs text-base-content/60 mt-1">
            <span>5%</span>
            <span>20%</span>
          </div>
        </div>

        {/* Loan Tenure */}
        <div className="form-control">
          <div className="flex justify-between mb-2">
            <label className="text-base-content/80 text-sm font-medium">Loan Tenure (months)</label>
            <span className="font-semibold text-primary">{tenure} months</span>
          </div>
          <input
            type="range"
            min="12"
            max="360"
            step="12"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="range range-primary range-sm"
          />
          <div className="flex justify-between text-xs text-base-content/60 mt-1">
            <span>1 year</span>
            <span>30 years</span>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-primary/10 p-4 rounded-lg text-center">
            <div className="text-primary text-sm mb-1 font-medium">Monthly EMI</div>
            <div className="text-xl font-bold text-base-content">{formatCurrency(emi)}</div>
          </div>
          <div className="bg-accent/10 p-4 rounded-lg text-center">
            <div className="text-accent text-sm mb-1 font-medium">Total Interest</div>
            <div className="text-xl font-bold text-base-content">{formatCurrency(totalInterest)}</div>
          </div>
          <div className="bg-secondary/10 p-4 rounded-lg text-center">
            <div className="text-secondary text-sm mb-1 font-medium">Total Payment</div>
            <div className="text-xl font-bold text-base-content">{formatCurrency(totalPayment)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
