export const defaultProfileData = {
  fullName: "Alexander Vance",
  email: "alexander.v@royalpark.lk",
  roleTitle: "Chief Facilities Director",
  workStatus: "Active",
  employmentType: "Permanent Full-Time",
  civilStatus: "Married",
  spouseFullName: "Elena Vance",
  spouseContactPhone: "+94 77 123 4567",
  numberOfChildren: 2,
  childrenDetails: [
    { name: "Lucas Vance", age: 10 },
    { name: "Sophia Vance", age: 7 },
  ],
  department: "Estate Management & Engineering",
  employeeId: "RPC-DIR-009",
  joinDate: "2019-03-15",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
};

export const defaultPayrollData = {
  annualBaseSalary: 115000,
  targetAnnualBonus: 22000,
  currency: "USD",
  loans: {
    totalLoans: 18000,
    pendingLoans: 1,
    remainingBalance: 9200,
    monthlyDeduction: 750,
  },
  overtime: {
    singleOTHours: 14,
    doubleOTHours: 6,
    estOTPaid: 1575,
  },
  taxBracketPercentage: 14,
  providentFundPercentage: 8,
};

export const defaultQualificationsData = {
  educationalDegrees: [
    {
      degree: "M.Sc. High-Rise Structural & Facility Systems",
      institution: "Imperial College London",
      year: 2017,
    },
    {
      degree: "B.Sc. Mechanical Engineering (Hons)",
      institution: "University of Moratuwa",
      year: 2013,
    },
  ],
  certifications: [
    {
      title: "Certified Facility Manager (CFM)",
      authority: "International Facility Management Association (IFMA)",
      issueDate: "2021-04-12",
      credentialId: "IFMA-8849-CFM",
    },
    {
      title: "LEED AP Building Operations & Maintenance",
      authority: "U.S. Green Building Council (USGBC)",
      issueDate: "2022-09-18",
      credentialId: "USGBC-LEED-4491",
    },
    {
      title: "High-Rise Fire & Life Safety Commander",
      authority: "National Fire Protection Association (NFPA)",
      issueDate: "2023-02-10",
      credentialId: "NFPA-CMD-902",
    },
  ],
};

export const defaultTrainingData = {
  earnedCredits: 54,
  complianceAudit: {
    compliantModules: 9,
    pendingActions: 1,
    overdueCount: 0,
  },
  completedPrograms: [
    {
      title: "Smart BMS Automation & IoT Sensor Management",
      completionDate: "2024-01-20",
      provider: "Siemens Building Technologies",
      score: 98,
    },
    {
      title: "Advanced Emergency Protocol & High-Angle Evacuation",
      completionDate: "2023-11-14",
      provider: "Red Cross Disaster Management",
      score: 100,
    },
    {
      title: "Hospitality Standards in Ultra-Luxury Residences",
      completionDate: "2023-08-05",
      provider: "Swiss Hospitality Institute",
      score: 94,
    },
  ],
  ongoingCourses: [
    {
      title: "AI-Powered HVAC Chiller Energy Optimization",
      progress: 68,
      instructor: "Dr. Marcus Wei, MIT Sloan",
      deadline: "2026-11-30",
    },
    {
      title: "Cybersecurity for Connected Luxury Buildings",
      progress: 42,
      instructor: "Schneider Electric Cyber Academy",
      deadline: "2026-12-15",
    },
  ],
  mandatoryCompliance: [
    {
      name: "Residential Information Security & Resident Privacy (GDPR)",
      status: "Compliant",
      dueDate: "2026-12-31",
    },
    {
      name: "High-Rise Anti-Bribery & Vendor Procurement Code",
      status: "Compliant",
      dueDate: "2026-12-31",
    },
    {
      name: "Zero-Incident OSHA Heavy Equipment Protocol",
      status: "Compliant",
      dueDate: "2026-11-15",
    },
    {
      name: "Annual Hazardous Materials & Chemical Handling Review",
      status: "Pending",
      dueDate: "2026-10-30",
    },
  ],
};

export const defaultPerformanceData = {
  ratings: {
    year2023: {
      score: 93,
      tag: "Strong Performer",
    },
    year2024: {
      score: 97,
      tag: "Exceeds Expectations",
    },
    year2025: {
      score: 95,
      tag: "Exceeds Expectations",
    },
  },
  coreFocusDetails:
    "Executing the Twin Towers 10-Year Infrastructure Refresh, cutting common-area kWh consumption by 22%, and maintaining a 98.4% Resident Net Satisfaction Index.",
  milestonesAchieved: [
    {
      title: "Twin Tower High-Speed Elevator Modernization (Otis SkyRise)",
      achieved: true,
      targetDate: "Q1 2024",
    },
    {
      title: "Solar PV Rooftop Array Commissioning (120 kWp)",
      achieved: true,
      targetDate: "Q3 2024",
    },
    {
      title: "Implementation of 24/7 Digital Resident Concierge Portal",
      achieved: true,
      targetDate: "Q4 2024",
    },
    {
      title: "Perimeter Smart Security & AI Vehicle ANPR Gates",
      achieved: false,
      targetDate: "Q2 2026",
    },
  ],
  kpiExecutionScore: 96,
  leadershipScore: 94,
  tenantSatisfactionRate: 98,
};

