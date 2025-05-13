
import React, { useState } from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minLength?: number;
}

const TextInput: React.FC<TextInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "La tua risposta...",
  minLength
}) => {
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    if (minLength && e.target.value.length < minLength) {
      setError(`Please enter at least ${minLength} characters`);
    } else {
      setError(null);
    }
  };

  return (
    <div className="mt-6">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={4}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring focus:ring-green-100 focus:ring-opacity-50 transition-colors"
      />
      
      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}
      
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <p>{value?.length || 0} caratteri</p>
        {minLength && (
          <p>Minimo: {minLength} caratteri</p>
        )}
      </div>
    </div>
  );
};

export default TextInput;
