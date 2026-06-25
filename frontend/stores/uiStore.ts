import { create } from "zustand";

export type RoleType = "employee" | "manager" | "hr" | "admin";

export interface OnboardingTask {
	id: string;
	title: string;
	description: string;
	phase: "pre-joining" | "day-1" | "week-1" | "week-2" | "month-1";
	dueDate: string;
	priority: "high" | "medium" | "low";
	assignee: string;
	status: "completed" | "pending";
	completedDate?: string;
}

export interface WelcomeMessage {
	id: string;
	sender: string;
	role: string;
	message: string;
	avatar: string;
	videoUrl?: string;
}

export interface AttendanceRecord {
	id: string;
	date: string;
	clockIn: string;
	clockOut?: string;
	method: "Selfie" | "Biometric" | "Manual" | "IP/Location";
	status: "Present" | "Absent" | "Late" | "Half-Day" | "On-Leave";
	location: string;
	ip: string;
	isLocationVerified: boolean;
	isIpValidated: boolean;
	productiveHours?: number;
	breakHours?: number;
	overtimeHours?: number;
}

export interface LeaveRequest {
	id: string;
	employeeName: string;
	leaveType: string;
	startDate: string;
	endDate: string;
	totalDays: number;
	reason: string;
	status: "Pending" | "Approved" | "Rejected" | "Cancelled";
	approverComments?: string;
	approvalFlow: { step: string; status: "Pending" | "Approved" | "Rejected"; approver: string }[];
}

export interface LeaveBalance {
	type: string;
	allowed: number;
	used: number;
	pending: number;
	available: number;
	carriedForward: number;
	encashed: number;
}

export interface ExpenseClaim {
	id: string;
	employeeName: string;
	category: string;
	amount: number;
	currency: string;
	description: string;
	date: string;
	receiptUrl?: string;
	status: "Draft" | "Submitted" | "Pending-Approval" | "Approved" | "Rejected" | "Paid";
	mileage?: {
		distance: number;
		from: string;
		to: string;
		ratePerKm: number;
		amount: number;
	};
	policyValidation: {
		withinLimit: boolean;
		receiptRequired: boolean;
		message: string;
	};
	approverComments?: string;
	paidDate?: string;
}

export interface Goal {
	id: string;
	title: string;
	description: string;
	category: "individual" | "team" | "departmental" | "organizational";
	type: "quarterly" | "annual" | "project";
	weight: number; // percentage
	progress: number; // percentage
	dueDate: string;
	status: "not-started" | "in-progress" | "on-track" | "at-risk" | "completed" | "cancelled";
	keyResults: { id: string; title: string; target: number; current: number; isCompleted: boolean }[];
}

export interface PerformanceReview {
	id: string;
	period: string;
	type: string;
	overallRating: number;
	categoryRatings: { category: string; rating: number; feedback: string }[];
	strengths: string[];
	improvements: string[];
	recommendations: string;
	employeeComments?: string;
	goalsAchievedCount: number;
	totalGoalsCount: number;
}

export interface ContributionItem {
	id: string;
	title: string;
	description: string;
	category: string;
	points: number;
	suggestedPoints: number;
	impact: "high" | "medium" | "low";
	evidence?: string;
	status: "draft" | "proposal-pending" | "approved-to-start" | "in-progress" | "under-review" | "completed" | "rejected";
	claimedBy?: string;
	approverComments?: string;
}

export interface LeaderboardUser {
	id: string;
	name: string;
	points: number;
	avatar: string;
	rank: number;
	badges: string[];
	averageRating: number;
}

export interface TrainingModule {
	id: string;
	title: string;
	category: string;
	duration: string;
	dueDate: string;
	isMandatory: boolean;
	isCertificateEligible: boolean;
	progress: number; // 0 to 100
	status: "not-started" | "in-progress" | "completed";
	contentItems: { id: string; title: string; type: "video" | "document" | "quiz"; isCompleted: boolean }[];
	certificateUrl?: string;
}

export interface JobPosting {
	id: string;
	title: string;
	department: string;
	location: string;
	type: string;
	experience: string;
	salaryRange: string;
	requirements: string[];
	responsibilities: string[];
	status: "active" | "draft" | "closed";
	applicantsCount: number;
	shortlistedCount: number;
	interviewingCount: number;
}

