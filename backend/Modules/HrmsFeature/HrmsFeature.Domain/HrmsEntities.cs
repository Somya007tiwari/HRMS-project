using HRMS.Core.Postgres.Common;

namespace HrmsFeature.Domain
{
    public class OnboardingTask : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Phase { get; set; } = "pre-joining";
        public string DueDate { get; set; } = string.Empty;
        public string Priority { get; set; } = "medium";
        public string Assignee { get; set; } = string.Empty;
        public string Status { get; set; } = "pending";
        public string? CompletedDate { get; set; }
    }

    public class AttendanceRecord : BaseEntity
    {
        public string Date { get; set; } = string.Empty;
        public string ClockIn { get; set; } = string.Empty;
        public string? ClockOut { get; set; }
        public string Method { get; set; } = "Selfie";
        public string Status { get; set; } = "Present";
        public string Location { get; set; } = string.Empty;
        public string Ip { get; set; } = string.Empty;
        public bool IsLocationVerified { get; set; }
        public bool IsIpValidated { get; set; }
        public double? ProductiveHours { get; set; }
        public double? BreakHours { get; set; }
        public double? OvertimeHours { get; set; }
    }

    public class LeaveRequest : BaseEntity
    {
        public string EmployeeName { get; set; } = string.Empty;
        public string LeaveType { get; set; } = string.Empty;
        public string StartDate { get; set; } = string.Empty;
        public string EndDate { get; set; } = string.Empty;
        public double TotalDays { get; set; }
        public string Reason { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending";
        public string? ApproverComments { get; set; }
        public string ApprovalFlowJson { get; set; } = "[]";
    }

    public class LeaveBalance : BaseEntity
    {
        public string Type { get; set; } = string.Empty;
        public double Allowed { get; set; }
        public double Used { get; set; }
        public double Pending { get; set; }
        public double Available { get; set; }
        public double CarriedForward { get; set; }
        public double Encashed { get; set; }
    }

    public class ExpenseClaim : BaseEntity
    {
        public string EmployeeName { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public double Amount { get; set; }
        public string Currency { get; set; } = "INR";
        public string Description { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string? ReceiptUrl { get; set; }
        public string Status { get; set; } = "Pending-Approval";
        public string? MileageJson { get; set; }
        public string PolicyValidationJson { get; set; } = "{}";
        public string? ApproverComments { get; set; }
        public string? PaidDate { get; set; }
    }

    public class Goal : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = "individual";
        public string Type { get; set; } = "quarterly";
        public double Weight { get; set; }
        public double Progress { get; set; }
        public string DueDate { get; set; } = string.Empty;
        public string Status { get; set; } = "not-started";
        public string KeyResultsJson { get; set; } = "[]";
    }

    public class ContributionItem : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public double Points { get; set; }
        public double SuggestedPoints { get; set; }
        public string Impact { get; set; } = "medium";
        public string? Evidence { get; set; }
        public string Status { get; set; } = "draft";
        public string? ClaimedBy { get; set; }
        public string? ApproverComments { get; set; }
    }

    public class TrainingModule : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public string DueDate { get; set; } = string.Empty;
        public bool IsMandatory { get; set; }
        public bool IsCertificateEligible { get; set; }
        public double Progress { get; set; }
        public string Status { get; set; } = "not-started";
        public string ContentItemsJson { get; set; } = "[]";
        public string? CertificateUrl { get; set; }
    }

    public class JobPosting : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Type { get; set; } = "Full-Time";
        public string Experience { get; set; } = string.Empty;
        public string SalaryRange { get; set; } = string.Empty;
        public string RequirementsJson { get; set; } = "[]";
        public string ResponsibilitiesJson { get; set; } = "[]";
        public string Status { get; set; } = "active";
        public int ApplicantsCount { get; set; }
        public int ShortlistedCount { get; set; }
        public int InterviewingCount { get; set; }
    }

    public class Candidate : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string AppliedRole { get; set; } = string.Empty;
        public string JobId { get; set; } = string.Empty;
        public string Status { get; set; } = "new";
        public double Rating { get; set; }
        public string SkillsJson { get; set; } = "[]";
        public string Experience { get; set; } = string.Empty;
        public string ExpectedSalary { get; set; } = string.Empty;
        public string NoticePeriod { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public string? InterviewDate { get; set; }
        public string? InterviewTime { get; set; }
    }

    public class Recognition : BaseEntity
    {
        public string SenderName { get; set; } = string.Empty;
        public string SenderAvatar { get; set; } = string.Empty;
        public string RecipientName { get; set; } = string.Empty;
        public string RecipientAvatar { get; set; } = string.Empty;
        public string Category { get; set; } = "excellence";
        public string Message { get; set; } = string.Empty;
        public bool IsPrivate { get; set; }
        public int LikesCount { get; set; }
        public string LikedByMeJson { get; set; } = "[]";
        public string CommentsJson { get; set; } = "[]";
        public string Date { get; set; } = string.Empty;
    }

    public class Announcement : BaseEntity
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Category { get; set; } = "general";
        public string Priority { get; set; } = "medium";
        public string VisibilityScope { get; set; } = "global";
        public string TargetAudience { get; set; } = "All Employees";
        public string Date { get; set; } = string.Empty;
        public string? ExpiryDate { get; set; }
        public int ViewsCount { get; set; }
        public int LikesCount { get; set; }
        public string LikedByMeJson { get; set; } = "[]";
        public string AcknowledgedByMeJson { get; set; } = "[]";
        public int AcknowledgmentsCount { get; set; }
        public int CommentsCount { get; set; }
    }
}
