import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react"; // Add explicit React import
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Pricing from "./pages/Pricing";
import PricingDiscounted from "./pages/PricingDiscounted";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

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

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
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
