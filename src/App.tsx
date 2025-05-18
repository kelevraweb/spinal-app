
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
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
  faChartLine
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
  faChartLine
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