export interface Candidate {
	id: string;
	name: string;
	appliedRole: string;
	jobId: string;
	status: "new" | "screening" | "shortlisted" | "interview-scheduled" | "interviewed" | "offer-extended" | "hired" | "rejected";
	rating: number;
	skills: string[];
	experience: string;
	expectedSalary: string;
	noticePeriod: string;
	notes: string;
	interviewDate?: string;
	interviewTime?: string;
}

export interface Recognition {
	id: string;
	senderName: string;
	senderAvatar: string;
	recipientName: string;
	recipientAvatar: string;
	category: "excellence" | "team-player" | "innovation" | "leadership" | "customer-focus";
	message: string;
	isPrivate: boolean;
	likesCount: number;
	likedByMe?: boolean;
	comments: { id: string; author: string; avatar: string; message: string; date: string }[];
	date: string;
}

export interface Announcement {
	id: string;
	title: string;
	content: string;
	category: "hr-update" | "event" | "policy" | "celebration" | "compliance" | "general";
	priority: "high" | "medium" | "low";
	visibilityScope: "global" | "department" | "location";
	targetAudience: string;
	date: string;
	expiryDate?: string;
	viewsCount: number;
	likesCount: number;
	likedByMe?: boolean;
	acknowledgedByMe?: boolean;
	acknowledgmentsCount: number;
	commentsCount: number;
}

interface UiState {
	isSidebarOpen: boolean;
	role: RoleType;
	activeTab: string;
	currentView: string;
	isOnboarding: boolean;

	// Onboarding State
	onboardingTasks: OnboardingTask[];
	welcomeMessages: WelcomeMessage[];
	relocationTickets: { id: string; subject: string; status: string; date: string }[];

	// Attendance State
	attendanceLogs: AttendanceRecord[];
	isClockedIn: boolean;
	currentClockInRecord: AttendanceRecord | null;

	// Leave State
	leaveBalances: LeaveBalance[];
	leaveRequests: LeaveRequest[];

	// Expense State
	expenseClaims: ExpenseClaim[];

	// Performance State
	goals: Goal[];
	performanceReviews: PerformanceReview[];

	// Contributions State
	contributions: ContributionItem[];
	contributionCatalog: ContributionItem[];
	leaderboard: LeaderboardUser[];

	// Training State
	trainingModules: TrainingModule[];

	// Recruitment State
	jobPostings: JobPosting[];
	candidates: Candidate[];

	// Recognition State
	recognitions: Recognition[];

	// Announcements State
	announcements: Announcement[];

	// Core Actions
	openSidebar: () => void;
	closeSidebar: () => void;
	toggleSidebar: () => void;
	setRole: (role: RoleType) => void;
	setActiveTab: (tab: string) => void;
	setCurrentView: (view: string) => void;
	setIsOnboarding: (isOnboarding: boolean) => void;

	// Operations
	toggleOnboardingTask: (id: string) => void;
	clockIn: (method: "Selfie" | "Biometric" | "Manual" | "IP/Location", selfieUrl?: string) => void;
	clockOut: () => void;
	addLeaveRequest: (req: Omit<LeaveRequest, "id" | "employeeName" | "status" | "approvalFlow">) => void;
	approveLeaveRequest: (id: string, comments?: string, role?: RoleType) => void;
	rejectLeaveRequest: (id: string, comments?: string, role?: RoleType) => void;
	addExpenseClaim: (claim: Omit<ExpenseClaim, "id" | "employeeName" | "status" | "policyValidation">) => void;
	approveExpenseClaim: (id: string, comments?: string) => void;
	rejectExpenseClaim: (id: string, comments?: string) => void;
	addGoal: (goal: Omit<Goal, "id" | "progress" | "status">) => void;
	updateGoalProgress: (id: string, progress: number) => void;
	claimContributionItem: (id: string, userName: string) => void;
	approveContribution: (id: string, points: number, comments?: string) => void;
	completeCourseModule: (moduleId: string, contentId: string) => void;
	addJobPosting: (job: Omit<JobPosting, "id" | "applicantsCount" | "shortlistedCount" | "interviewingCount">) => void;
	updateCandidateStatus: (id: string, status: Candidate["status"]) => void;
	scheduleInterview: (id: string, date: string, time: string) => void;
	addRecognition: (rec: Omit<Recognition, "id" | "senderName" | "senderAvatar" | "likesCount" | "comments" | "date">) => void;
	likeRecognition: (id: string) => void;
	addCommentToRecognition: (id: string, message: string, author: string, avatar: string) => void;
	acknowledgeAnnouncement: (id: string) => void;
	addAnnouncement: (ann: Omit<Announcement, "id" | "date" | "viewsCount" | "likesCount" | "acknowledgmentsCount" | "commentsCount" | "likedByMe" | "acknowledgedByMe">) => void;
}

