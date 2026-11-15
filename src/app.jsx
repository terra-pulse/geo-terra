import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import { AppProvider } from '@/lib/AppContext';
import Layout from '@/components/Layout';
import SiteOverview from '@/pages/SiteOverview';
import PlantCompatibility from '@/pages/PlantCompatibility';
import ClimateAnalogs from '@/pages/ClimateAnalogs';
import ImpactScenario from '@/pages/ImpactScenario';
import GrowthLab from '@/pages/GrowthLab';
import EarthJukebox from '@/pages/EarthJukebox';
import EarthDuet from '@/pages/EarthDuet';
import Science from '@/pages/Science';
import { AudioProvider } from '@/lib/AudioProvider';
import { TourProvider } from '@/lib/TourContext';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<EarthJukebox />} />
        <Route path="/site" element={<SiteOverview />} />
        <Route path="/plants" element={<PlantCompatibility />} />
        <Route path="/analogs" element={<ClimateAnalogs />} />
        <Route path="/impact" element={<ImpactScenario />} />
        <Route path="/growth" element={<GrowthLab />} />
        <Route path="/duet" element={<EarthDuet />} />
        <Route path="/science" element={<Science />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <AppProvider>
        <AudioProvider>
          <TourProvider>
            <QueryClientProvider client={queryClientInstance}>
              <Router>
                <ScrollToTop />
                <AuthenticatedApp />
              </Router>
              <Toaster />
            </QueryClientProvider>
          </TourProvider>
        </AudioProvider>
      </AppProvider>
    </AuthProvider>
  )
}

export default App
