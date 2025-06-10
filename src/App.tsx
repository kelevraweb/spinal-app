
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Quiz from '@/pages/Quiz';
import Pricing from '@/pages/Pricing';
import PricingDiscounted from '@/pages/PricingDiscounted';
import ThankYou from '@/pages/ThankYou';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import { AuthProvider } from '@/contexts/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Toaster />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/pricing-discounted" element={<PricingDiscounted />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
