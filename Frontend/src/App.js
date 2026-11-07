

import './App.css';
import Navbar from './components/common/Navbar/Navbar';
import HomePage from './components/common/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from './components/common/AboutUs/Aboutus';
import ContactUs from './components/common/ContactUs/ContactUs';
import Features from './components/common/Features/Features';
import Login from './components/auth/Login/Login';
import LoginNextPg from './components/auth/LoginNextPg/LoginNextPg';
import Dashboard from './components/nutritionist/Dashboard/Dashboard';
import DashboardHome from './components/nutritionist/Dashboard/DashboardHome';
import SignUpN from './components/auth/SignUpN/SignUpN';
import SignUp from './components/auth/SignUp/SignUp';
import SignUpP from './components/auth/SignUpP/SignUpP';
import ChooseN from './components/patient/ChooseNutritionist/ChooseN';
import DashboardP from './components/patient/Dashboard/DashboardP';
import DashboardPHome from './components/patient/Dashboard/DashboardPHome';
import ConsentP from './components/patient/Consent/ConsentP';
import PatientsN from './components/nutritionist/Patients/PatientsN';
import PatientsNextPg from './components/nutritionist/PatientsNextPage/PatientsNextPgN';
import MealPlanN from './components/nutritionist/MealPlan/MealPlanN';
import MealPlanNextPg from './components/nutritionist/MealPlanNextPage/MealPlanNextPg';
import SupplementN from './components/nutritionist/Supplement/SupplementN';
import SupplementNextPgN from './components/nutritionist/SupplementNextPage/SupplementnextPageN';
import BloodReportsN from './components/nutritionist/BloodReports/BloodReportsN';
import CalendarN from './components/nutritionist/Calendar/CalendarN';
import CalendarNextPage from './components/nutritionist/CalendarNextPage/CalendarNextPg';
import ConsentN from './components/nutritionist/Consent/ConsentN';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/*this is for homepage*/}
        <Route path='/' element={<HomePage />} />

        <Route path='/features' element={<Features />} />

        <Route path='/aboutUs' element={<AboutUs />} />

        <Route path='contactUs' element={< ContactUs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/loginNextpg' element={<LoginNextPg />} />
        <Route path='/signupn' element={<SignUpN />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/patientsignup' element={<SignUpP />} />

        {/* ===== Nutritionist Dashboard (nested routing) =====
            Dashboard.jsx is now a layout: sidebar + <Outlet/>.
            Everything below renders inside it, at /dashboard/... */}
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path='patients' element={<PatientsN />} />
          <Route path='patients/new' element={<PatientsNextPg />} />
          <Route path='mealplan' element={<MealPlanN />} />
          <Route path='mealplan/new' element={<MealPlanNextPg />} />
          <Route path='supplements' element={<SupplementN />} />
          <Route path='supplements/new' element={<SupplementNextPgN />} />
          <Route path='bloodreports' element={<BloodReportsN />} />
          <Route path='calendar' element={<CalendarN />} />
          <Route path='calendar/new' element={<CalendarNextPage />} />
          <Route path='consent' element={<ConsentN />} />
        </Route>

        {/* ===== Patient Dashboard (nested routing) =====
            DashboardP.jsx is now a layout: sidebar + <Outlet/>.
            Everything below renders inside it, at /dashboardp/... */}
        <Route path='/dashboardp' element={<DashboardP />}>
          <Route index element={<DashboardPHome />} />
          <Route path='consent' element={<ConsentP />} />
          <Route path='choose-nutritionist' element={<ChooseN />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
