import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import StudentDashboard from './pages/StudentDashboard';
import RegisterPage from './pages/RegisterPage';
import ExhibitionDetails from './pages/ExhibitionDetails';
import AboutPage from './pages/AboutPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import AgendaPage from './pages/AgendaPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import JoinUsPage from './pages/JoinUsPage';
import StakeholdersPage from './pages/StakeholdersPage';
import AppliedResearchPage from './pages/AppliedResearchPage';
import SubmitResearchPage from './pages/SubmitResearchPage';
import DigitalMentorsPage from './pages/DigitalMentorsPage';
import EmploymentFairPage from './pages/EmploymentFairPage';
import AlumniFairPage from './pages/AlumniFairPage';
import GraduationProjectsPage from './pages/GraduationProjectsPage';
import SubmitGraduationProjectPage from './pages/SubmitGraduationProjectPage';
import GreenInnovationPage from './pages/GreenInnovationPage';
import Chatbot from './components/Chatbot';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set direction and font based on language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Router>
      <div className="min-h-screen bg-background text-text-primary">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/exhibition/:id" element={<ExhibitionDetails />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/join" element={<JoinUsPage />} />
            <Route path="/stakeholders" element={<StakeholdersPage />} />
            <Route path="/applied-research" element={<AppliedResearchPage />} />
            <Route path="/submit-research" element={<SubmitResearchPage />} />
            <Route path="/digital-mentors" element={<DigitalMentorsPage />} />
            <Route path="/employment-fair" element={<EmploymentFairPage />} />
            <Route path="/alumni-fair" element={<AlumniFairPage />} />
            <Route path="/graduation-projects" element={<GraduationProjectsPage />} />
            <Route path="/submit-graduation-project" element={<SubmitGraduationProjectPage />} />
            <Route path="/green-innovation" element={<GreenInnovationPage />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
