// Sample data for the demo dashboard. Replace with API calls.

export const students = [
  { id: "S1001", name: "Riya Sharma", className: "Class 5 - A", guardian: "Anil Sharma", phone: "+91 98110 22334", fees: "Paid", attendance: 97 },
  { id: "S1002", name: "Aarav Singh", className: "Class 3 - B", guardian: "Meena Singh", phone: "+91 98110 44556", fees: "Paid", attendance: 92 },
  { id: "S1003", name: "Ishaan Gupta", className: "Class 8 - A", guardian: "Rakesh Gupta", phone: "+91 98110 66778", fees: "Pending", attendance: 88 },
  { id: "S1004", name: "Ananya Iyer", className: "Class 6 - C", guardian: "Lakshmi Iyer", phone: "+91 98110 88990", fees: "Paid", attendance: 99 },
  { id: "S1005", name: "Kabir Khan", className: "Class 10 - A", guardian: "Imran Khan", phone: "+91 98111 11223", fees: "Overdue", attendance: 81 },
  { id: "S1006", name: "Saanvi Reddy", className: "Class 4 - A", guardian: "Kiran Reddy", phone: "+91 98111 33445", fees: "Paid", attendance: 95 },
  { id: "S1007", name: "Vivaan Patel", className: "Class 7 - B", guardian: "Hetal Patel", phone: "+91 98111 55667", fees: "Pending", attendance: 90 },
  { id: "S1008", name: "Diya Nair", className: "Class 9 - A", guardian: "Suresh Nair", phone: "+91 98111 77889", fees: "Paid", attendance: 94 },
  { id: "S1009", name: "Arjun Mehta", className: "Class 2 - A", guardian: "Pooja Mehta", phone: "+91 98111 99001", fees: "Paid", attendance: 96 },
  { id: "S1010", name: "Myra Joshi", className: "Class 1 - B", guardian: "Nikhil Joshi", phone: "+91 98112 12345", fees: "Pending", attendance: 89 },
]

export const teachers = [
  { id: "T201", name: "Neha Verma", subject: "Mathematics", classes: "8A, 9A, 10A", experience: "9 yrs", status: "Active" },
  { id: "T202", name: "Rahul Mehta", subject: "Science", classes: "6C, 7B, 8A", experience: "6 yrs", status: "Active" },
  { id: "T203", name: "Sunita Rao", subject: "English", classes: "3B, 4A, 5A", experience: "12 yrs", status: "Active" },
  { id: "T204", name: "Vikram Das", subject: "Social Studies", classes: "7B, 9A", experience: "4 yrs", status: "On leave" },
  { id: "T205", name: "Fatima Sheikh", subject: "Hindi", classes: "1B, 2A, 3B", experience: "8 yrs", status: "Active" },
  { id: "T206", name: "Karan Malhotra", subject: "Computer Science", classes: "8A, 9A, 10A", experience: "5 yrs", status: "Active" },
]

export const activities = [
  { title: "New student enrolled", sub: "Riya Sharma - Class 5", time: "10:24 AM", type: "student" },
  { title: "Attendance marked", sub: "Class 8 - Science", time: "09:45 AM", type: "attendance" },
  { title: "Fee received", sub: "Aarav Singh - Class 3", time: "08:20 AM", type: "fee" },
  { title: "Exam scheduled", sub: "Half-yearly - Class 10", time: "Yesterday", type: "exam" },
  { title: "Teacher on leave", sub: "Vikram Das - 2 days", time: "Yesterday", type: "teacher" },
]

export const weeklyAttendance = [
  { day: "Mon", value: 94.2 },
  { day: "Tue", value: 95.8 },
  { day: "Wed", value: 93.1 },
  { day: "Thu", value: 96.4 },
  { day: "Fri", value: 92.7 },
  { day: "Sat", value: 89.5 },
]

export const upcomingEvents = [
  { date: "21", month: "Oct", title: "Parent–Teacher Meeting", meta: "Classes 6–10 · 10:00 AM" },
  { date: "24", month: "Oct", title: "Half-yearly Exams Begin", meta: "All classes" },
  { date: "31", month: "Oct", title: "Diwali Celebration", meta: "School auditorium · 11:00 AM" },
]

export const classes = [
  { id: "C1", name: "Class 1", sections: ["A", "B"], teacher: "Fatima Sheikh", students: 62, capacity: 70, room: "101" },
  { id: "C2", name: "Class 2", sections: ["A", "B"], teacher: "Fatima Sheikh", students: 58, capacity: 70, room: "102" },
  { id: "C3", name: "Class 3", sections: ["A", "B"], teacher: "Sunita Rao", students: 66, capacity: 70, room: "103" },
  { id: "C4", name: "Class 4", sections: ["A", "B"], teacher: "Sunita Rao", students: 61, capacity: 70, room: "104" },
  { id: "C5", name: "Class 5", sections: ["A", "B", "C"], teacher: "Sunita Rao", students: 94, capacity: 105, room: "201" },
  { id: "C6", name: "Class 6", sections: ["A", "B", "C"], teacher: "Rahul Mehta", students: 98, capacity: 105, room: "202" },
  { id: "C7", name: "Class 7", sections: ["A", "B"], teacher: "Vikram Das", students: 69, capacity: 70, room: "203" },
  { id: "C8", name: "Class 8", sections: ["A", "B"], teacher: "Neha Verma", students: 64, capacity: 70, room: "301" },
  { id: "C9", name: "Class 9", sections: ["A", "B"], teacher: "Karan Malhotra", students: 60, capacity: 70, room: "302" },
  { id: "C10", name: "Class 10", sections: ["A", "B"], teacher: "Neha Verma", students: 57, capacity: 70, room: "303" },
]

