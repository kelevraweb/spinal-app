
import React, { useEffect } from 'react';

const ExpertReview: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`max-w-2xl mx-auto my-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <h2 className="text-2xl font-bold text-center mb-2">
        Your plan will be reviewed by <span className="text-brand-primary">our science team</span>
      </h2>
      
      <div className="my-6">
        <p className="text-center italic text-gray-600">
          "I love that Liven incorporates science-backed techniques to provide personalized content and resources to its users. 
          This approach enhances their emotional well-being."
        </p>
      </div>
      
      <div className="bg-green-50 rounded-lg p-4 mt-6">
        <div className="text-center text-sm text-gray-600 mb-2">Content reviewed by an expert</div>
        
        <div className="flex items-center space-x-4 p-4">
          <div className="relative">
            <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold">Anieta Dixon, MA, SME</h3>
            <p className="text-sm text-gray-600">Practicing mindset coach</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center my-8">
        <div className="w-full max-w-md">
          <div className="flex items-start justify-around mx-auto w-64 mb-8">
            <div className="text-center">
              <div className="mb-2">Thoughts</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-600">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            
            <div className="relative text-center">
              <div className="mb-2">Feelings</div>
              <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMTBoODB2ODBIMTB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMwIiBmaWxsPSIjZWNlY2VjIiBzdHJva2U9IiM5OTkiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0zMCA0MGM1LTggMTUtOCAyMCAwbTIwIDBjNS04IDE1LTggMjAgME0zMCA2MGMxMCAxMCAzMCAxMCA0MCAwIiBmaWxsPSJub25lIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+" 
                  alt="Brain" 
                  className="w-16 h-16 opacity-70"
                />
              </div>
            </div>
            
            <div className="text-center">
              <div className="mb-2">Behavior</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-600">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertReview;
