'use client';

import React, { useState, useEffect } from "react";
import { useUiStore, RoleType, OnboardingTask, AttendanceRecord, LeaveRequest, ExpenseClaim, Goal, TrainingModule, Candidate, JobPosting, Recognition, Announcement } from "../stores/uiStore";
import {
  Clock, Calendar, Award, BookOpen, MessageSquare, Shield, Users, BarChart3,
  Briefcase, FileText, CheckCircle2, ChevronRight, Play, Upload, User,
  DollarSign, Plus, X, Heart, MessageCircle, AlertCircle, Sparkles, LogOut,
  Sun, Moon, MapPin, Landmark, ArrowRight, Check, Send, AlertTriangle, ShieldCheck,
  TrendingUp, AwardIcon
} from "lucide-react";

export default function Page() {
  const store = useUiStore();
  const [activeTab, setActiveTab] = useState<string>("home");
  const [role, setRole] = useState<RoleType>("employee");
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isOnboarding, setIsOnboarding] = useState<boolean>(true);

  // Sync with Zustand store
  useEffect(() => {
    store.setActiveTab(activeTab);
  }, [activeTab]);

  useEffect(() => {
    store.setRole(role);
    // If selecting Alex (Onboarding), set isOnboarding to true, else false
    if (role === "employee" && isOnboarding) {
      store.setIsOnboarding(true);
    } else {
      store.setIsOnboarding(false);
    }
  }, [role, isOnboarding]);

  // Form states
  const [leaveType, setLeaveType] = useState<string>("Casual Leave");
  const [leaveStart, setLeaveStart] = useState<string>("");
  const [leaveEnd, setLeaveEnd] = useState<string>("");
  const [leaveDays, setLeaveDays] = useState<number>(1);
  const [leaveReason, setLeaveReason] = useState<string>("");

  const [expCategory, setExpCategory] = useState<string>("travel");
  const [expAmount, setExpAmount] = useState<number>(0);
  const [expCurrency, setExpCurrency] = useState<string>("INR");
  const [expDesc, setExpDesc] = useState<string>("");
  const [expDate, setExpDate] = useState<string>("");
  const [expMileage, setExpMileage] = useState<boolean>(false);
  const [expDistance, setExpDistance] = useState<number>(0);

  const [kudosRecipient, setKudosRecipient] = useState<string>("John Doe");
  const [kudosCat, setKudosCat] = useState<"excellence" | "team-player" | "innovation" | "leadership" | "customer-focus">("excellence");
  const [kudosMsg, setKudosMsg] = useState<string>("");

  // AI Copilot state
  const [copilotOpen, setCopilotOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "copilot"; text: string }[]>([
    { sender: "copilot", text: "Hello! I am your HR Copilot. Ask me anything about policies, leaves, onboarding tasks, or reimbursement status!" }
  ]);
  const [chatInput, setChatInput] = useState<string>("");

  // Simulated Selfie Clock-In States
  const [clockInModal, setClockInModal] = useState<boolean>(false);
  const [clockInStep, setClockInStep] = useState<number>(1); // 1: Select Method, 2: Verification, 3: Completed
  const [selfieCaptured, setSelfieCaptured] = useState<boolean>(false);
  const [selfieProgress, setSelfieProgress] = useState<number>(0);

  // Active training content viewer
  const [activeCourse, setActiveCourse] = useState<TrainingModule | null>(null);
  const [courseContentStep, setCourseContentStep] = useState<string | null>(null);

  // Active candidate detail modal
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState<boolean>(false);
  const [interviewDate, setInterviewDate] = useState<string>("");
  const [interviewTime, setInterviewTime] = useState<string>("");

  // Active approval comment
  const [approvalComment, setApprovalComment] = useState<string>("");

  // Country setting for payroll
  const [payrollCountry, setPayrollCountry] = useState<"US" | "IN">("IN");

  // Simulated Document Upload State
  const [uploadingDocCategory, setUploadingDocCategory] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<{ [category: string]: { name: string; size: string; expiry: string } }>({
    "identity": { name: "passport_scan.pdf", size: "1.2 MB", expiry: "2032-12-31" }
  });

  // Calculate onboarding progress
  const completedOnboardingTasks = store.onboardingTasks.filter(t => t.status === "completed").length;
  const onboardingProgress = Math.round((completedOnboardingTasks / store.onboardingTasks.length) * 100);

  // Navigation tab generator based on active role
  const getTabsByRole = () => {
    switch (role) {
      case "employee":
        return isOnboarding 
          ? [
              { id: "onboarding", label: "Onboarding", icon: Award },
              { id: "attendance", label: "Attendance", icon: Clock },
              { id: "training", label: "Training", icon: BookOpen },
              { id: "copilot-help", label: "HR Copilot", icon: Sparkles }
            ]
          : [
              { id: "home", label: "Home", icon: User },
              { id: "attendance", label: "Attendance", icon: Clock },
              { id: "leave", label: "Leave", icon: Calendar },
              { id: "payroll", label: "Payroll", icon: Landmark },
              { id: "expenses", label: "Expenses", icon: DollarSign },
              { id: "performance", label: "Performance", icon: Award },
              { id: "contributions", label: "Contributions", icon: TrendingUp },
              { id: "training", label: "Training", icon: BookOpen },
              { id: "documents", label: "Documents", icon: FileText },
              { id: "recognition", label: "Recognition", icon: Heart },
              { id: "announcements", label: "Announcements", icon: MessageSquare }
            ];
      case "manager":
        return [
          { id: "home", label: "Home", icon: User },
          { id: "team", label: "Team", icon: Users },
          { id: "leave", label: "Leave", icon: Calendar },
          { id: "expenses", label: "Expenses", icon: DollarSign },
          { id: "performance", label: "Performance", icon: Award },
          { id: "training", label: "Training", icon: BookOpen }
        ];
      case "hr":
        return [
          { id: "home", label: "Home", icon: User },
          { id: "recruitment", label: "Recruitment", icon: Briefcase },
          { id: "analytics", label: "Analytics", icon: BarChart3 },
          { id: "announcements", label: "Announcements", icon: MessageSquare },
          { id: "training", label: "Training", icon: BookOpen }
        ];
      case "admin":
        return [
          { id: "home", label: "Home", icon: User },
          { id: "analytics", label: "Analytics", icon: BarChart3 },
          { id: "team", label: "Team", icon: Users },
          { id: "announcements", label: "Announcements", icon: MessageSquare },
          { id: "training", label: "Training", icon: BookOpen }
        ];
    }
  };

  const tabs = getTabsByRole();

  // Make sure activeTab is valid for the current role's tab options
  useEffect(() => {
    const tabExists = tabs.some(t => t.id === activeTab);
    if (!tabExists && tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [role, isOnboarding, tabs]);

  // Handle simulated upload
  const simulateUpload = (category: string) => {
    setUploadingDocCategory(category);
    setTimeout(() => {
      setUploadedDocs(prev => ({
        ...prev,
        [category]: {
          name: `${category}_uploaded_doc.pdf`,
          size: "820 KB",
          expiry: "2030-05-15"
        }
      }));
      setUploadingDocCategory(null);
    }, 1500);
  };

  // Handle Selfie capture simulation
  const triggerSelfieCapture = () => {
    setSelfieProgress(10);
    const interval = setInterval(() => {
      setSelfieProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSelfieCaptured(true);
          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  // Predefined copilot inputs
  const handlePredefinedQuestion = (q: string) => {
    setChatMessages(prev => [...prev, { sender: "user", text: q }]);
    
    // Custom answer logic based on keywords
    let answer = "I am processing that request. Please try again in a moment.";
    if (q.includes("comp-off")) {
      answer = "As per policy, Employees earn Comp-off hours by working on public holidays or weekends. Managers must pre-approve weekend work. Once approved, you will see your comp-off balance update in your Leave panel. You currently have 2 available Comp-offs.";
    } else if (q.includes("travel expense")) {
      answer = "Our travel policy permits reimbursement of up to ₹2,500 per day for inter-city travel, provided receipts are submitted. For food expenses, limits are ₹1,000 per day. Receipts are mandatory for all transactions above ₹500.";
    } else if (q.includes("onboarding checklist")) {
      answer = "Welcome to the team! Your pre-joining tasks include signing the employment agreement (Completed), submitting bank details (Pending), and uploading ID proofs (Pending). On Day 1, you will need to complete the compliance security quiz.";
    } else if (q.includes("payslip")) {
      answer = "You can download your detailed payslips from the Payroll tab. By default, it displays calculations localized for India (with PF, HRA, ESI deductions). You can toggle the view to see US calculations as well.";
    }

    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: "copilot", text: answer }]);
    }, 800);
  };

  // Submit chat input
  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatMessages(prev => [...prev, { sender: "user", text: msg }]);
    setChatInput("");

    // Generate simulated reply
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        sender: "copilot",
        text: `Based on your role (${role.toUpperCase()}) and active screen, I am analyzing your request: "${msg}". WorkFlow is currently connected to local mockup databases. Please deploy the PostgreSQL integration to synchronize live records.`
      }]);
    }, 1000);
  };

  return (
    <div className={`min-h-screen font-sans ${darkMode ? "dark bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"}`}>
      
      {/* Top Banner Control Board (Demonstration Role Switcher) */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-orange-950 text-white px-4 py-3 shadow-md border-b border-teal-800/40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="bg-teal-500 text-slate-950 font-bold px-2 py-0.5 rounded text-2xs uppercase tracking-widest">
              Demo Switcher
            </span>
            <span className="font-semibold text-teal-200">
              Select Persona & Experience:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-center">
            {/* Persona Switchers */}
            <button
              onClick={() => { setRole("employee"); setIsOnboarding(true); setActiveTab("onboarding"); }}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                role === "employee" && isOnboarding
                  ? "bg-teal-500 text-slate-950 shadow-lg scale-105"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              Alex (Onboarding)
            </button>
            <button
              onClick={() => { setRole("employee"); setIsOnboarding(false); setActiveTab("home"); }}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                role === "employee" && !isOnboarding
                  ? "bg-teal-500 text-slate-950 shadow-lg scale-105"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              Sarah (Employee)
            </button>
            <button
              onClick={() => { setRole("manager"); setIsOnboarding(false); setActiveTab("home"); }}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                role === "manager"
                  ? "bg-teal-500 text-slate-950 shadow-lg scale-105"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              Michael (Manager)
            </button>
            <button
              onClick={() => { setRole("hr"); setIsOnboarding(false); setActiveTab("home"); }}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                role === "hr"
                  ? "bg-teal-500 text-slate-950 shadow-lg scale-105"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              HR Specialist
            </button>
            <button
              onClick={() => { setRole("admin"); setIsOnboarding(false); setActiveTab("home"); }}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                role === "admin"
                  ? "bg-teal-500 text-slate-950 shadow-lg scale-105"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              Admin
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Mode switch */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 dark:text-teal-300"
              title="Toggle theme"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <div className="h-4 w-px bg-slate-800"></div>
            <span className="text-teal-400 font-bold tracking-wide uppercase">WORKFLOW</span>
          </div>
        </div>
      </div>

      {/* Main Container mimicking Smartphone layout */}
      <div className="max-w-md w-full mx-auto min-h-screen bg-slate-50 dark:bg-slate-900 border-x border-slate-200 dark:border-slate-800/80 shadow-2xl relative flex flex-col pb-24">
        
        {/* App Shell Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center font-bold text-white shadow-sm shadow-teal-500/30">
              WF
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">WorkFlow</h1>
              <p className="text-[10px] text-slate-500 dark:text-teal-400 font-semibold tracking-wide uppercase">
                {role} {isOnboarding && role === "employee" ? "(Onboarding)" : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCopilotOpen(true)}
              className="relative p-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-300 hover:scale-105 transition-all animate-float"
            >
              <Sparkles size={16} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-500 rounded-full animate-ping"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-orange-400 flex items-center justify-center text-sm font-semibold text-white">
              {role === "employee" && isOnboarding ? "AJ" : role === "employee" ? "SC" : role === "manager" ? "MV" : "HR"}
            </div>
          </div>
        </header>

        {/* Dynamic App Content Body */}
        <main className="flex-1 p-4 overflow-y-auto">
          
          {/* ==================================================== */}
          {/* ONBOARDING MODULE (ACTIVE FOR ALEX PERSONA) */}
          {/* ==================================================== */}
          {activeTab === "onboarding" && (
            <div className="space-y-4">
              {/* Onboarding Welcome Card */}
              <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
                  <AwardIcon size={120} />
                </div>
                <h2 className="text-lg font-bold">Welcome, Alex Johnson!</h2>
                <p className="text-xs text-teal-100 mt-1">Role: Associate Frontend Engineer • Noida, India</p>
                <div className="mt-4 bg-slate-950/20 rounded-lg p-2 border border-white/10">
                  <div className="flex justify-between text-2xs font-semibold">
                    <span>90-Day Onboarding Progress</span>
                    <span>{onboardingProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/20 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-orange-400 h-full rounded-full transition-all duration-500" style={{ width: `${onboardingProgress}%` }}></div>
                  </div>
                </div>
              </div>

              {/* CEO Video Message Block */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800/80 shadow-sm">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Welcome Video from leadership</h3>
                <div className="aspect-video bg-slate-900 rounded-lg relative overflow-hidden flex items-center justify-center group border border-slate-800">
                  <video className="w-full h-full object-cover opacity-60" poster="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=300" src="#"></video>
                  <button className="absolute w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                    <Play size={20} className="ml-1" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white">
                    CEO Jane Doe - Welcome Message
                  </div>
                </div>
              </div>

              {/* Tasks Checklist */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Tasks Checklist</h3>
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {store.onboardingTasks.map((t) => (
                    <div key={t.id} className="py-2.5 flex items-start justify-between gap-3 first:pt-0 last:pb-0">
                      <div className="flex gap-2">
                        <button
                          onClick={() => store.toggleOnboardingTask(t.id)}
                          className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-all ${
                            t.status === "completed"
                              ? "bg-teal-500 border-teal-500 text-white"
                              : "border-slate-300 dark:border-slate-600 hover:border-teal-500"
                          }`}
                        >
                          {t.status === "completed" && <Check size={10} strokeWidth={3} />}
                        </button>
                        <div>
                          <p className={`text-xs font-medium ${t.status === "completed" ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-200"}`}>
                            {t.title}
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.description}</p>
                          <div className="flex gap-2 mt-1">
                            <span className="text-[8px] px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                              Phase: {t.phase}
                            </span>
                            <span className={`text-[8px] px-1.5 py-0.2 rounded font-semibold ${
                              t.priority === "high" ? "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400" : "bg-slate-100 text-slate-600"
                            }`}>
                              Due: {t.dueDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relocation Tickets */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Relocation Tickets</h3>
                  <span className="text-[10px] text-teal-500 font-semibold cursor-pointer">New Ticket</span>
                </div>
                <div className="space-y-2">
                  {store.relocationTickets.map((ticket) => (
                    <div key={ticket.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <div>
                        <p className="text-xs font-medium text-slate-800 dark:text-slate-200">{ticket.subject}</p>
                        <p className="text-[9px] text-slate-500 mt-0.5">Date Raised: {ticket.date}</p>
                      </div>
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                        ticket.status === "Resolved"
                          ? "bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400"
                          : "bg-orange-50 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400 animate-pulse"
                      }`}>
                        {ticket.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Introductions */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Meet Your Team</h3>
                <div className="grid grid-cols-2 gap-3">
                  {store.welcomeMessages.map((w) => (
                    <div key={w.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 text-center relative">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xl mx-auto mb-2">
                        {w.avatar}
                      </div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{w.sender}</p>
                      <p className="text-[9px] text-slate-500">{w.role}</p>
                      <div className="mt-2 text-[9px] text-teal-600 dark:text-teal-400 font-semibold cursor-pointer">Say Hello!</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transition Handoff Button */}
              {onboardingProgress === 100 && (
                <button
                  onClick={() => setIsOnboarding(false)}
                  className="w-full bg-gradient-to-r from-teal-500 to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 animate-pulse-ring"
                >
                  <CheckCircle2 size={16} /> Complete Onboarding Handoff
                </button>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* STANDARD HOME DASHBOARD MODULE */}
          {/* ==================================================== */}
          {activeTab === "home" && (
            <div className="space-y-4">
              {/* Profile Card Summary */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-4 text-white shadow-lg border border-slate-800 relative">
                <div className="absolute top-4 right-4 text-teal-400 flex items-center gap-1 text-[10px] font-bold">
                  <ShieldCheck size={12} /> RBAC Verified
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-500 to-orange-400 flex items-center justify-center text-xl shadow-inner font-bold">
                    {role === "employee" ? "SC" : role === "manager" ? "MV" : "HR"}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">
                      {role === "employee" ? "Sarah Connor" : role === "manager" ? "Michael Vance" : "Sarah Smith (HR)"}
                    </h2>
                    <p className="text-xs text-slate-400">{role === "employee" ? "Senior UI/UX Specialist" : role === "manager" ? "Engineering Lead" : "Lead Recruiter"}</p>
                  </div>
                </div>

                {/* Clock state indicators */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${store.isClockedIn ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}></span>
                    <span className="text-slate-300">
                      {store.isClockedIn ? `Clocked-in since ${store.attendanceLogs[0]?.clockIn}` : "Not clocked-in"}
                    </span>
                  </div>
                  <button 
                    onClick={() => setActiveTab("attendance")}
                    className="text-teal-400 font-semibold flex items-center gap-0.5 hover:underline"
                  >
                    Quick Check <ChevronRight size={12} />
                  </button>
                </div>
              </div>

              {/* Manager/HR Quick Actions Panel */}
              {(role === "manager" || role === "hr" || role === "admin") && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Pending Approvals</h3>
                  
                  {/* Leave Approval Requests count */}
                  {role === "manager" && store.leaveRequests.filter(r => r.status === "Pending").length > 0 && (
                    <div className="p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-orange-500" size={16} />
                        <div>
                          <p className="text-xs font-semibold text-orange-900 dark:text-orange-300">Leave Approvals</p>
                          <p className="text-[10px] text-orange-600 dark:text-orange-400">
                            {store.leaveRequests.filter(r => r.status === "Pending").length} request(s) awaiting review
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab("leave")}
                        className="bg-orange-500 text-white font-bold text-xs px-3 py-1 rounded-md hover:bg-orange-600"
                      >
                        Review
                      </button>
                    </div>
                  )}

                  {/* Expense Approval Requests count */}
                  {role === "manager" && store.expenseClaims.filter(e => e.status === "Pending-Approval").length > 0 && (
                    <div className="p-3 bg-teal-50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="text-teal-600 dark:text-teal-400" size={16} />
                        <div>
                          <p className="text-xs font-semibold text-teal-900 dark:text-teal-300">Expense Claims</p>
                          <p className="text-[10px] text-teal-600 dark:text-teal-400">
                            {store.expenseClaims.filter(e => e.status === "Pending-Approval").length} claim(s) awaiting approval
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab("expenses")}
                        className="bg-teal-600 text-white font-bold text-xs px-3 py-1 rounded-md hover:bg-teal-700"
                      >
                        Review
                      </button>
                    </div>
                  )}

                  {/* HR Recruitment candidates pipeline */}
                  {role === "hr" && (
                    <div className="p-3 bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/40 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Briefcase className="text-sky-500" size={16} />
                        <div>
                          <p className="text-xs font-semibold text-sky-900 dark:text-sky-300">Active Candidates</p>
                          <p className="text-[10px] text-sky-600 dark:text-sky-400">
                            {store.candidates.length} candidates in recruitment pipeline
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab("recruitment")}
                        className="bg-sky-500 text-white font-bold text-xs px-3 py-1 rounded-md hover:bg-sky-600"
                      >
                        Manage
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Leave Balance Quick glance (Employee Only) */}
              {role === "employee" && (
                <div className="grid grid-cols-2 gap-3">
                  {store.leaveBalances.slice(0, 2).map((b, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl p-3.5 border border-slate-100 dark:border-slate-800/80 shadow-sm">
                      <p className="text-2xs font-semibold text-slate-400 uppercase tracking-wider">{b.type}</p>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1">{b.available} Days</h3>
                      <p className="text-[10px] text-slate-500 mt-0.5">Used: {b.used} • Allowed: {b.allowed}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Latest Company Announcements */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Notice Board</h3>
                  <span onClick={() => setActiveTab("announcements")} className="text-[10px] text-teal-500 font-semibold cursor-pointer hover:underline">
                    View All
                  </span>
                </div>
                <div className="space-y-3 divide-y divide-slate-50 dark:divide-slate-800/60">
                  {store.announcements.slice(0, 2).map((ann, idx) => (
                    <div key={ann.id} className={`pt-2.5 first:pt-0`}>
                      <div className="flex justify-between items-start gap-2">
                        <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          ann.priority === "high" ? "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400" : "bg-slate-100 text-slate-600"
                        }`}>
                          {ann.category}
                        </span>
                        <span className="text-[9px] text-slate-400">{ann.date}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">{ann.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{ann.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Rating / OKRs Widget (Employee/Manager Only) */}
              {role === "employee" && (
                <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-950/10 dark:to-slate-900 rounded-xl p-4 border border-teal-100/80 dark:border-teal-900/30 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="bg-teal-500/20 text-teal-700 dark:text-teal-400 text-[9px] font-bold px-1.5 py-0.5 rounded">Goal Tracker</span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">Design Next-Gen Dashboard</h4>
                    <p className="text-[10px] text-slate-500">Weight: 40% • Due: 2026-06-30</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-teal-600 dark:text-teal-400">75%</div>
                    <p className="text-[9px] text-slate-500">Active OKR progress</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* ATTENDANCE MODULE (SELFIE & GEOLOCATION CLOCK-IN) */}
          {/* ==================================================== */}
          {activeTab === "attendance" && (
            <div className="space-y-4">
              {/* Selfie Time Clock Widget */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-teal-500/10 text-teal-500 dark:text-teal-300 flex items-center justify-center mx-auto animate-float">
                  <Clock size={36} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white">Selfie & Location Verified Attendance</h3>
                  <p className="text-2xs text-slate-500 mt-1">Noida Regional Office (Simulated Geofencing Range)</p>
                </div>

                <div className="flex justify-center items-center gap-6 py-2">
                  <div className="text-center">
                    <p className="text-2xs text-slate-400 font-semibold uppercase tracking-wider">Shift Schedule</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">09:00 AM - 06:00 PM</p>
                  </div>
                  <div className="h-8 w-px bg-slate-100 dark:bg-slate-800"></div>
                  <div className="text-center">
                    <p className="text-2xs text-slate-400 font-semibold uppercase tracking-wider">Total Productive</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                      {store.isClockedIn ? "Active Log..." : "00.0 Hours"}
                    </p>
                  </div>
                </div>

                {/* Clock In / Out Action Trigger */}
                {store.isClockedIn ? (
                  <button
                    onClick={() => store.clockOut()}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all"
                  >
                    Clock Out (Finish Shift)
                  </button>
                ) : (
                  <button
                    onClick={() => { setClockInModal(true); setClockInStep(1); setSelfieCaptured(false); }}
                    className="w-full bg-gradient-to-r from-teal-500 to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Verify & Clock In Now
                  </button>
                )}
              </div>

              {/* Geolocation Geofence details */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Verification Diagnostics</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-lg flex items-center gap-2">
                    <MapPin className="text-emerald-500" size={16} />
                    <div>
                      <p className="text-[10px] text-slate-400">GPS Location</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Noida (Within Boundary)</p>
                    </div>
                  </div>
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-lg flex items-center gap-2">
                    <Shield className="text-emerald-500" size={16} />
                    <div>
                      <p className="text-[10px] text-slate-400">IP Verification</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">192.168.1.100 (Safe IP)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance Log History */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Weekly Shift Logs</h3>
                <div className="space-y-2">
                  {store.attendanceLogs.map((log) => (
                    <div key={log.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{log.date}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Method: {log.method} • Loc: {log.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          {log.clockIn} - {log.clockOut || "Active"}
                        </p>
                        <span className="text-[9px] text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded">
                          {log.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selfie Camera simulation Modal */}
              {clockInModal && (
                <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                  <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-sm p-5 border border-slate-100 dark:border-slate-800 shadow-xl space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Security Verification</h4>
                      <button onClick={() => setClockInModal(false)} className="text-slate-400 hover:text-slate-600">
                        <X size={18} />
                      </button>
                    </div>

                    {clockInStep === 1 && (
                      <div className="space-y-4 text-center">
                        <p className="text-xs text-slate-500">To secure your session and comply with statutory policies, verification is required.</p>
                        <div className="aspect-square bg-slate-100 dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-800 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
                          {selfieCaptured ? (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold text-sm">
                              📸 Selfie Captured!
                              <span className="text-[10px] font-normal text-slate-400 mt-1">Verification ready</span>
                            </div>
                          ) : selfieProgress > 0 ? (
                            <div className="space-y-2">
                              <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                              <p className="text-xs text-slate-500">Capturing: {selfieProgress}%</p>
                            </div>
                          ) : (
                            <button
                              onClick={triggerSelfieCapture}
                              className="bg-teal-500 text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1 shadow hover:bg-teal-600"
                            >
                              Activate Front Camera
                            </button>
                          )}
                        </div>

                        {selfieCaptured && (
                          <button
                            onClick={() => setClockInStep(2)}
                            className="w-full bg-gradient-to-r from-teal-500 to-orange-500 text-white font-bold py-2.5 rounded-lg shadow"
                          >
                            Verify Location & IP
                          </button>
                        )}
                      </div>
                    )}

                    {clockInStep === 2 && (
                      <div className="space-y-4 text-center">
                        <p className="text-xs text-slate-500">Verifying secure corporate coordinates...</p>
                        
                        <div className="space-y-2.5 text-left text-xs bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-800/80">
                          <div className="flex items-center justify-between text-emerald-500 font-semibold">
                            <span>Selfie match check</span>
                            <span className="flex items-center gap-0.5"><Check size={12} strokeWidth={3} /> Success (99.8%)</span>
                          </div>
                          <div className="flex items-center justify-between text-emerald-500 font-semibold">
                            <span>GPS Geofence status</span>
                            <span className="flex items-center gap-0.5"><Check size={12} strokeWidth={3} /> Verified (Inside)</span>
                          </div>
                          <div className="flex items-center justify-between text-emerald-500 font-semibold">
                            <span>Corporate IP validation</span>
                            <span className="flex items-center gap-0.5"><Check size={12} strokeWidth={3} /> Safe (Internal IP)</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            store.clockIn("Selfie");
                            setClockInModal(false);
                          }}
                          className="w-full bg-teal-500 text-white font-bold py-2.5 rounded-lg shadow hover:bg-teal-600"
                        >
                          Complete Verification (Clock In)
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* LEAVE MANAGEMENT MODULE */}
          {/* ==================================================== */}
          {activeTab === "leave" && (
            <div className="space-y-4">
              {/* Leave Balance Widget */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Leave Allowances</h3>
                <div className="grid grid-cols-2 gap-2">
                  {store.leaveBalances.map((b, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg text-xs">
                      <p className="font-semibold text-slate-500 dark:text-slate-400">{b.type}</p>
                      <div className="flex justify-between items-baseline mt-1.5">
                        <span className="text-base font-bold text-slate-800 dark:text-white">{b.available} available</span>
                        <span className="text-[10px] text-slate-400">Total: {b.allowed}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Leave Request (Employee Only) */}
              {role === "employee" && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Request Time Off</h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    store.addLeaveRequest({
                      leaveType,
                      startDate: leaveStart,
                      endDate: leaveEnd,
                      totalDays: leaveDays,
                      reason: leaveReason
                    });
                    // Reset
                    setLeaveStart("");
                    setLeaveEnd("");
                    setLeaveReason("");
                  }} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Leave Type</label>
                      <select 
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded"
                      >
                        {store.leaveBalances.map((b, i) => (
                          <option key={i} value={b.type}>{b.type} (Avail: {b.available} Days)</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-500 font-semibold mb-1">Start Date</label>
                        <input
                          type="date"
                          value={leaveStart}
                          onChange={(e) => setLeaveStart(e.target.value)}
                          className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 font-semibold mb-1">End Date</label>
                        <input
                          type="date"
                          value={leaveEnd}
                          onChange={(e) => setLeaveEnd(e.target.value)}
                          className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-500 font-semibold mb-1">Total Days</label>
                        <input
                          type="number"
                          value={leaveDays}
                          onChange={(e) => setLeaveDays(Number(e.target.value))}
                          className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded"
                          min={1}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 font-semibold mb-1">Approver Flow</label>
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 text-[10px] rounded text-slate-600 dark:text-slate-400">
                          Michael Vance → Sarah Smith
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Reason</label>
                      <textarea
                        value={leaveReason}
                        onChange={(e) => setLeaveReason(e.target.value)}
                        className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded"
                        rows={2}
                        placeholder="Write context for reason..."
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2.5 rounded-lg shadow transition-all"
                    >
                      Submit Leave Request
                    </button>
                  </form>
                </div>
              )}

              {/* Leave Requests Queue (Both Employee details & Manager/HR Approval action) */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  {role === "manager" || role === "hr" ? "Team Approval Requests Queue" : "My Leave History"}
                </h3>
                
                <div className="space-y-3">
                  {store.leaveRequests.map((req) => (
                    <div key={req.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">
                            {req.employeeName} ({req.leaveType})
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            Duration: {req.startDate} to {req.endDate} ({req.totalDays} Day)
                          </p>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          req.status === "Approved" ? "bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400" :
                          req.status === "Rejected" ? "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400" :
                          "bg-orange-50 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400 animate-pulse"
                        }`}>
                          {req.status}
                        </span>
                      </div>

                      <p className="text-[10px] text-slate-600 dark:text-slate-400 italic">
                        Reason: "{req.reason}"
                      </p>

                      {/* Approval flow stages */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3 text-[9px] text-slate-400">
                        {req.approvalFlow.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              step.status === "Approved" ? "bg-green-500" :
                              step.status === "Rejected" ? "bg-red-500" : "bg-orange-500 animate-ping"
                            }`}></span>
                            <span>{step.step}: {step.status}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action buttons for Managers/HR */}
                      {req.status === "Pending" && (role === "manager" || role === "hr") && (
                        <div className="pt-2 flex items-center gap-2">
                          <input 
                            type="text" 
                            placeholder="Add comment..." 
                            value={approvalComment}
                            onChange={(e) => setApprovalComment(e.target.value)}
                            className="flex-1 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-[10px]"
                          />
                          <button
                            onClick={() => {
                              store.approveLeaveRequest(req.id, approvalComment, role);
                              setApprovalComment("");
                            }}
                            className="bg-green-500 text-white font-bold text-[10px] px-2.5 py-1 rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              store.rejectLeaveRequest(req.id, approvalComment, role);
                              setApprovalComment("");
                            }}
                            className="bg-red-500 text-white font-bold text-[10px] px-2.5 py-1 rounded"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* PAYROLL & STATUTORY COMPLIANCE MODULE */}
          {/* ==================================================== */}
          {activeTab === "payroll" && (
            <div className="space-y-4">
              {/* Country Selector for compliance preview */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Statutory Region Compliance Preview
                </span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setPayrollCountry("IN")}
                    className={`px-3 py-1 rounded-md font-bold transition-all ${
                      payrollCountry === "IN" ? "bg-teal-500 text-slate-950 shadow" : "bg-slate-100 dark:bg-slate-800 text-slate-600"
                    }`}
                  >
                    India (PF/ESI)
                  </button>
                  <button
                    onClick={() => setPayrollCountry("US")}
                    className={`px-3 py-1 rounded-md font-bold transition-all ${
                      payrollCountry === "US" ? "bg-teal-500 text-slate-950 shadow" : "bg-slate-100 dark:bg-slate-800 text-slate-600"
                    }`}
                  >
                    US (W-4/FICA)
                  </button>
                </div>
              </div>

              {/* Itemized Payslip preview */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 text-xs font-mono">
                <div className="text-center pb-3 border-b border-dashed border-slate-200 dark:border-slate-800">
                  <h3 className="font-bold text-slate-900 dark:text-white uppercase">WorkFlow Technologies</h3>
                  <p className="text-[10px] text-slate-400">Pay Period: June 1 - June 30, 2026</p>
                  <p className="text-[10px] text-slate-400">Payout Date: June 30, 2026</p>
                </div>

                {/* EARNINGS */}
                <div className="space-y-1.5">
                  <p className="font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wide text-[10px]">A. Earnings</p>
                  <div className="flex justify-between">
                    <span>Basic Salary</span>
                    <span>{payrollCountry === "IN" ? "₹80,000" : "$6,000"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>House Rent Allowance (HRA)</span>
                    <span>{payrollCountry === "IN" ? "₹32,000" : "$1,500"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Special Allowance</span>
                    <span>{payrollCountry === "IN" ? "₹18,000" : "$500"}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-slate-100 dark:border-slate-800/80 pt-1 text-slate-800 dark:text-slate-200">
                    <span>Gross Earnings</span>
                    <span>{payrollCountry === "IN" ? "₹1,30,000" : "$8,000"}</span>
                  </div>
                </div>

                {/* DEDUCTIONS */}
                <div className="space-y-1.5 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800">
                  <p className="font-bold text-red-500 uppercase tracking-wide text-[10px]">B. Statutory Deductions</p>
                  {payrollCountry === "IN" ? (
                    <>
                      <div className="flex justify-between">
                        <span>Provident Fund (PF Employee)</span>
                        <span>₹9,600</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ESI Deduction</span>
                        <span>₹975</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Professional Tax (PT)</span>
                        <span>₹200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TDS (Income Tax)</span>
                        <span>₹14,500</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span>Federal Income Tax</span>
                        <span>$1,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Social Security (FICA)</span>
                        <span>$496</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Medicare</span>
                        <span>$116</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Health Insurance Premium</span>
                        <span>$250</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between font-bold border-t border-slate-100 dark:border-slate-800/80 pt-1 text-slate-800 dark:text-slate-200">
                    <span>Total Deductions</span>
                    <span>{payrollCountry === "IN" ? "₹25,275" : "$2,062"}</span>
                  </div>
                </div>

                {/* CONTRIBUTIONS */}
                <div className="space-y-1.5 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800">
                  <p className="font-bold text-orange-500 uppercase tracking-wide text-[10px]">C. Employer Contributions</p>
                  {payrollCountry === "IN" ? (
                    <>
                      <div className="flex justify-between">
                        <span>Provident Fund (PF Employer)</span>
                        <span>₹9,600</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gratuity Accrual</span>
                        <span>₹3,846</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span>Employer FICA Match</span>
                        <span>$612</span>
                      </div>
                      <div className="flex justify-between">
                        <span>401(k) Match Contribution</span>
                        <span>$320</span>
                      </div>
                    </>
                  )}
                </div>

                {/* NET PAY */}
                <div className="pt-3 border-t border-double border-slate-200 dark:border-slate-800/80 flex justify-between items-center bg-teal-500/5 p-2 rounded">
                  <span className="font-bold text-slate-900 dark:text-white">NET PAYOUT (NET PAY)</span>
                  <span className="text-sm font-extrabold text-teal-600 dark:text-teal-400">
                    {payrollCountry === "IN" ? "₹1,04,725" : "$5,938"}
                  </span>
                </div>

                {/* Actions */}
                <button
                  type="button"
                  onClick={() => alert("Simulating Payslip PDF download...")}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded shadow text-xs mt-3 flex items-center justify-center gap-1.5 font-sans"
                >
                  <Upload size={14} className="rotate-180" /> Download Payslip PDF
                </button>
              </div>

              {/* Compliance checklist board */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Statutory Compliance Calendar</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Form 16 Tax Statement</p>
                      <p className="text-[9px] text-slate-500">AY 2026-27 compliance filing</p>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-500">Available</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">EPF Monthly Remittance</p>
                      <p className="text-[9px] text-slate-500">Filing Deadline: July 15, 2026</p>
                    </div>
                    <span className="text-[9px] font-bold text-orange-500">Processing</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* DOCUMENTS MODULE */}
          {/* ==================================================== */}
          {activeTab === "documents" && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Verification Vault</h3>
                <p className="text-2xs text-slate-500">Upload your identity, tax, and education records for compliance checks.</p>
                
                <div className="space-y-3 text-xs">
                  {/* Category lists */}
                  {[
                    { id: "identity", label: "Identity Proof (Passport/National ID)", status: "Verified", expiry: "2032-12-31" },
                    { id: "tax", label: "Tax Declaration Forms (Form-16/W-4)", status: "Uploaded" },
                    { id: "education", label: "Highest Education Degree Certificate", status: "Missing" },
                    { id: "work-auth", label: "Work Authorization Letter", status: "Rejected", reason: "Signature stamp blurred" }
                  ].map((doc) => (
                    <div key={doc.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{doc.label}</p>
                          {doc.expiry && <p className="text-[9px] text-slate-400 mt-0.5">Expires: {doc.expiry}</p>}
                        </div>
                        <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                          doc.status === "Verified" ? "bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400" :
                          doc.status === "Uploaded" ? "bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400" :
                          doc.status === "Rejected" ? "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400" :
                          "bg-orange-50 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400"
                        }`}>
                          {doc.status}
                        </span>
                      </div>

                      {doc.reason && (
                        <p className="text-[10px] text-red-500 font-semibold bg-red-50 dark:bg-red-950/10 p-1.5 rounded">
                          Rejection Reason: "{doc.reason}"
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1 text-[10px]">
                        {uploadedDocs[doc.id] ? (
                          <span className="text-slate-500 italic truncate max-w-[200px]">
                            {uploadedDocs[doc.id].name} ({uploadedDocs[doc.id].size})
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">No file attached</span>
                        )}

                        {uploadingDocCategory === doc.id ? (
                          <span className="text-teal-500 font-bold animate-pulse">Uploading file...</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => simulateUpload(doc.id)}
                            className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded font-bold"
                          >
                            Upload File
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* EXPENSES & REIMBURSEMENTS MODULE */}
          {/* ==================================================== */}
          {activeTab === "expenses" && (
            <div className="space-y-4">
              {/* Submit Expense Form (Employee Only) */}
              {role === "employee" && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Submit Expense Claim</h3>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    store.addExpenseClaim({
                      category: expCategory,
                      amount: expAmount,
                      currency: expCurrency,
                      description: expDesc,
                      date: expDate,
                      mileage: expMileage ? { distance: expDistance, from: "Office", to: "Site", ratePerKm: 12, amount: expDistance * 12 } : undefined
                    });
                    // Reset
                    setExpAmount(0);
                    setExpDesc("");
                    setExpDate("");
                    setExpMileage(false);
                  }} className="space-y-3 text-xs">
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-500 font-semibold mb-1">Category</label>
                        <select
                          value={expCategory}
                          onChange={(e) => setExpCategory(e.target.value)}
                          className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded"
                        >
                          <option value="travel">Travel & Transport</option>
                          <option value="food">Meals & Dining</option>
                          <option value="accommodation">Lodging/Hotel</option>
                          <option value="communication">Broadband/Mobile</option>
                          <option value="office-supplies">Office Supplies</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-500 font-semibold mb-1">Receipt Image</label>
                        <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded p-2 bg-slate-50 dark:bg-slate-950 text-[10px] text-center text-slate-400 flex items-center justify-center gap-1 cursor-pointer">
                          <Upload size={12} /> Click to attach
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 py-1">
                      <input 
                        type="checkbox" 
                        id="mileage" 
                        checked={expMileage}
                        onChange={(e) => setExpMileage(e.target.checked)}
                        className="rounded border-slate-300 text-teal-600"
                      />
                      <label htmlFor="mileage" className="font-semibold text-slate-600 dark:text-slate-400">
                        Is this a travel mileage claim?
                      </label>
                    </div>

                    {expMileage && (
                      <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded space-y-2">
                        <label className="block text-slate-500 font-semibold mb-1">Distance (in Kilometers)</label>
                        <input
                          type="number"
                          value={expDistance}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setExpDistance(val);
                            setExpAmount(val * 12); // Reimbursement: ₹12 per km
                          }}
                          className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded"
                          placeholder="e.g. 50"
                        />
                        <p className="text-[10px] text-teal-600 font-semibold">
                          Calculated Amount: ₹{expDistance * 12} (@ ₹12/km compliance rate)
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="block text-slate-500 font-semibold mb-1">Claim Amount</label>
                        <input
                          type="number"
                          value={expAmount}
                          onChange={(e) => setExpAmount(Number(e.target.value))}
                          disabled={expMileage}
                          className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded disabled:opacity-60"
                          placeholder="0.0"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 font-semibold mb-1">Currency</label>
                        <select
                          value={expCurrency}
                          onChange={(e) => setExpCurrency(e.target.value)}
                          className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded"
                        >
                          <option value="INR">INR (₹)</option>
                          <option value="USD">USD ($)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-500 font-semibold mb-1">Expense Date</label>
                        <input
                          type="date"
                          value={expDate}
                          onChange={(e) => setExpDate(e.target.value)}
                          className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 font-semibold mb-1">Policy Limit Check</label>
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded text-[9px] text-slate-500 flex items-center gap-1">
                          <AlertCircle size={10} /> Max: food ₹1k / travel ₹5k
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Description / Purpose</label>
                      <textarea
                        value={expDesc}
                        onChange={(e) => setExpDesc(e.target.value)}
                        className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded"
                        rows={2}
                        placeholder="Purpose of cost..."
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2.5 rounded-lg shadow transition-all"
                    >
                      Submit Reimbursement Claim
                    </button>
                  </form>
                </div>
              )}

              {/* Expense Claims Queue */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  {role === "manager" || role === "hr" ? "Reimbursement Approvals Queue" : "Claim History"}
                </h3>
                
                <div className="space-y-3">
                  {store.expenseClaims.map((claim) => (
                    <div key={claim.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">
                            {claim.employeeName} ({claim.category.toUpperCase()})
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            Date: {claim.date} • Amount: {claim.currency} {claim.amount}
                          </p>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          claim.status === "Paid" || claim.status === "Approved" ? "bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400" :
                          claim.status === "Rejected" ? "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400" :
                          "bg-orange-50 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400 animate-pulse"
                        }`}>
                          {claim.status}
                        </span>
                      </div>

                      <p className="text-[10px] text-slate-600 dark:text-slate-400 italic">
                        "{claim.description}"
                      </p>

                      {claim.mileage && (
                        <div className="text-[9px] bg-teal-50 dark:bg-teal-950/10 p-1.5 rounded text-teal-600 dark:text-teal-400 font-semibold">
                          🚗 Mileage: {claim.mileage.distance} km from {claim.mileage.from} to {claim.mileage.to}
                        </div>
                      )}

                      {/* Policy Validation indicator */}
                      <div className={`p-1.5 rounded text-[9px] flex items-center gap-1.5 font-semibold ${
                        claim.policyValidation.withinLimit ? "bg-green-50 text-green-600 dark:bg-green-950/15" : "bg-red-50 text-red-500 dark:bg-red-950/15"
                      }`}>
                        {claim.policyValidation.withinLimit ? <Check size={10} strokeWidth={3} /> : <AlertTriangle size={10} />}
                        {claim.policyValidation.message}
                      </div>

                      {/* Manager action controls */}
                      {claim.status === "Pending-Approval" && (role === "manager" || role === "hr") && (
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                          <button
                            onClick={() => store.rejectExpenseClaim(claim.id, "Outside boundaries")}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold text-[10px] px-2.5 py-1 rounded"
                          >
                            Reject Claim
                          </button>
                          <button
                            onClick={() => store.approveExpenseClaim(claim.id, "Within daily limit")}
                            className="bg-teal-500 hover:bg-teal-600 text-white font-bold text-[10px] px-2.5 py-1 rounded"
                          >
                            Approve Reimbursement
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* PERFORMANCE & OKR MANAGEMENT MODULE */}
          {/* ==================================================== */}
          {activeTab === "performance" && (
            <div className="space-y-4">
              {/* Performance appraisal summary card */}
              <div className="bg-gradient-to-br from-teal-500 to-teal-700 text-white rounded-2xl p-4 shadow-lg border border-teal-600 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-15 transform translate-x-3 translate-y-3">
                  <Award size={100} />
                </div>
                <p className="text-2xs font-semibold text-teal-100 uppercase tracking-wider">Active Performance Scorecard</p>
                <div className="flex justify-between items-baseline mt-2">
                  <h3 className="text-2xl font-black">4.5 / 5.0 Rating</h3>
                  <span className="text-xs bg-slate-900/35 px-2 py-0.5 rounded font-bold">Q1-2026 Appraisal</span>
                </div>
                <p className="text-xs text-teal-100 mt-2">Manager Recommendation: "Promote to Senior Full Stack Engineer"</p>
              </div>

              {/* Goals and Key Results List */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">OKR Key Objectives</h3>
                <div className="space-y-4">
                  {store.goals.map((g) => (
                    <div key={g.id} className="space-y-2">
                      <div className="flex justify-between items-start text-xs">
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">{g.title}</p>
                          <p className="text-[10px] text-slate-500">{g.description}</p>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                          g.status === "completed" ? "bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400" : "bg-orange-50 text-orange-600"
                        }`}>
                          {g.status}
                        </span>
                      </div>

                      {/* Goal weight and target sliders */}
                      <div className="space-y-1 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/80">
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>Weight: {g.weight}%</span>
                          <span className="font-bold text-teal-500">{g.progress}% Complete</span>
                        </div>
                        
                        {/* Simulated Progress update slider (Employee Only) */}
                        {role === "employee" ? (
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={g.progress}
                            onChange={(e) => store.updateGoalProgress(g.id, Number(e.target.value))}
                            className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                          />
                        ) : (
                          <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                            <div className="bg-teal-500 h-full rounded-full" style={{ width: `${g.progress}%` }}></div>
                          </div>
                        )}

                        {/* Key Results Checklist */}
                        <div className="mt-2.5 pt-2 border-t border-slate-200/50 dark:border-slate-800 space-y-1.5">
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Key Outcomes</p>
                          {g.keyResults.map((kr) => (
                            <div key={kr.id} className="flex justify-between items-center text-[10px]">
                              <span className="text-slate-600 dark:text-slate-400">• {kr.title}</span>
                              <span className="font-semibold text-slate-500">
                                {kr.current} / {kr.target}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* VALUE CONTRIBUTIONS MODULE */}
          {/* ==================================================== */}
          {activeTab === "contributions" && (
            <div className="space-y-4">
              {/* Leaderboard panel */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Contributions Leaderboard</h3>
                <div className="space-y-2">
                  {store.leaderboard.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-slate-400 w-4">#{user.rank}</span>
                        <span className="text-lg">{user.avatar}</span>
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{user.name}</p>
                          <p className="text-[9px] text-slate-500">Badges: {user.badges.join(", ")}</p>
                        </div>
                      </div>
                      <span className="font-bold text-teal-600 dark:text-teal-400">{user.points} pts</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Claimable Contribution Catalog */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Available Task Catalog</h3>
                <div className="space-y-3">
                  {store.contributionCatalog.map((item) => (
                    <div key={item.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-850 dark:text-slate-200">{item.title}</h4>
                        <span className="text-[10px] font-bold text-orange-500">+{item.suggestedPoints} pts</span>
                      </div>
                      <p className="text-[10px] text-slate-500">{item.description}</p>
                      <button
                        onClick={() => store.claimContributionItem(item.id, "Sarah Connor")}
                        className="bg-teal-500 hover:bg-teal-600 text-white font-bold text-[10px] px-3.5 py-1.5 rounded w-full shadow-sm"
                      >
                        Claim Task & Start Earning
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TRAINING & LEARNING HUB MODULE */}
          {/* ==================================================== */}
          {activeTab === "training" && (
            <div className="space-y-4">
              {/* Course Detail Interactive Viewer */}
              {activeCourse ? (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-850 shadow-md space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase truncate max-w-[200px]">
                      {activeCourse.title}
                    </h3>
                    <button onClick={() => setActiveCourse(null)} className="text-slate-400 hover:text-slate-600">
                      <X size={16} />
                    </button>
                  </div>

                  {courseContentStep ? (
                    <div className="space-y-3 text-xs">
                      <div className="aspect-video bg-slate-950 rounded-lg flex flex-col items-center justify-center border border-slate-800 relative overflow-hidden p-4 text-center">
                        <p className="font-semibold text-teal-400">Simulating Course Content Player...</p>
                        <p className="text-[10px] text-slate-500 mt-2">Active Topic: "{courseContentStep}"</p>
                        
                        <button
                          onClick={() => {
                            store.completeCourseModule(activeCourse.id, activeCourse.contentItems.find(c => c.title === courseContentStep)!.id);
                            setCourseContentStep(null);
                            // Refresh course status in viewer
                            const updatedMod = useUiStore.getState().trainingModules.find(m => m.id === activeCourse.id);
                            if (updatedMod) setActiveCourse(updatedMod);
                          }}
                          className="mt-4 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold px-3 py-1.5 rounded shadow text-[10px]"
                        >
                          Mark Topic Complete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-xs">
                      <p className="text-2xs text-slate-500">Module Outline ({activeCourse.progress}% Completed)</p>
                      <div className="space-y-2">
                        {activeCourse.contentItems.map((item) => (
                          <div key={item.id} className="p-2.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-slate-850 dark:text-slate-200">{item.title}</p>
                              <span className="text-[9px] text-slate-400 uppercase tracking-widest">{item.type}</span>
                            </div>
                            {item.isCompleted ? (
                              <span className="text-[9px] text-emerald-500 font-bold flex items-center gap-0.5">
                                <Check size={12} strokeWidth={3} /> Done
                              </span>
                            ) : (
                              <button
                                onClick={() => setCourseContentStep(item.title)}
                                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[9px] px-2.5 py-1 rounded"
                              >
                                Start
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Course Catalog list */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Assigned Course Catalog</h3>
                <div className="space-y-3">
                  {store.trainingModules.map((m) => (
                    <div key={m.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-850 dark:text-slate-200">{m.title}</h4>
                          <p className="text-[10px] text-slate-400">Duration: {m.duration} • Due: {m.dueDate}</p>
                        </div>
                        {m.isMandatory && (
                          <span className="text-[8px] bg-red-50 text-red-600 font-bold px-1.5 py-0.2 rounded uppercase">
                            Mandatory
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-1 text-[10px]">
                        <span>Progress: {m.progress}%</span>
                        <button
                          onClick={() => setActiveCourse(m)}
                          className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-[10px] px-3.5 py-1 rounded shadow-sm"
                        >
                          Launch Course
                        </button>
                      </div>

                      {m.certificateUrl && (
                        <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800 flex justify-between items-center text-[10px] text-emerald-500 font-bold">
                          <span>🎓 Completed with Honors!</span>
                          <span className="cursor-pointer underline">Get Certificate</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* RECRUITMENT PIPELINE MODULE (HR/ADMIN ONLY) */}
          {/* ==================================================== */}
          {activeTab === "recruitment" && (
            <div className="space-y-4">
              {/* Pipeline Candidates Boards */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Interview Selection Pipeline</h3>
                <div className="space-y-3">
                  {store.candidates.map((cand) => (
                    <div key={cand.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-850 dark:text-slate-200">{cand.name}</h4>
                          <p className="text-[9px] text-slate-500">Applied: {cand.appliedRole}</p>
                        </div>
                        <span className="text-[9px] font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded uppercase">
                          {cand.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 dark:text-slate-400">
                        <span>Exp: {cand.experience}</span>
                        <span>Notice: {cand.noticePeriod}</span>
                        <span>Rating: ⭐ {cand.rating}</span>
                        <span>Salary Exp: {cand.expectedSalary}</span>
                      </div>

                      {cand.interviewDate && (
                        <p className="text-[9px] text-orange-500 font-bold bg-orange-50 dark:bg-orange-950/10 p-1.5 rounded">
                          📅 Scheduled Interview: {cand.interviewDate} at {cand.interviewTime}
                        </p>
                      )}

                      {/* Status changes controls */}
                      <div className="pt-2 border-t border-slate-250/30 dark:border-slate-800 flex flex-wrap gap-1.5 justify-end">
                        <button
                          onClick={() => {
                            setSelectedCandidate(cand);
                            setIsInterviewModalOpen(true);
                          }}
                          className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-[9px] px-2 py-1 rounded"
                        >
                          Schedule Interview
                        </button>
                        <button
                          onClick={() => store.updateCandidateStatus(cand.id, "shortlisted")}
                          className="bg-slate-950 text-white dark:bg-slate-800 font-bold text-[9px] px-2 py-1 rounded"
                        >
                          Shortlist
                        </button>
                        <button
                          onClick={() => store.updateCandidateStatus(cand.id, "offer-extended")}
                          className="bg-teal-500 text-slate-950 font-bold text-[9px] px-2 py-1 rounded"
                        >
                          Offer Letter
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview Scheduler Modal */}
              {isInterviewModalOpen && selectedCandidate && (
                <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                  <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-sm p-5 border border-slate-100 dark:border-slate-850 shadow-xl space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Schedule Interview</h4>
                      <button onClick={() => setIsInterviewModalOpen(false)} className="text-slate-400 hover:text-slate-650">
                        <X size={18} />
                      </button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      store.scheduleInterview(selectedCandidate.id, interviewDate, interviewTime);
                      setIsInterviewModalOpen(false);
                    }} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-500 font-semibold mb-1">Candidate Name</label>
                        <input type="text" value={selectedCandidate.name} disabled className="w-full p-2 bg-slate-100 rounded opacity-70" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-slate-500 font-semibold mb-1">Date</label>
                          <input type="date" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} required className="w-full p-2 bg-slate-50 border rounded" />
                        </div>
                        <div>
                          <label className="block text-slate-500 font-semibold mb-1">Time</label>
                          <input type="time" value={interviewTime} onChange={(e) => setInterviewTime(e.target.value)} required className="w-full p-2 bg-slate-50 border rounded" />
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded shadow">
                        Confirm Interview Invitation
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* RECOGNITION BOARD (PEER-TO-PEER KUDOS BOARD) */}
          {/* ==================================================== */}
          {activeTab === "recognition" && (
            <div className="space-y-4">
              {/* Post Kudos Card Form */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Send Recognition Kudos</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  store.addRecognition({
                    recipientName: kudosRecipient,
                    recipientAvatar: "👨‍🚀",
                    category: kudosCat,
                    message: kudosMsg,
                    isPrivate: false
                  });
                  setKudosMsg("");
                }} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Colleague</label>
                      <select
                        value={kudosRecipient}
                        onChange={(e) => setKudosRecipient(e.target.value)}
                        className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded"
                      >
                        <option value="John Doe">John Doe (Engineering)</option>
                        <option value="Sarah Connor">Sarah Connor (Design)</option>
                        <option value="Jane Doe">Jane Doe (CEO)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Category Badge</label>
                      <select
                        value={kudosCat}
                        onChange={(e) => setKudosCat(e.target.value as any)}
                        className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded"
                      >
                        <option value="excellence">⭐ Excellence</option>
                        <option value="team-player">🤝 Team-Player</option>
                        <option value="innovation">💡 Innovation</option>
                        <option value="leadership">👑 Leadership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">Your Appreciation Message</label>
                    <textarea
                      value={kudosMsg}
                      onChange={(e) => setKudosMsg(e.target.value)}
                      className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded"
                      rows={2}
                      placeholder="Recognize their contribution..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded shadow transition-all"
                  >
                    Post Kudos Card
                  </button>
                </form>
              </div>

              {/* Recognition feed */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Public Kudos Feed</h3>
                <div className="space-y-3">
                  {store.recognitions.map((rec) => (
                    <div key={rec.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{rec.senderAvatar}</span>
                        <div>
                          <p className="font-semibold text-slate-850 dark:text-slate-200">
                            {rec.senderName} appreciated {rec.recipientName}
                          </p>
                          <span className="text-[8px] bg-orange-50 text-orange-600 px-1.5 py-0.2 rounded font-bold uppercase">
                            Badge: {rec.category}
                          </span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-600 dark:text-slate-400 italic">
                        "{rec.message}"
                      </p>

                      <div className="pt-2 border-t border-slate-200/50 dark:border-slate-850 flex gap-4 text-[10px] text-slate-500">
                        <button onClick={() => store.likeRecognition(rec.id)} className="flex items-center gap-0.5 hover:text-red-500">
                          <Heart size={12} className={rec.likedByMe ? "fill-red-500 text-red-500" : ""} /> {rec.likesCount}
                        </button>
                        <span><MessageCircle size={12} className="inline mr-0.5" /> {rec.comments.length} Comments</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* ANNOUNCEMENTS MODULE */}
          {/* ==================================================== */}
          {activeTab === "announcements" && (
            <div className="space-y-4">
              {/* Create Announcements Flow (HR/Admin Only) */}
              {(role === "hr" || role === "admin") && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Publish Announcement</h3>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const title = (e.target as any).annTitle.value;
                    const content = (e.target as any).annContent.value;
                    store.addAnnouncement({
                      title,
                      content,
                      category: "hr-update",
                      priority: "high",
                      visibilityScope: "global",
                      targetAudience: "All Employees"
                    });
                    (e.target as any).reset();
                  }} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Headline</label>
                      <input type="text" name="annTitle" required className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 rounded" />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Details</label>
                      <textarea name="annContent" rows={2} required className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 rounded"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-teal-500 text-white font-bold py-2 rounded shadow">
                      Publish Notice
                    </button>
                  </form>
                </div>
              )}

              {/* Announcements lists with policy read checks */}
              <div className="space-y-3">
                {store.announcements.map((ann) => (
                  <div key={ann.id} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded uppercase ${
                        ann.priority === "high" ? "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400" : "bg-slate-100 text-slate-600"
                      }`}>
                        {ann.category}
                      </span>
                      <span className="text-[9px] text-slate-400">{ann.date}</span>
                    </div>

                    <h4 className="font-bold text-slate-850 dark:text-slate-200">{ann.title}</h4>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">{ann.content}</p>

                    {/* Policy Acknowledgment Button */}
                    <div className="pt-2.5 border-t border-slate-100 dark:border-slate-850/80 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Acknowledged: {ann.acknowledgmentsCount} Employee(s)</span>
                      
                      {ann.acknowledgedByMe ? (
                        <span className="text-emerald-500 font-semibold flex items-center gap-0.5">
                          <CheckCircle2 size={12} /> Acknowledged Receipt
                        </span>
                      ) : (
                        <button
                          onClick={() => store.acknowledgeAnnouncement(ann.id)}
                          className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 font-bold px-3 py-1 rounded"
                        >
                          Acknowledge Policy
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TEAM MANAGEMENT MODULE (MANAGER/HR/ADMIN ONLY) */}
          {/* ==================================================== */}
          {activeTab === "team" && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Direct Reports Roster</h3>
                <div className="divide-y divide-slate-100 dark:divide-slate-850">
                  {[
                    { name: "John Doe", role: "Associate Database Admin", dept: "Engineering", avatar: "👨‍🚀", mail: "john.doe@company.com" },
                    { name: "Sarah Connor", role: "Senior UI Designer", dept: "Design", avatar: "👩‍🚀", mail: "sarah.c@company.com" },
                    { name: "David Vance", role: "Contract Dev (Applicant)", dept: "Engineering", avatar: "👨‍💻", mail: "d.vance@apply.com" }
                  ].map((member, i) => (
                    <div key={i} className="py-2.5 flex items-center justify-between gap-2 text-xs first:pt-0 last:pb-0">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{member.avatar}</span>
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{member.name}</p>
                          <p className="text-[9px] text-slate-500">{member.role} • {member.dept}</p>
                        </div>
                      </div>
                      <span className="text-[9px] text-teal-500 cursor-pointer">Profile</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* ANALYTICS MODULE (HR/ADMIN ONLY) */}
          {/* ==================================================== */}
          {activeTab === "analytics" && (
            <div className="space-y-4">
              {/* Analytics Metric Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <p className="text-2xs font-semibold text-slate-400 uppercase tracking-wider">Attendance Rate</p>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1">94.8%</h3>
                  <p className="text-[9px] text-emerald-500 mt-0.5">⭐ Meets threshold target</p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <p className="text-2xs font-semibold text-slate-400 uppercase tracking-wider">Pipeline Yield</p>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1">2.4 Weeks</h3>
                  <p className="text-[9px] text-slate-450 mt-0.5">Average time-to-hire</p>
                </div>
              </div>

              {/* Pure Tailwind CSS Custom Charts */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Monthly Recruitment Funnel</h3>
                <div className="h-32 flex items-end justify-between gap-3 pt-4 border-b border-slate-100 dark:border-slate-800">
                  {[
                    { label: "Applicants", value: "85%", color: "bg-teal-500" },
                    { label: "Screening", value: "60%", color: "bg-teal-400" },
                    { label: "Interviews", value: "35%", color: "bg-orange-400" },
                    { label: "Offers", value: "10%", color: "bg-orange-500" }
                  ].map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="text-[10px] font-bold text-slate-700 dark:text-slate-350">{bar.value}</div>
                      <div className={`w-full ${bar.color} rounded-t-sm transition-all duration-700`} style={{ height: bar.value }}></div>
                      <div className="text-[9px] text-slate-400 tracking-tight truncate w-full text-center">{bar.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Dynamic App Shell Bottom Tab Navigation */}
        <nav className="absolute bottom-0 inset-x-0 bg-white/95 dark:bg-slate-900/95 border-t border-slate-100 dark:border-slate-850 py-2 px-3 flex justify-around items-center z-30 backdrop-blur-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === "copilot-help") {
                    setCopilotOpen(true);
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`flex flex-col items-center gap-0.5 py-1 text-center transition-all ${
                  isSelected 
                    ? "text-teal-500 scale-105 font-bold" 
                    : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350"
                }`}
              >
                <Icon size={18} strokeWidth={isSelected ? 2.5 : 2} />
                <span className="text-[9px] tracking-tight truncate max-w-[65px]">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Global Slide-Up AI HR Copilot Panel */}
        {copilotOpen && (
          <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-t-2xl w-full h-[80%] border-t border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col relative overflow-hidden animate-slide-up">
              
              {/* Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-teal-500/10 to-orange-500/10 dark:from-teal-950/20 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-teal-500 animate-float" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">AI HR Copilot</h3>
                    <p className="text-[9px] text-slate-500">Context: Screen = {activeTab.toUpperCase()} | Persona = {role.toUpperCase()}</p>
                  </div>
                </div>
                <button onClick={() => setCopilotOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={18} />
                </button>
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl p-3 text-xs shadow-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-teal-500 text-white rounded-br-none"
                        : "bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800/80 rounded-bl-none"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggestions shortcuts */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap gap-1.5 justify-center">
                <button 
                  onClick={() => handlePredefinedQuestion("Am I eligible for weekend comp-off leaves?")}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-2.5 py-1 text-[9px] font-semibold text-slate-600 hover:border-teal-500 dark:text-slate-400"
                >
                  Comp-off leaves?
                </button>
                <button 
                  onClick={() => handlePredefinedQuestion("Explain the daily travel expense reimbursement policy.")}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-2.5 py-1 text-[9px] font-semibold text-slate-600 hover:border-teal-500 dark:text-slate-400"
                >
                  Travel policy limit?
                </button>
                <button 
                  onClick={() => handlePredefinedQuestion("What is my onboarding checklist status?")}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-2.5 py-1 text-[9px] font-semibold text-slate-600 hover:border-teal-500 dark:text-slate-400"
                >
                  Onboarding status?
                </button>
              </div>

              {/* Text Form Input */}
              <form onSubmit={sendChatMessage} className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-white dark:bg-slate-900">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a question about HR policies..."
                  className="flex-1 p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                />
                <button type="submit" className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600 shadow">
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
