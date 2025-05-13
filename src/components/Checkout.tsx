
import React, { useState } from 'react';
import { testimonials, userReviews } from '../data/testimonials';
import { Rating } from './Rating';

interface CheckoutProps {
  onPurchase: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onPurchase }) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  
  const plans = {
    monthly: {
      price: 7.99,
      period: 'month',
      billingText: 'Fatturazione mensile',
      savings: null,
      mostPopular: true
    },
    yearly: {
      price: 5.99,
      period: 'month',
      billingText: 'Fatturazione annuale',
      savings: '25%',
      total: 71.88
    }
  };

  const features = [
    'Piano personalizzato in base al tuo profilo emotivo',
    'Accesso illimitato a tutti i contenuti premium',
    'Esercizi guidati per ogni situazione',
    'Analisi settimanale dei progressi',
    'Supporto via chat con i nostri esperti',
    'Garanzia soddisfatti o rimborsati'
  ];

  const handlePurchase = () => {
    // Here we would integrate with Stripe or another payment processor
    onPurchase();
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
        Your personalized plan is ready!
      </h2>
      
      <div className="flex justify-center space-x-4 my-6">
        <div className="flex items-center">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>Instant Access</span>
        </div>
        
        <div className="flex items-center">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>No Credit Card</span>
        </div>
      </div>
      
      {/* Plan Selection */}
      <div className="flex flex-col md:flex-row gap-4 my-8">
        {/* Monthly Plan */}
        <div 
          className={`flex-1 border-2 rounded-xl p-6 transition-all cursor-pointer
            ${selectedPlan === 'monthly' 
              ? 'border-brand-primary bg-brand-light shadow-lg transform -translate-y-1' 
              : 'border-gray-200 hover:border-gray-300'
            }`}
          onClick={() => setSelectedPlan('monthly')}
        >
          {plans.monthly.mostPopular && (
            <div className="bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
              MOST POPULAR
            </div>
          )}
          
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">${plans.monthly.price}</span>
            <span className="text-gray-500 ml-1">/{plans.monthly.period}</span>
          </div>
          
          <p className="text-sm text-gray-500 mt-1">{plans.monthly.billingText}</p>
          
          <div className="mt-4 space-y-2">
            {features.slice(0, 3).map((feature, i) => (
              <div key={i} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 mr-2 text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Yearly Plan */}
        <div 
          className={`flex-1 border-2 rounded-xl p-6 transition-all cursor-pointer
            ${selectedPlan === 'yearly' 
              ? 'border-brand-primary bg-brand-light shadow-lg transform -translate-y-1' 
              : 'border-gray-200 hover:border-gray-300'
            }`}
          onClick={() => setSelectedPlan('yearly')}
        >
          {plans.yearly.savings && (
            <div className="bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
              SAVE {plans.yearly.savings}
            </div>
          )}
          
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">${plans.yearly.price}</span>
            <span className="text-gray-500 ml-1">/{plans.yearly.period}</span>
          </div>
          
          <p className="text-sm text-gray-500 mt-1">{plans.yearly.billingText}</p>
          
          <div className="mt-4 space-y-2">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 mr-2 text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Purchase Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handlePurchase}
          className="btn-primary py-4 w-full max-w-lg text-lg"
        >
          GET MY PLAN
        </button>
        
        <div className="mt-2 text-xs text-gray-500 max-w-lg mx-auto">
          <p>You will receive immediate access to your personalized plan after payment</p>
          <p>7-day refund available if you're not satisfied with your plan</p>
        </div>
      </div>
      
      {/* Payment Methods */}
      <div className="flex justify-center mt-4 space-x-2">
        <div className="w-8 h-5 bg-gray-200 rounded"></div>
        <div className="w-8 h-5 bg-gray-200 rounded"></div>
        <div className="w-8 h-5 bg-gray-200 rounded"></div>
        <div className="w-8 h-5 bg-gray-200 rounded"></div>
      </div>
      
      {/* Trust Indicators */}
      <div className="mt-16">
        <h3 className="text-xl font-bold text-center mb-6">Our goals</h3>
        
        <div className="space-y-4 max-w-xl mx-auto">
          {[
            "Our content is designed to help you become healthier",
            "Our focus is to help you create better habits",
            "Everything we produce is scientifically proven",
            "We help you understand your emotions and actions better",
            "Our goal is to increase your confidence in 4-6 weeks",
          ].map((goal, i) => (
            <div key={i} className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <p>{goal}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Statistics */}
      <div className="mt-16">
        <h3 className="text-xl font-bold text-center mb-2">People just like you achieved great results using our plan</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-primary">83%</div>
            <p className="text-sm mt-1">of users were able to stop harmful beliefs and develop more positive ones</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-primary">77%</div>
            <p className="text-sm mt-1">of users reported improved sleep quality after following our plan</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-primary">90%</div>
            <p className="text-sm mt-1">of users felt more like themselves in less than 2 months</p>
          </div>
        </div>
      </div>
      
      {/* FAQs */}
      <div className="mt-16">
        <h3 className="text-xl font-bold text-center mb-8">How the program helps you heal...</h3>
        
        <div className="space-y-6 max-w-2xl mx-auto">
          {[
            {
              title: "Week 1: Break the negative thought cycle",
              content: "Learn to identify harmful patterns in your thinking and how to interrupt them before they escalate."
            },
            {
              title: "Week 2: Regain mental clarity",
              content: "Use our proven techniques to clear mental fog and regain focus on what truly matters."
            },
            {
              title: "Week 3: Practice better coping mechanisms",
              content: "Replace destructive coping strategies with healthier alternatives specifically designed for your personality."
            },
            {
              title: "Week 4: Build lasting resilience",
              content: "Develop long-term emotional resilience to better handle future challenges in your relationships."
            }
          ].map((faq, i) => (
            <div key={i} className="border-b border-gray-200 pb-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 mr-3 mt-1 text-center bg-gray-100 rounded-full text-sm font-medium">
                  {i+1}
                </div>
                <div>
                  <h4 className="font-medium">{faq.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{faq.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* User Reviews */}
      <div className="mt-16">
        <h3 className="text-xl font-bold text-center mb-6">People love our plan</h3>
        
        <div className="space-y-8 max-w-2xl mx-auto">
          {userReviews.map((review) => (
            <div key={review.id} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Rating rating={review.stars} />
                <span className="ml-auto text-sm text-gray-500">{review.date}</span>
              </div>
              <h4 className="font-medium">{review.name}</h4>
              <p className="text-gray-600 mt-2">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Final CTA */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Your personalized plan is ready!</h2>
        
        <button
          onClick={handlePurchase}
          className="btn-primary py-4 px-8 text-lg"
        >
          GET MY PLAN NOW
        </button>
      </div>
      
      {/* Money Back Guarantee */}
      <div className="mt-16 border-2 border-green-100 rounded-xl p-6 max-w-2xl mx-auto">
        <div className="flex items-start">
          <div className="mr-4">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="8 12 12 16 16 12"></polyline>
                <line x1="12" y1="8" x2="12" y2="16"></line>
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">30-Day Money-Back Guarantee</h3>
            <p className="text-gray-600">
              We believe in our program so much that if you don't see improvements in the first 30 days, we'll give you a full refund. No questions asked. Your journey to better emotional health should be risk-free.
            </p>
            <button className="mt-4 text-brand-primary font-medium flex items-center">
              LEARN MORE
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
