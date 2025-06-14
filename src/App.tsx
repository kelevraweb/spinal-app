
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Pricing from "./pages/Pricing";
import PricingDiscounted from "./pages/PricingDiscounted";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import CookiePolicy from "./pages/CookiePolicy";
import SubscriptionPolicy from "./pages/SubscriptionPolicy";
import MoneyBackGuarantee from "./pages/MoneyBackGuarantee";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const AppContent = () => {
  // Facebook Pixel is now initialized within the components that use it
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/pricing-discounted" element={<PricingDiscounted />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/subscription-policy" element={<SubscriptionPolicy />} />
      <Route path="/money-back-guarantee" element={<MoneyBackGuarantee />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
