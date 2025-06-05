
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import NewIndex from "./pages/NewIndex";
import Quiz from "./pages/Quiz";
import Pricing from "./pages/Pricing";
import PricingDiscounted from "./pages/PricingDiscounted";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import { useFacebookPixel } from "@/hooks/useFacebookPixel";

// Configure FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faSmile, 
  faMeh, 
  faFrown,
  faClock,
  faCalendarAlt,
  faStopwatch,
  faDumbbell,
  faHeartbeat,
  faTrophy,
  faStar,
  faChartLine,
  faWalking,
  faRunning,
  faPersonWalking,
  faUserNinja,
  faSpinner,
  faSquare,
  faSquareCheck
} from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(
  faSmile, 
  faMeh, 
  faFrown, 
  faClock, 
  faCalendarAlt, 
  faStopwatch, 
  faDumbbell, 
  faHeartbeat, 
  faTrophy, 
  faStar,
  faChartLine,
  faWalking,
  faRunning,
  faPersonWalking,
  faUserNinja,
  faSpinner,
  faSquare,
  faSquareCheck
);

// Create the query client outside of the component
const queryClient = new QueryClient();

// Component to track page views
const PageViewTracker = () => {
  const location = useLocation();
  
  // Initialize Facebook Pixel (this will load the pixel script)
  useFacebookPixel();
  
  useEffect(() => {
    // Track page view on route changes
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);

  return null;
};

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageViewTracker />
            <Routes>
              <Route path="/" element={<NewIndex />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/pricing-discounted" element={<PricingDiscounted />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
