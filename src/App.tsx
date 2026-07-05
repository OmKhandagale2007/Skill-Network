import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import MatchFinder from './components/MatchFinder'
import Auth from './components/Auth'
import Explore from './components/Explore'
import StudentProfiles from './components/StudentProfiles'
import CTA, { Footer } from './components/CTA'

function AppContent() {
  const { currentUser, loading } = useAuth()

  return (
    <>
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        {loading ? null : currentUser ? (
          <>
            <MatchFinder />
            <Explore />
            <StudentProfiles />
          </>
        ) : (
          <Auth />
        )}
        <CTA />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