export const defaultLeaveData = {
  annualLeave: 15,
  annualLeaveMax: 21,
  casualPreApproved: 5,
  casualPostApproved: 2,
  medicalLeave: 12,
  medicalLeaveMax: 14,
  noPayAbsenteeism: 0,
  employmentTypeRules:
    "Permanent Executive Grade: 21 Days Annual Leave + 14 Days Medical Leave. Pre-approval required 48 hours prior for Casual Leave. Absenteeism without authorization triggers No-Pay payroll deduction.",
  leaveHistory: [
    {
      type: "Annual Leave",
      startDate: "2026-08-10",
      endDate: "2026-08-15",
      days: 5,
      status: "Approved",
      reason: "Family vacation",
    },
    {
      type: "Casual (Pre-Approved)",
      startDate: "2026-06-02",
      endDate: "2026-06-03",
      days: 1,
      status: "Approved",
      reason: "Personal appointment",
    },
    {
      type: "Medical Leave",
      startDate: "2026-03-12",
      endDate: "2026-03-14",
      days: 2,
      status: "Approved",
      reason: "Flu and fever recovery",
    },
  ],
};

export const defaultAttendanceData = {
  mtdLateArrivals: 2,
  totalMinutesLate: 28,
  monthsWithInfractions: 1,
  thresholdLimit: 3,
  complianceStatus: "Compliant",
  attendanceTrend: [
    { month: "May", lateCount: 1, minutesLate: 12 },
    { month: "Jun", lateCount: 0, minutesLate: 0 },
    { month: "Jul", lateCount: 2, minutesLate: 24 },
    { month: "Aug", lateCount: 1, minutesLate: 15 },
    { month: "Sep", lateCount: 3, minutesLate: 45 },
    { month: "Oct", lateCount: 2, minutesLate: 28 },
  ],
  recentRecords: [
    {
      date: "2026-10-09",
      checkInTime: "08:44 AM",
      expectedTime: "08:30 AM",
      delayMinutes: 14,
      reason: "Heavy monsoon traffic along Parliament Road",
    },
    {
      date: "2026-10-03",
      checkInTime: "08:44 AM",
      expectedTime: "08:30 AM",
      delayMinutes: 14,
      reason: "Unscheduled road maintenance detour",
    },
  ],
};

export const defaultDisciplinaryData = {
  warningLetters: [
    {
      warningId: "WL-2025-004",
      title: "Delayed Escalation of Tower B Secondary Chiller Alert",
      issuedDate: "2025-07-14",
      severity: "Medium",
      status: "Expired",
      reason:
        "Delayed notification to the on-call MEP contractor following a secondary chiller sensor trip during high-occupancy weekend.",
      actionLogs: [
        {
          date: "2025-07-15",
          author: "General Manager",
          note: "Reviewed incident timeline. Automated BMS SMS alerting rule was updated.",
        },
        {
          date: "2025-08-01",
          author: "HR Department",
          note: "Corrective training completed. Performance returned to 100% compliant status.",
        },
      ],
    },
    {
      warningId: "WL-2026-001",
      title: "Sub-Contractor Safety Induction Delay (Notice of Caution)",
      issuedDate: "2026-02-18",
      severity: "Low",
      status: "Active",
      reason:
        "Facade cleaning contractor commenced staging 25 minutes prior to submitting the signed physical safety briefing form to the control desk.",
      actionLogs: [
        {
          date: "2026-02-19",
          author: "HSE Inspector",
          note: "Meeting conducted with facade contractor supervisor. Digital signing protocol instituted.",
        },
      ],
    },
  ],
};

export const defaultDashboardStats = {
  totalApartments: 280,
  occupiedUnits: 268,
  occupancyRate: 95.7,
  activeStaffOnDuty: 42,
  activeLeaveRequests: 3,
  pendingPolicyAlerts: 1,
  monthlyExpenses: 84500,
  monthlyPayrollTotal: 98400,
  reserveFundBalance: 1420000,
  tenantSatisfactionRate: 98.4,
  energyEfficiencyGain: 22.4,
};