export const useUiStore = create<UiState>((set) => ({
	isSidebarOpen: false,
	role: "employee",
	activeTab: "home",
	currentView: "dashboard",
	isOnboarding: true,

	onboardingTasks: [
		{ id: "ot-1", title: "Submit Bank Details", description: "Provide routing and account details for payroll.", phase: "pre-joining", dueDate: "2026-06-25", priority: "high", assignee: "Alex (New Joiner)", status: "pending" },
		{ id: "ot-2", title: "Upload Identity Verification Documents", description: "Upload passport and national ID card scan.", phase: "pre-joining", dueDate: "2026-06-25", priority: "high", assignee: "Alex (New Joiner)", status: "pending" },
		{ id: "ot-3", title: "Sign Employment Agreement", description: "Sign the offer letter contract online.", phase: "pre-joining", dueDate: "2026-06-24", priority: "high", assignee: "Alex (New Joiner)", status: "completed", completedDate: "2026-06-24" },
		{ id: "ot-4", title: "Complete Security Compliance Quiz", description: "Mandatory quiz on basic security controls.", phase: "day-1", dueDate: "2026-06-26", priority: "high", assignee: "Alex (New Joiner)", status: "pending" },
		{ id: "ot-5", title: "Buddy Introduction Meeting", description: "Meet with your designated onboarding buddy.", phase: "week-1", dueDate: "2026-06-30", priority: "medium", assignee: "Alex (New Joiner)", status: "pending" },
	],

	welcomeMessages: [
		{ id: "w-1", sender: "Jane Doe", role: "CEO", message: "Welcome to WorkFlow! We are excited to have you join our team and build the future of HR software.", avatar: "👩‍💼" },
		{ id: "w-2", sender: "Michael Vance", role: "Engineering Manager", message: "Hi Alex! Ready to check out the backend architecture? Excited to have you on board.", avatar: "👨‍💻" },
		{ id: "w-3", sender: "Sarah Smith", role: "HR Specialist", message: "Hello! I am your HR buddy. Ping me anytime if you face difficulties in documents or onboarding.", avatar: "👩‍⚕️" },
	],

	relocationTickets: [
		{ id: "t-1", subject: "Temporary Housing Allocation", status: "Resolved", date: "2026-06-20" },
		{ id: "t-2", subject: "Flight Rebooking - Visa Delay", status: "In-Progress", date: "2026-06-23" },
	],

	attendanceLogs: [
		{ id: "a-1", date: "2026-06-23", clockIn: "09:02 AM", clockOut: "06:05 PM", method: "Selfie", status: "Present", location: "Noida, India", ip: "192.168.1.42", isLocationVerified: true, isIpValidated: true, productiveHours: 8.2, breakHours: 0.8, overtimeHours: 0.2 },
		{ id: "a-2", date: "2026-06-24", clockIn: "08:58 AM", clockOut: "05:55 PM", method: "Selfie", status: "Present", location: "Noida, India", ip: "192.168.1.42", isLocationVerified: true, isIpValidated: true, productiveHours: 8.0, breakHours: 0.9, overtimeHours: 0 },
	],
	isClockedIn: false,
	currentClockInRecord: null,

	leaveBalances: [
		{ type: "Casual Leave", allowed: 12, used: 2, pending: 1, available: 9, carriedForward: 0, encashed: 0 },
		{ type: "Sick Leave", allowed: 8, used: 1, pending: 0, available: 7, carriedForward: 0, encashed: 0 },
		{ type: "Personal Leave", allowed: 5, used: 0, pending: 0, available: 5, carriedForward: 0, encashed: 0 },
		{ type: "Comp-off", allowed: 3, used: 1, pending: 0, available: 2, carriedForward: 1, encashed: 0 },
	],

	leaveRequests: [
		{
			id: "lv-1",
			employeeName: "Sarah Connor",
			leaveType: "Casual Leave",
			startDate: "2026-07-10",
			endDate: "2026-07-12",
			totalDays: 2,
			reason: "Family event in hometown",
			status: "Approved",
			approvalFlow: [
				{ step: "Manager Level", status: "Approved", approver: "Michael Vance" },
				{ step: "HR Level", status: "Approved", approver: "Sarah Smith" }
			]
		},
		{
			id: "lv-2",
			employeeName: "John Doe",
			leaveType: "Sick Leave",
			startDate: "2026-06-28",
			endDate: "2026-06-29",
			totalDays: 1,
			reason: "Dental extraction",
			status: "Pending",
			approvalFlow: [
				{ step: "Manager Level", status: "Pending", approver: "Michael Vance" },
				{ step: "HR Level", status: "Pending", approver: "Sarah Smith" }
			]
		}
	],

	expenseClaims: [
		{
			id: "ex-1",
			employeeName: "Sarah Connor",
			category: "travel",
			amount: 1500,
			currency: "INR",
			description: "Client onsite visit travel fare",
			date: "2026-06-20",
			status: "Paid",
			policyValidation: { withinLimit: true, receiptRequired: true, message: "Valid claim" },
			paidDate: "2026-06-22"
		},
		{
			id: "ex-2",
			employeeName: "John Doe",
			category: "communication",
			amount: 50,
			currency: "USD",
			description: "Monthly broadband allowance reimbursement",
			date: "2026-06-24",
			status: "Pending-Approval",
			policyValidation: { withinLimit: true, receiptRequired: false, message: "No receipt required below $60" }
		}
	],

	goals: [
		{
			id: "g-1",
			title: "Design Next-Gen HRMS Dashboard",
			description: "Create high-fidelity screens and implement mobile layout structure in Next.js",
			category: "individual",
			type: "quarterly",
			weight: 40,
			progress: 75,
			dueDate: "2026-06-30",
			status: "on-track",
			keyResults: [
				{ id: "kr-1", title: "Develop layout shell and role-based bottom bar", target: 100, current: 100, isCompleted: true },
				{ id: "kr-2", title: "Design components for Onboarding and Attendance", target: 100, current: 80, isCompleted: false },
				{ id: "kr-3", title: "Conduct user validation on interactions", target: 100, current: 40, isCompleted: false }
			]
		},
		{
			id: "g-2",
			title: "Database PostgreSQL Optimization",
			description: "Indexes optimization on high volume audit log tables in .NET",
			category: "team",
			type: "annual",
			weight: 30,
			progress: 100,
			dueDate: "2026-09-30",
			status: "completed",
			keyResults: [
				{ id: "kr-4", title: "Add database index on UserContext properties", target: 1, current: 1, isCompleted: true }
			]
		}
	],

	performanceReviews: [
		{
			id: "r-1",
			period: "Q1 - 2026",
			type: "Quarterly Review",
			overallRating: 4.5,
			categoryRatings: [
				{ category: "Code Quality", rating: 4.8, feedback: "Exceptional architecture, follows clean code practices" },
				{ category: "Collaboration", rating: 4.2, feedback: "Highly active team player; helps juniors resolve blocks" },
				{ category: "Punctuality", rating: 4.5, feedback: "Consistent attendance and timely task deliverables" }
			],
			strengths: ["Clean Code Practices", "Problem Solving", "Proactive System Monitoring"],
			improvements: ["Documentation detailing modular dependencies", "Client facing presentations"],
			recommendations: "Promote to Senior Full Stack Engineer in next appraisal cycle",
			goalsAchievedCount: 4,
			totalGoalsCount: 5
		}
	],

	contributions: [
		{ id: "c-1", title: "Refactored Core Database Migration Helper", description: "Bypassed EF Core timeout errors under load, saving startup delay", category: "innovation", points: 80, suggestedPoints: 80, impact: "high", evidence: "PR #211", status: "completed", claimedBy: "John Doe" }
	],

	contributionCatalog: [
		{ id: "cc-1", title: "Write API Documentation", description: "Create comprehensive Swagger/Voyager documentation for GraphQL modules", category: "quality", points: 50, suggestedPoints: 50, impact: "medium", status: "draft" },
		{ id: "cc-2", title: "Automated Cypress Integration Tests", description: "Add end-to-end user path simulation in frontend pipeline", category: "innovation", points: 120, suggestedPoints: 100, impact: "high", status: "draft" }
	],

	leaderboard: [
		{ id: "u-1", name: "Sarah Connor", points: 420, avatar: "👩‍🚀", rank: 1, badges: ["Tech Guru", "Superstar"], averageRating: 4.8 },
		{ id: "u-2", name: "John Doe", points: 310, avatar: "👨‍🚀", rank: 2, badges: ["Fast Learner"], averageRating: 4.6 },
		{ id: "u-3", name: "Alex (New Joiner)", points: 80, avatar: "👨‍🎓", rank: 3, badges: ["Rising Star"], averageRating: 4.2 },
	],

	trainingModules: [
		{
			id: "tr-1",
			title: "Global HR Compliance and Anti-Harassment",
			category: "compliance",
			duration: "45 mins",
			dueDate: "2026-06-28",
			isMandatory: true,
			isCertificateEligible: true,
			progress: 60,
			status: "in-progress",
			contentItems: [
				{ id: "trc-1", title: "Introduction video to core policies", type: "video", isCompleted: true },
				{ id: "trc-2", title: "Statutory laws and regulations guide", type: "document", isCompleted: true },
				{ id: "trc-3", title: "Scenario assessment quiz", type: "quiz", isCompleted: false }
			]
		},
		{
			id: "tr-2",
			title: "GraphQL APIs with HotChocolate",
			category: "technical",
			duration: "2 hours",
			dueDate: "2026-07-15",
			isMandatory: false,
			isCertificateEligible: true,
			progress: 0,
			status: "not-started",
			contentItems: [
				{ id: "trc-4", title: "GraphQL schema design patterns", type: "document", isCompleted: false },
				{ id: "trc-5", title: "Query resolver tuning guidelines", type: "video", isCompleted: false }
			]
		}
	],

	jobPostings: [
		{ id: "jp-1", title: "Senior .NET Core Developer", department: "Engineering", location: "Remote / Noida", type: "Full-Time", experience: "5+ Years", salaryRange: "₹15L - ₹24L", requirements: ["C# .NET 9/10", "PostgreSQL", "HotChocolate GraphQL", "Microservices Architecture"], responsibilities: ["Maintain API layers", "Develop scalable micro-modules", "Ensure strict RBAC configurations"], status: "active", applicantsCount: 28, shortlistedCount: 8, interviewingCount: 4 },
		{ id: "jp-2", title: "Next.js Frontend Engineer", department: "Engineering", location: "Bangalore", type: "Full-Time", experience: "3+ Years", salaryRange: "₹12L - ₹18L", requirements: ["React 19", "Next.js App Router", "Tailwind CSS", "Zustand / Redux"], responsibilities: ["Develop responsive UI frames", "Integrate GraphQL schemas", "Implement custom micro-animations"], status: "active", applicantsCount: 42, shortlistedCount: 12, interviewingCount: 6 }
	],

	candidates: [
		{ id: "cd-1", name: "David Vance", appliedRole: "Senior .NET Core Developer", jobId: "jp-1", status: "interview-scheduled", rating: 4.2, skills: ["C#", "SQL Server", "GraphQL"], experience: "6 Years", expectedSalary: "₹20L", noticePeriod: "30 Days", notes: "Technically strong in API gateway patterns. Friendly, strong communication skills.", interviewDate: "2026-06-25", interviewTime: "11:00 AM" },
		{ id: "cd-2", name: "Jessica Alba", appliedRole: "Next.js Frontend Engineer", jobId: "jp-2", status: "screening", rating: 3.8, skills: ["React", "CSS", "Tailwind"], experience: "3 Years", expectedSalary: "₹14L", noticePeriod: "15 Days", notes: "Creative UI portfolio, highly interactive designs. Needs screening call check on Next.js hydration principles." }
	],

	recognitions: [
		{
			id: "rcg-1",
			senderName: "Michael Vance",
			senderAvatar: "👨‍💻",
			recipientName: "John Doe",
			recipientAvatar: "👨‍🚀",
			category: "excellence",
			message: "Superb job optimizing the PostgreSQL connection pools! Database queries are load testing with double performance.",
			isPrivate: false,
			likesCount: 14,
			likedByMe: true,
			comments: [
				{ id: "cm-1", author: "Sarah Connor", avatar: "👩‍🚀", message: "Indeed, noticed the fast screen rendering on my local machine!", date: "2026-06-24" }
			],
			date: "2026-06-24"
		}
	],

	announcements: [
		{
			id: "an-1",
			title: "Performance Appraisal Appraisals Q2 2026",
			content: "We are initiating our quarterly self-appraisal cycle. Please ensure your OKRs are up to date and self-reviews are completed on the performance tab before June 30th.",
			category: "hr-update",
			priority: "high",
			visibilityScope: "global",
			targetAudience: "All Employees",
			date: "2026-06-24",
			viewsCount: 88,
			likesCount: 22,
			likedByMe: false,
			acknowledgedByMe: false,
			acknowledgmentsCount: 35,
			commentsCount: 2
		},
		{
			id: "an-2",
			title: "Updated IT Asset Management & Security Policy",
			content: "Please ensure your work laptops are updated with the latest security definitions. Verify compliance with remote work configurations by running the IT diagnostic test.",
			category: "compliance",
			priority: "high",
			visibilityScope: "global",
			targetAudience: "All Employees",
			date: "2026-06-23",
			viewsCount: 104,
			likesCount: 12,
			likedByMe: true,
			acknowledgedByMe: true,
			acknowledgmentsCount: 94,
			commentsCount: 0
		}
	],

	openSidebar: () => set({ isSidebarOpen: true }),
	closeSidebar: () => set({ isSidebarOpen: false }),
	toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
	setRole: (role) => set({ role }),
	setActiveTab: (activeTab) => set({ activeTab, currentView: "dashboard" }),
	setCurrentView: (currentView) => set({ currentView }),
	setIsOnboarding: (isOnboarding) => set({ isOnboarding }),

	toggleOnboardingTask: (id) =>
		set((s) => ({
			onboardingTasks: s.onboardingTasks.map((t) =>
				t.id === id
					? {
							...t,
							status: t.status === "completed" ? "pending" : "completed",
							completedDate: t.status === "pending" ? new Date().toISOString().split("T")[0] : undefined,
					  }
					: t
			),
		})),

	clockIn: (method, selfieUrl) =>
		set((s) => {
			const now = new Date();
			const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
			const record: AttendanceRecord = {
				id: `att-${Date.now()}`,
				date: now.toISOString().split("T")[0],
				clockIn: timeString,
				method,
				status: "Present",
				location: "Noida, India (Simulated)",
				ip: "192.168.1.100",
				isLocationVerified: true,
				isIpValidated: true,
			};
			return {
				isClockedIn: true,
				currentClockInRecord: record,
				attendanceLogs: [record, ...s.attendanceLogs],
			};
		}),

	clockOut: () =>
		set((s) => {
			if (!s.currentClockInRecord) return {};
			const now = new Date();
			const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
			const updated = {
				...s.currentClockInRecord,
				clockOut: timeString,
				productiveHours: 8.5,
				breakHours: 0.5,
			};
			return {
				isClockedIn: false,
				currentClockInRecord: null,
				attendanceLogs: s.attendanceLogs.map((a) => (a.id === s.currentClockInRecord!.id ? updated : a)),
			};
		}),

	addLeaveRequest: (req) =>
		set((s) => {
			const record: LeaveRequest = {
				...req,
				id: `lv-${Date.now()}`,
				employeeName: "Alex (New Joiner)",
				status: "Pending",
				approvalFlow: [
					{ step: "Manager Level", status: "Pending", approver: "Michael Vance" },
					{ step: "HR Level", status: "Pending", approver: "Sarah Smith" }
				]
			};

			// Deduct from pending balance
			const updatedBalances = s.leaveBalances.map((b) =>
				b.type === req.leaveType
					? { ...b, pending: b.pending + req.totalDays, available: Math.max(0, b.available - req.totalDays) }
					: b
			);

			return {
				leaveRequests: [record, ...s.leaveRequests],
				leaveBalances: updatedBalances,
			};
		}),

	approveLeaveRequest: (id, comments, role) =>
		set((s) => {
			const request = s.leaveRequests.find((r) => r.id === id);
			if (!request) return {};

			const updatedFlow = request.approvalFlow.map((step) => {
				if (role === "manager" && step.step === "Manager Level") {
					return { ...step, status: "Approved" as const };
				}
				if (role === "hr" && step.step === "HR Level") {
					return { ...step, status: "Approved" as const };
				}
				return step;
			});

			const allApproved = updatedFlow.every((step) => step.status === "Approved");
			const finalStatus = allApproved ? ("Approved" as const) : ("Pending" as const);

			let updatedBalances = s.leaveBalances;
			if (allApproved) {
				updatedBalances = s.leaveBalances.map((b) =>
					b.type === request.leaveType
						? { ...b, pending: Math.max(0, b.pending - request.totalDays), used: b.used + request.totalDays }
						: b
				);
			}

			return {
				leaveRequests: s.leaveRequests.map((r) =>
					r.id === id ? { ...r, status: finalStatus, approvalFlow: updatedFlow, approverComments: comments } : r
				),
				leaveBalances: updatedBalances,
			};
		}),

	rejectLeaveRequest: (id, comments, role) =>
		set((s) => {
			const request = s.leaveRequests.find((r) => r.id === id);
			if (!request) return {};

			const updatedFlow = request.approvalFlow.map((step) => {
				if (role === "manager" && step.step === "Manager Level") {
					return { ...step, status: "Rejected" as const };
				}
				if (role === "hr" && step.step === "HR Level") {
					return { ...step, status: "Rejected" as const };
				}
				return step;
			});

			// Revert balances
			const updatedBalances = s.leaveBalances.map((b) =>
				b.type === request.leaveType
					? { ...b, pending: Math.max(0, b.pending - request.totalDays), available: b.available + request.totalDays }
					: b
			);

			return {
				leaveRequests: s.leaveRequests.map((r) =>
					r.id === id ? { ...r, status: "Rejected" as const, approvalFlow: updatedFlow, approverComments: comments } : r
				),
				leaveBalances: updatedBalances,
			};
		}),

	addExpenseClaim: (claim) =>
		set((s) => {
			const withinLimit = claim.amount <= (claim.category === "food" ? 1000 : 5000);
			const receiptRequired = claim.amount > 500;
			const newClaim: ExpenseClaim = {
				...claim,
				id: `ex-${Date.now()}`,
				employeeName: "Alex (New Joiner)",
				status: "Pending-Approval",
				policyValidation: {
					withinLimit,
					receiptRequired,
					message: withinLimit ? "Within daily department spending policy." : "Warning: Exceeds standard budget limit, requires VP approval."
				}
			};
			return {
				expenseClaims: [newClaim, ...s.expenseClaims],
			};
		}),

	approveExpenseClaim: (id, comments) =>
		set((s) => ({
			expenseClaims: s.expenseClaims.map((e) =>
				e.id === id ? { ...e, status: "Approved", approverComments: comments } : e
			)
		})),

	rejectExpenseClaim: (id, comments) =>
		set((s) => ({
			expenseClaims: s.expenseClaims.map((e) =>
				e.id === id ? { ...e, status: "Rejected", approverComments: comments } : e
			)
		})),

	addGoal: (goal) =>
		set((s) => ({
			goals: [
				{
					...goal,
					id: `g-${Date.now()}`,
					progress: 0,
					status: "not-started"
				},
				...s.goals
			]
		})),

	updateGoalProgress: (id, progress) =>
		set((s) => ({
			goals: s.goals.map((g) => {
				if (g.id !== id) return g;
				const status = progress === 100 ? "completed" : progress > 80 ? "on-track" : "in-progress";
				return { ...g, progress, status };
			})
		})),

	claimContributionItem: (id, userName) =>
		set((s) => {
			const item = s.contributionCatalog.find((c) => c.id === id);
			if (!item) return {};
			const claimed: ContributionItem = {
				...item,
				status: "approved-to-start",
				claimedBy: userName
			};
			return {
				contributionCatalog: s.contributionCatalog.filter((c) => c.id !== id),
				contributions: [claimed, ...s.contributions]
			};
		}),

	approveContribution: (id, points, comments) =>
		set((s) => {
			const contr = s.contributions.find((c) => c.id === id);
			if (!contr) return {};
			const updated = s.contributions.map((c) =>
				c.id === id ? { ...c, status: "completed" as const, points, approverComments: comments } : c
			);

			// Add to leaderboard score
			const updatedLeaderboard = s.leaderboard.map((u) =>
				u.name === contr.claimedBy
					? { ...u, points: u.points + points }
					: u
			);

			return {
				contributions: updated,
				leaderboard: updatedLeaderboard
			};
		}),

	completeCourseModule: (moduleId, contentId) =>
		set((s) => {
			const module = s.trainingModules.find((m) => m.id === moduleId);
			if (!module) return {};

			const updatedContent = module.contentItems.map((item) =>
				item.id === contentId ? { ...item, isCompleted: true } : item
			);

			const completedCount = updatedContent.filter((c) => c.isCompleted).length;
			const progress = Math.round((completedCount / updatedContent.length) * 100);
			const status = progress === 100 ? "completed" as const : "in-progress" as const;
			const certificateUrl = status === "completed" && module.isCertificateEligible ? `/certificates/${moduleId}.pdf` : undefined;

			return {
				trainingModules: s.trainingModules.map((m) =>
					m.id === moduleId ? { ...m, contentItems: updatedContent, progress, status, certificateUrl } : m
				)
			};
		}),

	addJobPosting: (job) =>
		set((s) => ({
			jobPostings: [
				{
					...job,
					id: `jp-${Date.now()}`,
					applicantsCount: 0,
					shortlistedCount: 0,
					interviewingCount: 0
				},
				...s.jobPostings
			]
		})),

	updateCandidateStatus: (id, status) =>
		set((s) => {
			const cand = s.candidates.find((c) => c.id === id);
			if (!cand) return {};

			const updatedCandidates = s.candidates.map((c) =>
				c.id === id ? { ...c, status } : c
			);

			// Re-compute job applicant indicators
			const updatedJobs = s.jobPostings.map((job) => {
				if (job.id !== cand.jobId) return job;
				const candForJob = updatedCandidates.filter((c) => c.jobId === job.id);
				return {
					...job,
					shortlistedCount: candForJob.filter((c) => c.status === "shortlisted").length,
					interviewingCount: candForJob.filter((c) => c.status === "interview-scheduled" || c.status === "interviewed").length,
				};
			});

			return {
				candidates: updatedCandidates,
				jobPostings: updatedJobs
			};
		}),

	scheduleInterview: (id, date, time) =>
		set((s) => ({
			candidates: s.candidates.map((c) =>
				c.id === id ? { ...c, status: "interview-scheduled", interviewDate: date, interviewTime: time } : c
			)
		})),

	addRecognition: (rec) =>
		set((s) => ({
			recognitions: [
				{
					...rec,
					id: `rcg-${Date.now()}`,
					senderName: "Alex (New Joiner)",
					senderAvatar: "👨‍🎓",
					likesCount: 0,
					comments: [],
					date: new Date().toISOString().split("T")[0]
				},
				...s.recognitions
			]
		})),

	likeRecognition: (id) =>
		set((s) => ({
			recognitions: s.recognitions.map((r) => {
				if (r.id !== id) return r;
				const liked = !r.likedByMe;
				return {
					...r,
					likedByMe: liked,
					likesCount: liked ? r.likesCount + 1 : Math.max(0, r.likesCount - 1)
				};
			})
		})),

	addCommentToRecognition: (id, message, author, avatar) =>
		set((s) => ({
			recognitions: s.recognitions.map((r) =>
				r.id === id
					? {
							...r,
							comments: [
								...r.comments,
								{ id: `c-${Date.now()}`, author, avatar, message, date: new Date().toISOString().split("T")[0] }
							]
					  }
					: r
			)
		})),

	acknowledgeAnnouncement: (id) =>
		set((s) => ({
			announcements: s.announcements.map((a) =>
				a.id === id && !a.acknowledgedByMe
					? { ...a, acknowledgedByMe: true, acknowledgmentsCount: a.acknowledgmentsCount + 1 }
					: a
			)
		})),

	addAnnouncement: (ann) =>
		set((s) => ({
			announcements: [
				{
					...ann,
					id: `an-${Date.now()}`,
					date: new Date().toISOString().split("T")[0],
					viewsCount: 0,
					likesCount: 0,
					acknowledgmentsCount: 0,
					commentsCount: 0
				},
				...s.announcements
			]
		}))
}));



