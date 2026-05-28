import { Project } from "./types";

export const initialProjects: Project[] = [
  {
    id: "finvibe-analytics",
    name: "FinVibe Analytics",
    description: "A high-fidelity wealth and assets management dashboard, highlighting dynamic market charts, predictive budget goals, and transaction ledger.",
    createdAt: "2026-05-28T16:00:00.000Z",
    updatedAt: "2026-05-28T16:15:00.000Z",
    chatHistory: [],
    techStack: {
      frontend: "React 19, Tailwind v4, Framer Motion",
      backend: "Node.js Express",
      database: "PostgreSQL, Prisma ORM",
      auth: "Supabase Auth"
    },
    files: {
      "App.tsx": `// FinVibe Wealth & Assets Dashboard - Main View
import React, { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent, 
  Plus, 
  Layers, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  AlertCircle,
  Filter, 
  Sliders, 
  Search,
  CheckCircle,
  ChevronRight,
  Shield,
  Zap,
  Sparkles
} from "lucide-react";
import MetricCard from "./src/components/MetricCard";
import TransactionList from "./src/components/TransactionList";
import BudgetCoach from "./src/components/BudgetCoach";

export default function App() {
  const [activeTab, setActiveTab] = useState<"overview" | "assets" | "transactions" | "settings">("overview");
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [balance, setBalance] = useState(142384.50);
  const [depositAmount, setDepositAmount] = useState("");
  const [notifications, setNotifications] = useState<string[]>([]);

  const triggerNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(0, -1));
    }, 4000);
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(depositAmount);
    if (!isNaN(val) && val > 0) {
      setBalance(prev => prev + val);
      triggerNotification(\`Successfully deposited \$\${val.toLocaleString()} into primary vault\`);
      setDepositAmount("");
      setShowDepositModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 font-sans selection:bg-purple-500/30 selection:text-white">
      {/* Dynamic Notifications */}
      <div className="fixed top-4 right-4 z-[99] flex flex-col gap-2 max-w-sm">
        {notifications.map((note, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-3 bg-[#131722]/90 backdrop-blur-md border border-[#2d3142] text-slate-200 px-4 py-3 rounded-xl shadow-2xl animate-fade-in border-l-4 border-l-emerald-500"
          >
            <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-medium">{note}</span>
          </div>
        ))}
      </div>

      {/* Floating Header */}
      <header className="sticky top-0 z-40 bg-[#090a0f]/80 backdrop-blur-md border-b border-[#1b1e2c] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-indigo-500 p-0.5 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <div className="h-full w-full bg-[#0a0a0f] rounded-[10px] flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-violet-400" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">FinVibe Luxury</h1>
            <p className="text-[10px] text-slate-400 font-mono">WORKSPACE_ID // ACC_9942</p>
          </div>
        </div>

        {/* Global Stats bar */}
        <div className="hidden md:flex items-center gap-6 text-xs bg-[#12131a] border border-[#1e2030] px-4 py-2 rounded-xl">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-400 text-[11px]">Core Node:</span>
            <span className="font-mono text-emerald-400 font-semibold text-[11px]">ACTIVE</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-800"></div>
          <div>
            <span className="text-slate-400 text-[11px]">Vibe Target:</span>
            <span className="text-purple-400 ml-1 text-[11px] font-mono">$150,000.00</span>
          </div>
        </div>

        {/* Action button */}
        <button 
          onClick={() => setShowDepositModal(true)}
          className="bg-violet-600 hover:bg-violet-700 transition px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-violet-600/30"
        >
          <Plus className="h-3.5 w-3.5" />
          Deposit Assets
        </button>
      </header>

      {/* Hero Accent */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[300px] w-[500px] bg-gradient-to-tr from-violet-600/10 to-transparent blur-[120px]"></div>
        <div className="absolute top-12 right-1/4 h-[200px] w-[400px] bg-gradient-to-tl from-fuchsia-600/10 to-transparent blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Interactive Nav Menu (Bento style) */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-[#10121d]/70 backdrop-blur-md border border-[#1d2138] rounded-2xl p-4">
            <h3 className="text-slate-400 text-[10px] font-mono tracking-widest uppercase mb-3 px-2">Portfolio Management</h3>
            <div className="flex flex-col gap-1">
              {[
                { id: "overview", label: "Wealth Matrix", icon: Layers },
                { id: "assets", label: "Token Allocations", icon: Zap },
                { id: "transactions", label: "Ledger History", icon: Clock },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={\`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition \${
                      active 
                        ? "bg-violet-500/15 text-violet-300 border border-violet-500/35"
                        : "text-slate-400 hover:text-white hover:bg-[#151928] border border-transparent"
                    }\`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={\`h-4 w-4 \${active ? "text-violet-400" : "text-slate-400"}\`} />
                      <span>{tab.label}</span>
                    </div>
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-violet-400"></span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Security Status Box */}
          <div className="bg-[#121422]/90 border border-[#1b203a] p-4 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4.5 w-4.5 text-indigo-400" />
              <h4 className="text-xs font-semibold text-slate-200">Vault Security</h4>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Protected by multi-signature and standard hardware-level isolated keys.
            </p>
            <div className="bg-[#0b0c13] border border-[#1b1c26] rounded-xl p-2.5 flex items-center justify-between">
              <span className="text-[9px] font-mono text-slate-400">SIGNER SEED:</span>
              <span className="text-[10px] font-mono text-indigo-400 font-semibold">99-AES-OK</span>
            </div>
          </div>
        </div>

        {/* Center Canvas Main Content Column */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          {activeTab === "overview" && (
            <>
              {/* Metric Grid Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard 
                  title="Total Assets Valuation" 
                  value={\`\$\${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`}
                  change="+14.2%" 
                  isUp={true} 
                  subText="+\$21,495.20 generated this week"
                  icon={DollarSign}
                />
                <MetricCard 
                  title="Compound Yield Core" 
                  value="12.45% APY" 
                  change="+0.85%" 
                  isUp={true} 
                  subText="Adjusted 2 hours ago"
                  icon={Percent}
                />
                <MetricCard 
                  title="Open Leveraged Positions" 
                  value="5 Assets Active" 
                  change="-2.1%" 
                  isUp={false} 
                  subText="Safety collateral: $45K"
                  icon={TrendingUp}
                />
              </div>

              {/* Graphical Trend Segment and Budget Advisor */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Simulated Graph Canvas */}
                <div className="md:col-span-7 bg-[#10121d]/70 backdrop-blur-md border border-[#1e223c] p-5 rounded-2xl flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-semibold text-slate-200">Asset Yield Vector</h3>
                      <p className="text-[10px] text-slate-400">Cumulative performance index over 30 days</p>
                    </div>
                    <span className="text-xs text-violet-400 font-mono flex items-center gap-1 bg-violet-950/40 border border-violet-800/30 px-2 py-0.5 rounded-lg">
                      <TrendingUp className="h-3 w-3" /> Live Run
                    </span>
                  </div>

                  {/* High Quality Styled Graph Visual */}
                  <div className="h-[200px] w-full bg-[#0a0b12] border border-[#151722] rounded-xl relative overflow-hidden p-4 flex flex-col justify-between">
                    <div className="flex justify-between w-full text-[9px] font-mono text-slate-500">
                      <span>$150K</span>
                      <span>$100K</span>
                      <span>$50K</span>
                    </div>

                    {/* Vector Path Placeholder Drawing */}
                    <div className="absolute inset-x-0 bottom-12 h-24 flex items-end">
                      <svg className="w-full h-full text-violet-500/10 fill-current" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,100 Q15,60 30,70 T60,30 T90,20 T100,10 L100,100 L0,100 Z" />
                      </svg>
                      <svg className="absolute inset-0 w-full h-full text-violet-400 stroke-current stroke-2" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,85 Q15,45 30,55 T60,25 T90,15 T100,5" />
                      </svg>
                      
                      {/* Pulse Node */}
                      <span className="absolute right-[5%] bottom-[85%] h-3 w-3 rounded-full bg-violet-400 border-2 border-slate-900 shadow-md animate-ping"></span>
                      <span className="absolute right-[5%] bottom-[85%] h-3 w-3 rounded-full bg-violet-400 border-2 border-slate-900 shadow-md"></span>
                    </div>

                    <div className="flex justify-between text-[9px] font-mono text-slate-500">
                      <span>May 01</span>
                      <span>May 10</span>
                      <span>May 20</span>
                      <span>Today</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 flex flex-col">
                  <BudgetCoach balance={balance} />
                </div>
              </div>

              {/* Transactions Table Section */}
              <div className="bg-[#10121d]/70 backdrop-blur-md border border-[#1e223c] p-5 rounded-2xl flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-200">Vault Access Journal</h3>
                    <p className="text-[10px] text-slate-400">Real-time ledger audit logs</p>
                  </div>
                  <button onClick={() => setActiveTab("transactions")} className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-medium transition">
                    View full ledger <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
                <TransactionList limit={3} />
              </div>
            </>
          )}

          {activeTab === "assets" && (
            <div className="bg-[#10121d]/70 backdrop-blur-md border border-[#1e223c] p-6 rounded-2xl flex flex-col gap-6 animate-fade-in">
              <div>
                <h3 className="text-sm font-semibold text-slate-200">Asset Valuation & Token Weights</h3>
                <p className="text-xs text-slate-400">Current distributed allocations index</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "USD Liquid Yield", weight: "55%", value: \`\$\${(balance * 0.55).toLocaleString(undefined, { maximumFractionDigits: 0 })}\`, color: "bg-violet-500" },
                  { name: "DeFi Automated Index", weight: "25%", value: \`\$\${(balance * 0.25).toLocaleString(undefined, { maximumFractionDigits: 0 })}\`, color: "bg-indigo-500" },
                  { name: "Tokenized Luxury Arbitrage", weight: "15%", value: \`\$\${(balance * 0.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}\`, color: "bg-fuchsia-400" },
                  { name: "Liquid Collateral Reserve", weight: "5%", value: \`\$\${(balance * 0.05).toLocaleString(undefined, { maximumFractionDigits: 0 })}\`, color: "bg-teal-400" },
                ].map((token, i) => (
                  <div key={i} className="bg-[#0b0c13] border border-[#1a1c2a] p-4 rounded-xl flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300 font-semibold">{token.name}</span>
                      <span className="text-xs font-mono text-purple-400 font-bold">{token.weight}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className={\`h-full \${token.color}\`} style={{ width: token.weight }} />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>VALUATIONS PROJECTIONS</span>
                      <span className="text-slate-200">{token.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="bg-[#10121d]/70 backdrop-blur-md border border-[#1e223c] p-5 rounded-2xl flex flex-col gap-4 animate-fade-in">
              <div>
                <h3 className="text-xs font-semibold text-slate-200">Complete Ledger Journal</h3>
                <p className="text-[10px] text-slate-400">History log of transactions and deposits</p>
              </div>
              <TransactionList limit={10} />
            </div>
          )}
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#121422] border border-[#2c314a] p-6 rounded-2xl w-full max-w-sm flex flex-col gap-4 animate-scale-in">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-200">Deposit Capital Assets</h3>
              <button onClick={() => setShowDepositModal(false)} className="text-xs text-slate-500 hover:text-white">✕</button>
            </div>
            
            <form onSubmit={handleDeposit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase">AMOUNT (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-xs">$</span>
                  <input 
                    type="number" 
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="e.g. 5000"
                    required
                    className="w-full bg-[#0b0c13] border border-[#24293f] rounded-xl pl-7 pr-3 py-2 text-xs focus:outline-none focus:border-violet-500 text-slate-200"
                  />
                </div>
              </div>

              <div className="bg-slate-900 border border-[#1b1c28] p-3 rounded-xl flex items-center gap-2">
                <AlertCircle className="h-4.5 w-4.5 text-amber-400 shrink-0" />
                <p className="text-[9px] text-slate-400 leading-tight">
                  This simulated transaction mimics a smart contract deposit onto the Prisma model DB structure.
                </p>
              </div>

              <button 
                type="submit" 
                className="w-full bg-violet-600 hover:bg-violet-700 transition py-2 rounded-xl text-xs font-semibold"
              >
                Confirm Deposit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
`,
      "src/components/MetricCard.tsx": `// Financial Metric Indicator Card Component
import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isUp: boolean;
  subText: string;
  icon: LucideIcon;
}

export default function MetricCard({ title, value, change, isUp, subText, icon: Icon }: MetricCardProps) {
  return (
    <div className="bg-[#10121d]/70 backdrop-blur-md border border-[#1e223c] p-4.5 rounded-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-violet-500/30 group">
      <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-violet-600/5 to-transparent blur-md"></div>
      
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold text-slate-400 tracking-tight">{title}</span>
        <div className="h-8 w-8 rounded-lg bg-[#141525] border border-[#232742] flex items-center justify-center p-1.5 text-violet-400 group-hover:text-violet-300 transition-colors">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h4 className="text-lg font-bold text-slate-100 font-sans tracking-tight">{value}</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {isUp ? (
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-400 bg-emerald-950/45 border border-emerald-900/30 px-1.5 py-0.5 rounded-md">
                <TrendingUp className="h-2.5 w-2.5" /> {change}
              </span>
            ) : (
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-rose-400 bg-rose-950/45 border border-rose-900/30 px-1.5 py-0.5 rounded-md">
                <TrendingDown className="h-2.5 w-2.5" /> {change}
              </span>
            )}
          </div>
          <span className="text-[9px] text-slate-500 font-mono tracking-tight">{subText}</span>
        </div>
      </div>
    </div>
  );
}
`,
      "src/components/TransactionList.tsx": `// Financial Ledger Audit Listing Page/Component
import React from "react";
import { ArrowUpRight, ArrowDownLeft, Wallet, ExternalLink, RefreshCw } from "lucide-react";

interface Transaction {
  id: string;
  type: "deposit" | "withdraw" | "yield" | "staking";
  amount: number;
  status: "completed" | "pending";
  date: string;
  desc: string;
}

const defaultTransactions: Transaction[] = [
  { id: "TX-99120", type: "deposit", amount: 15000.00, status: "completed", date: "Today, 14:24", desc: "USDC Primary Capital Vault" },
  { id: "TX-99118", type: "yield", amount: 480.25, status: "completed", date: "Today, 08:15", desc: "Automated DeFi Aggregator APY" },
  { id: "TX-98943", type: "withdraw", amount: 2500.00, status: "completed", date: "Yesterday", desc: "Offramp Liquid Cash Ledger" },
  { id: "TX-98442", type: "staking", amount: 50000.00, status: "completed", date: "May 24, 2026", desc: "Layer-1 Decentralized Node Deposit" },
  { id: "TX-98310", type: "yield", amount: 395.10, status: "completed", date: "May 22, 2026", desc: "Automated DeFi Aggregator APY" },
];

export default function TransactionList({ limit = 5 }: { limit?: number }) {
  const list = defaultTransactions.slice(0, limit);

  return (
    <div className="flex flex-col gap-1.5">
      {list.map((tx) => (
        <div key={tx.id} className="bg-[#0b0c13]/90 border border-[#161824] p-3 rounded-xl flex items-center justify-between transition-all hover:bg-[#11131e]/50">
          <div className="flex items-center gap-3">
            <div className={\`h-8.5 w-8.5 rounded-lg flex items-center justify-center shrink-0 \${
              tx.type === "deposit" || tx.type === "yield" 
                ? "bg-emerald-950/60 border border-emerald-900/40 text-emerald-400"
                : "bg-indigo-950/60 border border-indigo-900/40 text-indigo-400"
            }\`}>
              {tx.type === "deposit" || tx.type === "yield" ? (
                <ArrowDownLeft className="h-4 w-4" />
              ) : (
                <ArrowUpRight className="h-4 w-4" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-100">{tx.desc}</span>
                <span className="text-[8px] font-mono text-slate-500 border border-slate-800 px-1 py-0.2 rounded">{tx.id}</span>
              </div>
              <span className="text-[10px] text-slate-500">{tx.date}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className={\`text-xs font-bold font-mono \${
              tx.type === "deposit" || tx.type === "yield" ? "text-emerald-400" : "text-slate-200"
            }\`}>
              {tx.type === "deposit" || tx.type === "yield" ? "+" : "-"}\${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[8px] uppercase tracking-widest font-bold bg-[#0f111a] border border-[#212437] px-1.5 py-0.5 rounded text-emerald-400 flex items-center gap-0.5">
              <span className="h-1 w-1 bg-emerald-400 rounded-full"></span> Completed
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
`,
      "src/components/BudgetCoach.tsx": `// Budget goals progress dashboard card
import React from "react";
import { Pocket, Sliders, ArrowUpRight, Info } from "lucide-react";

export default function BudgetCoach({ balance }: { balance: number }) {
  const currentBudget = 45000;
  const targetBudget = 50000;
  const ratio = (balance / targetBudget) * 100;
  const isTargetAchieved = balance >= targetBudget;

  return (
    <div className="bg-[#10121d]/70 backdrop-blur-md border border-[#1e223c] p-5 rounded-2xl flex flex-col gap-4 text-slate-200 h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pocket className="h-4.5 w-4.5 text-violet-400" />
          <h3 className="text-xs font-bold text-slate-200">Tactical Capital Goal</h3>
        </div>
        <Sliders className="h-3.5 w-3.5 text-slate-400 cursor-pointer" />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] text-slate-400 font-mono tracking-wider">ANNUAL COMPOUND GOAL</span>
        <div className="flex items-baseline justify-between">
          <h4 className="text-base font-bold text-slate-100">$50,000.00</h4>
          <span className="text-xs text-emerald-400 font-serif font-semibold">
            {ratio >= 100 ? "Achieved! 100%+" : \`\${ratio.toFixed(1)}% Completed\`}
          </span>
        </div>
      </div>

      <div className="w-full bg-[#0a0b12] rounded-full h-2 overflow-hidden border border-slate-900 relative">
        <div 
          className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-400 transition-all duration-700"
          style={{ width: \`\${Math.min(ratio, 100)}%\` }}
        />
      </div>

      <div className="flex justify-between items-center text-[9px] font-mono text-slate-500">
        <span>SEED: $0.00</span>
        <span>GOAL: $50K</span>
      </div>

      <div className="bg-[#0c0d15] border border-slate-900 p-3 rounded-xl flex items-start gap-2.5">
        <Info className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-semibold text-slate-300">Intelligent Advisor Advice</span>
          <p className="text-[9px] text-slate-400 leading-normal">
            Your current portfolio velocity is optimized. Yield streams exceed predicted margins by 2.45% APY. Keep assets staked.
          </p>
        </div>
      </div>
    </div>
  );
}
`,
      "prisma/schema.prisma": `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id           String        @id @default(uuid())
  email        String        @unique
  name         String?
  createdAt    DateTime      @default(now())
  portfolios   Portfolio[]
  transactions Transaction[]
}

model Portfolio {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  name        String
  assetsValue Float
  yieldApy    Float
  createdAt   DateTime @default(now())
}

model Transaction {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  type      String   // "deposit", "withdraw", "yield"
  amount    Float
  desc      String
  date      DateTime @default(now())
}
`,
      "src/api/metrics.ts": `import express from "express";

const router = express.Router();

let cachedMetrics = {
  totalAssets: 142384.50,
  yieldApy: 12.45,
  liveRunner: true,
  timestamp: Date.now()
};

// GET live indices
router.get("/api/metrics", (req, res) => {
  cachedMetrics.totalAssets += (Math.random() - 0.45) * 10;
  res.json({
    status: "success",
    data: {
      ...cachedMetrics,
      timestamp: Date.now()
    }
  });
});

export default router;
`
    }
  },
  {
    id: "aura-ai",
    name: "Aura Creative AI Landing",
    description: "An ultra-premium, Apple-inspired SaaS landing page with dramatic styling, pricing card matrices, and responsive element blocks.",
    createdAt: "2026-05-28T16:10:00.000Z",
    updatedAt: "2026-05-28T16:17:00.000Z",
    chatHistory: [],
    techStack: {
      frontend: "React 19, Tailwind v4, Motion",
      backend: "Node.js Express API",
      database: "PostgreSQL Prisma",
      auth: "Clerk Authentication"
    },
    files: {
      "App.tsx": `// Aura Creative AI - Premium SaaS Landing Page
import React, { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Terminal, 
  Code, 
  Compass, 
  Check, 
  Globe, 
  Layers, 
  ChevronDown, 
  Heart,
  Github,
  CheckCircle2,
  Lock,
  Zap,
  Cpu,
  MousePointerClick
} from "lucide-react";
import PricingGrid from "./src/components/PricingGrid";
import HeroVisual from "./src/components/HeroVisual";

export default function App() {
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [activePlan, setActivePlan] = useState<"monthly" | "annually">("annually");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-[#040406] text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-purple-600/30 selection:text-purple-200">
      {/* Dynamic Halo Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute top-[-200px] left-1/3 w-[500px] h-[400px] bg-fuchsia-600/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Floating Header */}
      <nav className="sticky top-0 z-50 bg-[#040406]/70 backdrop-blur-md border-b border-[#14141a]/60 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <Cpu className="h-4.5 w-4.5 text-black" />
            </div>
            <span className="font-bold text-sm tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-slate-200 to-indigo-100">
              AURA<span className="text-indigo-400 font-mono text-xs">.AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[11px] text-slate-400 font-medium">
            <a href="#features" className="hover:text-white transition">Core Platform</a>
            <a href="#pricing" className="hover:text-white transition">Valuations</a>
            <a href="#specs" className="hover:text-white transition">Developers</a>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500 flex items-center gap-1 font-mono">
              STATUS // <span className="text-emerald-400 animate-pulse font-bold">ONLINE</span>
            </span>
          </div>

          <a 
            href="#pricing"
            className="text-[11px] bg-white text-black px-4 py-1.5 rounded-full font-bold hover:bg-slate-200 transition shadow-md"
          >
            Launch Free
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center relative z-10 flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 bg-[#12121a] border border-[#21212f] rounded-full px-4 py-1.5 text-[10px] text-indigo-300 font-mono font-medium tracking-wide animate-fade-in shadow-inner">
          <Sparkles className="h-3 w-3 text-indigo-400 animate-spin" />
          AURA COGNITIVE GENERATION VER.09 NOW AVAILABLE
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-100 font-sans leading-none max-w-3xl">
          Build cohesive software structures with <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400">Pure Intent.</span>
        </h1>

        <p className="text-xs md:text-sm text-slate-400 max-w-lg leading-relaxed font-normal">
          Aura intercepts natural prompt guidelines to formulate production-grade pages, modular components, relational databases, and microservices in nanoseconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-2">
          <a 
            href="#pricing"
            className="bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] transition px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30"
          >
            Design Workspace App
            <ArrowRight className="h-4 w-4" />
          </a>
          <a 
            href="#features"
            className="bg-[#12121a]/80 hover:bg-[#1a1a26]/80 border border-[#232333] transition px-5 py-2.5 rounded-full text-xs font-semibold text-slate-400 hover:text-white"
          >
            Explore Integrations
          </a>
        </div>

        {/* Floating Sandbox Visual Frame */}
        <div className="w-full mt-10">
          <HeroVisual />
        </div>
      </section>

      {/* Feature Bento Section */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12 flex flex-col items-center gap-2">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100">
            Engineered for elite product teams.
          </h2>
          <p className="text-[11px] text-slate-400 max-w-sm">
            Everything you need, pre-packaged with robust quality control benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              icon: Terminal, 
              title: "Sandboxed Executable VM", 
              desc: "Instant hot-reload sandboxes evaluating dependencies and server runtimes in isolation." 
            },
            { 
              icon: Layers, 
              title: "Glassmorphic Component Kit", 
              desc: "Polished Tailwind utility styles conforming to modern architectural visual design principles." 
            },
            { 
              icon: Lock, 
              title: "Secure Clerk Integration", 
              desc: "Protected database endpoints guarded with automatic login procedures." 
            }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div 
                key={i} 
                className="bg-[#0b0b10] border border-[#161622] p-5 rounded-2xl flex flex-col gap-3 transition hover:border-indigo-500/10 group"
              >
                <div className="h-10 w-10 rounded-xl bg-indigo-950/40 border border-[#1a1f38] flex items-center justify-center p-2 text-indigo-400 group-hover:bg-indigo-900/30 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-semibold text-slate-200">{item.title}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Pricing Schedule */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-12 relative z-10 border-t border-[#13131c]">
        <div className="text-center mb-8 flex flex-col items-center gap-2">
          <span className="text-[10px] bg-indigo-950/50 border border-indigo-800/40 text-indigo-400 px-3 py-1 rounded-full font-mono uppercase tracking-widest">Pricing Strategy</span>
          <h2 className="text-xl md:text-2xl font-bold">Simple, honest valuations.</h2>
          
          <div className="flex items-center gap-2 bg-[#0d0d14] border border-[#1b1b2a] p-1 rounded-full mt-2">
            <button 
              onClick={() => setActivePlan("monthly")}
              className={\`px-3 py-1 rounded-full text-[10px] font-semibold transition \${
                activePlan === "monthly" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }\`}
            >
              Monthly billing
            </button>
            <button 
              onClick={() => setActivePlan("annually")}
              className={\`px-3 py-1 rounded-full text-[10px] font-semibold transition flex items-center gap-1 \${
                activePlan === "annually" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }\`}
            >
              Annually <span className="text-[8px] bg-emerald-950 border border-emerald-900 text-emerald-400 px-1 py-0.2 rounded font-mono">-20%</span>
            </button>
          </div>
        </div>

        <PricingGrid billingPeriod={activePlan} />
      </section>

      {/* Subscription Segment (Footer Lead) */}
      <section className="max-w-3xl mx-auto px-6 py-12 text-center relative z-10 border-t border-[#13141f]">
        <div className="bg-[#0b0c13] border border-[#1c1d2d] rounded-2xl p-6 md:p-10 flex flex-col items-center gap-4">
          <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
          <h2 className="text-lg md:text-xl font-bold">Unleash NextCome AI Today.</h2>
          <p className="text-xs text-slate-400 max-w-sm">
            Be the first to secure credentials for premium templates and live multi-agent workflow systems.
          </p>

          {emailSubscribed ? (
            <div className="bg-emerald-950/40 border border-emerald-900/30 text-emerald-400 px-6 py-3 rounded-full text-xs font-semibold flex items-center gap-2 mt-4 animate-scale-in">
              <CheckCircle2 className="h-4.5 w-4.5" />
              Awesome! We notified you using credentials matching: {email}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full max-w-md items-center gap-2 mt-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Secure user email account..." 
                required
                className="w-full bg-[#050508] border border-[#212338] rounded-full px-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button 
                type="submit" 
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] transition rounded-full px-5 py-2.5 text-xs font-bold shrink-0"
              >
                Join Private Waitlist
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-[#0d0d13] px-6 py-8 text-center text-[10px] text-slate-500 font-mono">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>COPERNICUS LABS // ALL INTENTS PRESERVED 2026</span>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" className="hover:text-white flex items-center gap-1">
              <Github className="h-3 w-3" /> Source Code
            </a>
            <span>•</span>
            <span className="text-indigo-400">NextCome Premium Platform</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
`,
      "src/components/PricingGrid.tsx": `// Flexible Tier Subscription pricing cards
import React from "react";
import { Check, HelpCircle, ArrowRight, Star } from "lucide-react";

interface TabPeriod {
  billingPeriod: "monthly" | "annually";
}

export default function PricingGrid({ billingPeriod }: TabPeriod) {
  const isAnnual = billingPeriod === "annually";

  const tiers = [
    {
      name: "Standard Base",
      price: isAnnual ? "$0.00" : "$0.00",
      subText: "Perfect for lightweight client-side experiments.",
      features: [
        "1 standard vibe workspace code folder",
        "Standard layout builder options",
        "Default sandboxed emulator access",
        "Prisma schematic explorer preview",
      ],
      cta: "Launch Sandbox",
      popular: false,
    },
    {
      name: "Cognitive Pro",
      price: isAnnual ? "$19.00" : "$24.00",
      subText: "For elite software creators and product teams.",
      features: [
        "Unlimited custom workspace structures",
        "Full stack express sandbox simulator",
        "Direct server database syncing options",
        "Priority multi-agent streaming pipelines",
        "Comprehensive ZIP exports format",
      ],
      cta: "Activate Pro Pipeline",
      popular: true,
    },
    {
      name: "Sovereign Enterprise",
      price: isAnnual ? "$89.00" : "$99.00",
      subText: "Tailored limits for scalable production operations.",
      features: [
        "Everything in Cognitive Pro",
        "Deploy to live container slots instantly",
        "Custom domain mapping configurations",
        "Dedicated database instance allocations",
        "Active VIP concierge developer support",
      ],
      cta: "Acknowledge Enterprise Request",
      popular: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {tiers.map((tier, idx) => (
        <div 
          key={idx} 
          className={\`bg-[#09090e] border rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:scale-[1.01] \${
            tier.popular 
              ? "border-indigo-500 shadow-xl shadow-indigo-600/5 ring-1 ring-indigo-500/30" 
              : "border-[#191928]"
          }\`}
        >
          {tier.popular && (
            <span className="absolute top-3 right-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-slate-100 text-[8px] font-mono tracking-widest font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Star className="h-2 w-2 text-white fill-current" /> MOST POPULAR
            </span>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-xs font-bold text-slate-300">{tier.name}</h4>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{tier.subText}</p>
            </div>

            <div className="flex items-baseline gap-1 mt-1">
              <h3 className="text-2xl font-bold font-mono tracking-tight text-white">{tier.price}</h3>
              <span className="text-[10px] text-slate-400 font-mono">/ {isAnnual ? "year" : "month"}</span>
            </div>

            <div className="h-[1px] bg-slate-800/40 w-full" />

            <ul className="flex flex-col gap-2">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-[10px] text-slate-400">
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <button 
            className={\`w-full py-2 rounded-xl text-[10px] font-bold mt-6 flex items-center justify-center gap-1.5 transition \${
              tier.popular 
                ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                : "bg-[#141421] text-slate-300 hover:bg-[#1a1a2e]"
            }\`}
          >
            {tier.cta}
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
`,
      "src/components/HeroVisual.tsx": `// Futuristic visual mock compiler output dashboard
import React, { useState } from "react";
import { Terminal, Shield, RefreshCw, Layers, Check, Copy } from "lucide-react";

export default function HeroVisual() {
  const [copied, setCopied] = useState(false);

  const mockCode = \`// Intent: Build fullstack SaaS analytics
const analyticsNode = new CognitiveNode({
  model: "gemini-3.5-flash",
  schema: db.PrismaSchema,
  layout: "glassmorphism",
});

await analyticsNode.formulatePipeline();\`;

  const copyCode = () => {
    navigator.clipboard.writeText(mockCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#07070a]/90 border border-[#181829] rounded-2xl relative overflow-hidden shadow-2xl">
      <div className="bg-[#0b0b12] border-b border-[#141424] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-[10px] text-slate-400 font-mono ml-3">VIBE_COGNITIVE_DENSITY.TS</span>
        </div>
        <button 
          onClick={copyCode}
          className="text-slate-500 hover:text-white p-1 rounded transition"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Terminal logs panel */}
        <div className="md:col-span-7 bg-[#050508] p-5 text-left font-mono">
          <pre className="text-[11px] text-indigo-400 leading-relaxed overflow-x-auto whitespace-pre">
            {mockCode}
          </pre>
          <div className="h-[1px] bg-indigo-950/40 my-3" />
          <div className="flex flex-col gap-1 text-[9px] text-slate-500">
            <p className="text-emerald-400 font-semibold">&gt; npx nextcome optimize --stack=fullstack</p>
            <p>&gt; [NextCome Node] Initiating user intent parsing...</p>
            <p>&gt; [NextCome Node] Found 4 metrics variables, 1 ledger model, 1 express endpoint.</p>
            <p className="text-emerald-400 font-medium">&gt; Compiled successfully! Target file tree loaded.</p>
          </div>
        </div>

        {/* Live rendering frame */}
        <div className="md:col-span-5 bg-[#08080c] border-l border-[#131322] p-4 flex flex-col justify-between min-h-[180px]">
          <div className="flex items-center justify-between border-b border-slate-800/40 pb-2">
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Aesthetic Matrix</span>
            <span className="text-[9px] text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded font-mono font-bold">100% FLUID</span>
          </div>

          <div className="bg-[#0f0f18]/60 border border-[#1b1b2f] rounded-xl p-3 my-2 flex items-center justify-between shadow-lg">
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[9px] text-slate-400 uppercase font-mono">Yield Compound Balance</span>
              <span className="text-xs font-bold text-slate-100">$142,384.50</span>
            </div>
            <div className="h-7 w-7 rounded-lg bg-emerald-950/60 border border-emerald-900/30 flex items-center justify-center text-emerald-400 text-xs font-bold">
              +14%
            </div>
          </div>

          <div className="flex items-center gap-2 text-[9px] text-slate-500 font-mono mt-2">
            <Shield className="h-3 w-3 text-indigo-400" /> Secure Sandbox Enclave active.
          </div>
        </div>
      </div>
    </div>
  );
}
`
    }
  }
];
