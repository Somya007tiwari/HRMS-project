using HrmsFeature.Domain;
using HRMS.Core.Postgres.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace HrmsFeature.Infrastructure
{
    public class HrmsDbSeeder
    {
        private readonly PostgresDbContext _context;

        public HrmsDbSeeder(PostgresDbContext context)
        {
            _context = context;
        }

        public async Task SeedAsync()
        {
            // Seed Onboarding Tasks
            if (!await _context.Set<OnboardingTask>().AnyAsync())
            {
                await _context.Set<OnboardingTask>().AddRangeAsync(
                    new OnboardingTask { Id = "ot-1", Title = "Submit Bank Details", Description = "Provide routing and account details for payroll.", Phase = "pre-joining", DueDate = "2026-06-25", Priority = "high", Assignee = "Alex (New Joiner)", Status = "pending" },
                    new OnboardingTask { Id = "ot-2", Title = "Upload Identity Verification Documents", Description = "Upload passport and national ID card scan.", Phase = "pre-joining", DueDate = "2026-06-25", Priority = "high", Assignee = "Alex (New Joiner)", Status = "pending" },
                    new OnboardingTask { Id = "ot-3", Title = "Sign Employment Agreement", Description = "Sign the offer letter contract online.", Phase = "pre-joining", DueDate = "2026-06-24", Priority = "high", Assignee = "Alex (New Joiner)", Status = "completed", CompletedDate = "2026-06-24" },
                    new OnboardingTask { Id = "ot-4", Title = "Complete Security Compliance Quiz", Description = "Mandatory quiz on basic security controls.", Phase = "day-1", DueDate = "2026-06-26", Priority = "high", Assignee = "Alex (New Joiner)", Status = "pending" },
                    new OnboardingTask { Id = "ot-5", Title = "Buddy Introduction Meeting", Description = "Meet with your designated onboarding buddy.", Phase = "week-1", DueDate = "2026-06-30", Priority = "medium", Assignee = "Alex (New Joiner)", Status = "pending" }
                );
            }

            // Seed Attendance Records
            if (!await _context.Set<AttendanceRecord>().AnyAsync())
            {
                await _context.Set<AttendanceRecord>().AddRangeAsync(
                    new AttendanceRecord { Id = "a-1", Date = "2026-06-23", ClockIn = "09:02 AM", ClockOut = "06:05 PM", Method = "Selfie", Status = "Present", Location = "Noida, India", Ip = "192.168.1.42", IsLocationVerified = true, IsIpValidated = true, ProductiveHours = 8.2, BreakHours = 0.8, OvertimeHours = 0.2 },
                    new AttendanceRecord { Id = "a-2", Date = "2026-06-24", ClockIn = "08:58 AM", ClockOut = "05:55 PM", Method = "Selfie", Status = "Present", Location = "Noida, India", Ip = "192.168.1.42", IsLocationVerified = true, IsIpValidated = true, ProductiveHours = 8.0, BreakHours = 0.9, OvertimeHours = 0 }
                );
            }

            // Seed Leave Requests
            if (!await _context.Set<LeaveRequest>().AnyAsync())
            {
                var flow1 = new[]
                {
                    new { step = "Manager Level", status = "Approved", approver = "Michael Vance" },
                    new { step = "HR Level", status = "Approved", approver = "Sarah Smith" }
                };
                var flow2 = new[]
                {
                    new { step = "Manager Level", status = "Pending", approver = "Michael Vance" },
                    new { step = "HR Level", status = "Pending", approver = "Sarah Smith" }
                };

                await _context.Set<LeaveRequest>().AddRangeAsync(
                    new LeaveRequest { Id = "lv-1", EmployeeName = "Sarah Connor", LeaveType = "Casual Leave", StartDate = "2026-07-10", EndDate = "2026-07-12", TotalDays = 2, Reason = "Family event in hometown", Status = "Approved", ApprovalFlowJson = JsonSerializer.Serialize(flow1) },
                    new LeaveRequest { Id = "lv-2", EmployeeName = "John Doe", LeaveType = "Sick Leave", StartDate = "2026-06-28", EndDate = "2026-06-29", TotalDays = 1, Reason = "Dental extraction", Status = "Pending", ApprovalFlowJson = JsonSerializer.Serialize(flow2) }
                );
            }

            // Seed Leave Balances
            if (!await _context.Set<LeaveBalance>().AnyAsync())
            {
                await _context.Set<LeaveBalance>().AddRangeAsync(
                    new LeaveBalance { Id = "lb-1", Type = "Casual Leave", Allowed = 12, Used = 2, Pending = 1, Available = 9, CarriedForward = 0, Encashed = 0 },
                    new LeaveBalance { Id = "lb-2", Type = "Sick Leave", Allowed = 8, Used = 1, Pending = 0, Available = 7, CarriedForward = 0, Encashed = 0 },
                    new LeaveBalance { Id = "lb-3", Type = "Personal Leave", Allowed = 5, Used = 0, Pending = 0, Available = 5, CarriedForward = 0, Encashed = 0 },
                    new LeaveBalance { Id = "lb-4", Type = "Comp-off", Allowed = 3, Used = 1, Pending = 0, Available = 2, CarriedForward = 1, Encashed = 0 }
                );
            }

            // Seed Expense Claims
            if (!await _context.Set<ExpenseClaim>().AnyAsync())
            {
                var val1 = new { withinLimit = true, receiptRequired = true, message = "Valid claim" };
                var val2 = new { withinLimit = true, receiptRequired = false, message = "No receipt required below $60" };

                await _context.Set<ExpenseClaim>().AddRangeAsync(
                    new ExpenseClaim { Id = "ex-1", EmployeeName = "Sarah Connor", Category = "travel", Amount = 1500, Currency = "INR", Description = "Client onsite visit travel fare", Date = "2026-06-20", Status = "Paid", PolicyValidationJson = JsonSerializer.Serialize(val1), PaidDate = "2026-06-22" },
                    new ExpenseClaim { Id = "ex-2", EmployeeName = "John Doe", Category = "communication", Amount = 50, Currency = "USD", Description = "Monthly broadband allowance reimbursement", Date = "2026-06-24", Status = "Pending-Approval", PolicyValidationJson = JsonSerializer.Serialize(val2) }
                );
            }

            // Seed Goals
            if (!await _context.Set<Goal>().AnyAsync())
            {
                var kr1 = new[]
                {
                    new { id = "kr-1", title = "Develop layout shell and role-based bottom bar", target = 100, current = 100, isCompleted = true },
                    new { id = "kr-2", title = "Design components for Onboarding and Attendance", target = 100, current = 80, isCompleted = false },
                    new { id = "kr-3", title = "Conduct user validation on interactions", target = 100, current = 40, isCompleted = false }
                };
                var kr2 = new[]
                {
                    new { id = "kr-4", title = "Add database index on UserContext properties", target = 1, current = 1, isCompleted = true }
                };

                await _context.Set<Goal>().AddRangeAsync(
                    new Goal { Id = "g-1", Title = "Design Next-Gen HRMS Dashboard", Description = "Create high-fidelity screens and implement mobile layout structure in Next.js", Category = "individual", Type = "quarterly", Weight = 40, Progress = 75, DueDate = "2026-06-30", Status = "on-track", KeyResultsJson = JsonSerializer.Serialize(kr1) },
                    new Goal { Id = "g-2", Title = "Database PostgreSQL Optimization", Description = "Indexes optimization on high volume audit log tables in .NET", Category = "team", Type = "annual", Weight = 30, Progress = 100, DueDate = "2026-09-30", Status = "completed", KeyResultsJson = JsonSerializer.Serialize(kr2) }
                );
            }

            // Seed Contributions
            if (!await _context.Set<ContributionItem>().AnyAsync())
            {
                await _context.Set<ContributionItem>().AddRangeAsync(
                    new ContributionItem { Id = "c-1", Title = "Refactored Core Database Migration Helper", Description = "Bypassed EF Core timeout errors under load, saving startup delay", Category = "innovation", Points = 80, SuggestedPoints = 80, Impact = "high", Evidence = "PR #211", Status = "completed", ClaimedBy = "John Doe" },
                    new ContributionItem { Id = "cc-1", Title = "Write API Documentation", Description = "Create comprehensive Swagger/Voyager documentation for GraphQL modules", Category = "quality", Points = 50, SuggestedPoints = 50, Impact = "medium", Status = "draft" },
                    new ContributionItem { Id = "cc-2", Title = "Automated Cypress Integration Tests", Description = "Add end-to-end user path simulation in frontend pipeline", Category = "innovation", Points = 120, SuggestedPoints = 100, Impact = "high", Status = "draft" }
                );
            }

            // Seed Training Modules
            if (!await _context.Set<TrainingModule>().AnyAsync())
            {
                var content1 = new[]
                {
                    new { id = "trc-1", title = "Introduction video to core policies", type = "video", isCompleted = true },
                    new { id = "trc-2", title = "Statutory laws and regulations guide", type = "document", isCompleted = true },
                    new { id = "trc-3", title = "Scenario assessment quiz", type = "quiz", isCompleted = false }
                };
                var content2 = new[]
                {
                    new { id = "trc-4", title = "GraphQL schema design patterns", type = "document", isCompleted = false },
                    new { id = "trc-5", title = "Query resolver tuning guidelines", type = "video", isCompleted = false }
                };

                await _context.Set<TrainingModule>().AddRangeAsync(
                    new TrainingModule { Id = "tr-1", Title = "Global HR Compliance and Anti-Harassment", Category = "compliance", Duration = "45 mins", DueDate = "2026-06-28", IsMandatory = true, IsCertificateEligible = true, Progress = 60, Status = "in-progress", ContentItemsJson = JsonSerializer.Serialize(content1) },
                    new TrainingModule { Id = "tr-2", Title = "GraphQL APIs with HotChocolate", Category = "technical", Duration = "2 hours", DueDate = "2026-07-15", IsMandatory = false, IsCertificateEligible = true, Progress = 0, Status = "not-started", ContentItemsJson = JsonSerializer.Serialize(content2) }
                );
            }

            // Seed Job Postings
            if (!await _context.Set<JobPosting>().AnyAsync())
            {
                var req1 = new[] { "C# .NET 9/10", "PostgreSQL", "HotChocolate GraphQL", "Microservices Architecture" };
                var resp1 = new[] { "Maintain API layers", "Develop scalable micro-modules", "Ensure strict RBAC configurations" };
                var req2 = new[] { "React 19", "Next.js App Router", "Tailwind CSS", "Zustand / Redux" };
                var resp2 = new[] { "Develop responsive UI frames", "Integrate GraphQL schemas", "Implement custom micro-animations" };

                await _context.Set<JobPosting>().AddRangeAsync(
                    new JobPosting { Id = "jp-1", Title = "Senior .NET Core Developer", Department = "Engineering", Location = "Remote / Noida", Type = "Full-Time", Experience = "5+ Years", SalaryRange = "₹15L - ₹24L", RequirementsJson = JsonSerializer.Serialize(req1), ResponsibilitiesJson = JsonSerializer.Serialize(resp1), Status = "active", ApplicantsCount = 28, ShortlistedCount = 8, InterviewingCount = 4 },
                    new JobPosting { Id = "jp-2", Title = "Next.js Frontend Engineer", Department = "Engineering", Location = "Bangalore", Type = "Full-Time", Experience = "3+ Years", SalaryRange = "₹12L - ₹18L", RequirementsJson = JsonSerializer.Serialize(req2), ResponsibilitiesJson = JsonSerializer.Serialize(resp2), Status = "active", ApplicantsCount = 42, ShortlistedCount = 12, InterviewingCount = 6 }
                );
            }

            // Seed Candidates
            if (!await _context.Set<Candidate>().AnyAsync())
            {
                var skills1 = new[] { "C#", "SQL Server", "GraphQL" };
                var skills2 = new[] { "React", "CSS", "Tailwind" };

                await _context.Set<Candidate>().AddRangeAsync(
                    new Candidate { Id = "cd-1", Name = "David Vance", AppliedRole = "Senior .NET Core Developer", JobId = "jp-1", Status = "interview-scheduled", Rating = 4.2, SkillsJson = JsonSerializer.Serialize(skills1), Experience = "6 Years", ExpectedSalary = "₹20L", NoticePeriod = "30 Days", Notes = "Technically strong in API gateway patterns. Friendly, strong communication skills.", InterviewDate = "2026-06-25", InterviewTime = "11:00 AM" },
                    new Candidate { Id = "cd-2", Name = "Jessica Alba", AppliedRole = "Next.js Frontend Engineer", JobId = "jp-2", Status = "screening", Rating = 3.8, SkillsJson = JsonSerializer.Serialize(skills2), Experience = "3 Years", ExpectedSalary = "₹14L", NoticePeriod = "15 Days", Notes = "Creative UI portfolio, highly interactive designs. Needs screening call check on Next.js hydration principles." }
                );
            }

            // Seed Recognitions
            if (!await _context.Set<Recognition>().AnyAsync())
            {
                var comments = new[]
                {
                    new { id = "cm-1", author = "Sarah Connor", avatar = "👩‍🚀", message = "Indeed, noticed the fast screen rendering on my local machine!", date = "2026-06-24" }
                };

                await _context.Set<Recognition>().AddRangeAsync(
                    new Recognition
                    {
                        Id = "rcg-1",
                        SenderName = "Michael Vance",
                        SenderAvatar = "👨‍💻",
                        RecipientName = "John Doe",
                        RecipientAvatar = "👨‍🚀",
                        Category = "excellence",
                        Message = "Superb job optimizing the PostgreSQL connection pools! Database queries are load testing with double performance.",
                        IsPrivate = false,
                        LikesCount = 14,
                        LikedByMeJson = JsonSerializer.Serialize(new[] { "employee" }), // Liked by current employee Sarah
                        CommentsJson = JsonSerializer.Serialize(comments),
                        Date = "2026-06-24"
                    }
                );
            }

            // Seed Announcements
            if (!await _context.Set<Announcement>().AnyAsync())
            {
                await _context.Set<Announcement>().AddRangeAsync(
                    new Announcement
                    {
                        Id = "an-1",
                        Title = "Performance Appraisal Appraisals Q2 2026",
                        Content = "We are initiating our quarterly self-appraisal cycle. Please ensure your OKRs are up to date and self-reviews are completed on the performance tab before June 30th.",
                        Category = "hr-update",
                        Priority = "high",
                        VisibilityScope = "global",
                        TargetAudience = "All Employees",
                        Date = "2026-06-24",
                        ViewsCount = 88,
                        LikesCount = 22,
                        LikedByMeJson = "[]",
                        AcknowledgedByMeJson = "[]",
                        AcknowledgmentsCount = 35,
                        CommentsCount = 2
                    },
                    new Announcement
                    {
                        Id = "an-2",
                        Title = "Updated IT Asset Management & Security Policy",
                        Content = "Please ensure your work laptops are updated with the latest security definitions. Verify compliance with remote work configurations by running the IT diagnostic test.",
                        Category = "compliance",
                        Priority = "high",
                        VisibilityScope = "global",
                        TargetAudience = "All Employees",
                        Date = "2026-06-23",
                        ViewsCount = 104,
                        LikesCount = 12,
                        LikedByMeJson = "[\"employee\"]",
                        AcknowledgedByMeJson = "[\"employee\"]",
                        AcknowledgmentsCount = 94,
                        CommentsCount = 0
                    }
                );
            }

            await _context.SaveChangesAsync();
        }
    }
}
