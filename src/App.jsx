import { BrowserRouter, Route, Routes } from "react-router-dom"

import DashboardLayout from "@/components/dashboard/DashboardLayout"
import Layout from "@/components/Layout"
import { AuthProvider, GuestOnly, RequireAuth } from "@/context/AuthContext"
import About from "@/pages/About"
import Contact from "@/pages/Contact"
import Attendance from "@/pages/dashboard/Attendance"
import Classes from "@/pages/dashboard/Classes"
import ComingSoon from "@/pages/dashboard/ComingSoon"
import Exams from "@/pages/dashboard/Exams"
import Fees from "@/pages/dashboard/Fees"
import Overview from "@/pages/dashboard/Overview"
import Reports from "@/pages/dashboard/Reports"
import Settings from "@/pages/dashboard/Settings"
import Students from "@/pages/dashboard/Students"
import Teachers from "@/pages/dashboard/Teachers"
import Timetable from "@/pages/dashboard/Timetable"
import FeaturesPage from "@/pages/Features"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import NotFound from "@/pages/NotFound"
import Pricing from "@/pages/Pricing"
import Signup from "@/pages/Signup"

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="login" element={<GuestOnly><Login /></GuestOnly>} />
          <Route path="signup" element={<GuestOnly><Signup /></GuestOnly>} />

          <Route path="dashboard" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
            <Route index element={<Overview />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="classes" element={<Classes />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="fees" element={<Fees />} />
            <Route path="exams" element={<Exams />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<ComingSoon />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