export const invoices = [
  { id: "INV-2041", student: "Riya Sharma", className: "Class 5 - A", term: "Term 2", amount: 18500, due: "2026-10-10", status: "Paid", paidOn: "2026-10-04" },
  { id: "INV-2042", student: "Aarav Singh", className: "Class 3 - B", term: "Term 2", amount: 16000, due: "2026-10-10", status: "Paid", paidOn: "2026-10-17" },
  { id: "INV-2043", student: "Ishaan Gupta", className: "Class 8 - A", term: "Term 2", amount: 21000, due: "2026-10-20", status: "Pending" },
  { id: "INV-2044", student: "Ananya Iyer", className: "Class 6 - C", term: "Term 2", amount: 19500, due: "2026-10-10", status: "Paid", paidOn: "2026-10-08" },
  { id: "INV-2045", student: "Kabir Khan", className: "Class 10 - A", term: "Term 2", amount: 24000, due: "2026-09-30", status: "Overdue" },
  { id: "INV-2046", student: "Saanvi Reddy", className: "Class 4 - A", term: "Term 2", amount: 17000, due: "2026-10-10", status: "Paid", paidOn: "2026-10-09" },
  { id: "INV-2047", student: "Vivaan Patel", className: "Class 7 - B", term: "Term 2", amount: 20000, due: "2026-10-25", status: "Pending" },
  { id: "INV-2048", student: "Diya Nair", className: "Class 9 - A", term: "Term 2", amount: 22500, due: "2026-10-10", status: "Paid", paidOn: "2026-10-02" },
  { id: "INV-2049", student: "Arjun Mehta", className: "Class 2 - A", term: "Term 2", amount: 15500, due: "2026-10-10", status: "Paid", paidOn: "2026-10-06" },
  { id: "INV-2050", student: "Myra Joshi", className: "Class 1 - B", term: "Term 2", amount: 15000, due: "2026-10-28", status: "Pending" },
]

export const exams = [
  { id: "E1", name: "Half-yearly Examination", classes: "Classes 1–10", start: "2026-10-24", end: "2026-11-04", status: "Upcoming" },
  { id: "E2", name: "Unit Test 3", classes: "Classes 6–10", start: "2026-12-08", end: "2026-12-12", status: "Scheduled" },
  { id: "E3", name: "Unit Test 2", classes: "Classes 6–10", start: "2026-08-18", end: "2026-08-22", status: "Completed" },
  { id: "E4", name: "Unit Test 1", classes: "Classes 1–10", start: "2026-07-07", end: "2026-07-11", status: "Completed" },
]

export const examSchedule = [
  { date: "2026-10-24", day: "Sat", subject: "English", time: "9:00 – 12:00", room: "Exam Hall A" },
  { date: "2026-10-27", day: "Tue", subject: "Mathematics", time: "9:00 – 12:00", room: "Exam Hall A" },
  { date: "2026-10-29", day: "Thu", subject: "Science", time: "9:00 – 12:00", room: "Exam Hall B" },
  { date: "2026-10-31", day: "Sat", subject: "Social Studies", time: "9:00 – 12:00", room: "Exam Hall A" },
  { date: "2026-11-02", day: "Mon", subject: "Hindi", time: "9:00 – 11:00", room: "Exam Hall B" },
  { date: "2026-11-04", day: "Wed", subject: "Computer Science", time: "9:00 – 11:00", room: "Computer Lab" },
]

export const subjects = ["English", "Maths", "Science", "Social", "Hindi"]

export const results = [
  { student: "Ishaan Gupta", marks: [78, 92, 85, 74, 81] },
  { student: "Riya Sharma", marks: [91, 88, 94, 86, 90] },
  { student: "Kabir Khan", marks: [64, 58, 70, 66, 72] },
  { student: "Diya Nair", marks: [88, 95, 91, 84, 87] },
  { student: "Vivaan Patel", marks: [72, 81, 76, 79, 68] },
  { student: "Ananya Iyer", marks: [95, 97, 93, 90, 94] },
]

export const monthlyFees = [
  { label: "May", value: 18.4 },
  { label: "Jun", value: 9.2 },
  { label: "Jul", value: 21.6 },
  { label: "Aug", value: 14.8 },
  { label: "Sep", value: 12.1 },
  { label: "Oct", value: 19.7 },
]

export const classAttendance = [
  { label: "Class 1", value: 95.1 },
  { label: "Class 2", value: 94.6 },
  { label: "Class 3", value: 93.8 },
  { label: "Class 4", value: 96.2 },
  { label: "Class 5", value: 94.9 },
  { label: "Class 6", value: 92.4 },
  { label: "Class 7", value: 91.7 },
  { label: "Class 8", value: 93.3 },
  { label: "Class 9", value: 90.8 },
  { label: "Class 10", value: 89.6 },
]
