
import React, { useState } from 'react';

interface RegistrationFormProps {
  onRegister: (name: string | undefined, email: string, password: string) => boolean;
  onNavigateToLogin: () => void;
  error: string | null;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister, onNavigateToLogin, error }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }
    setFormError(null);
    setIsLoading(true);
    // Simulate API call delay for realistic UX
    setTimeout(() => {
      const success = onRegister(name.trim() || undefined, email, password);
      if (!success) { // if onRegister returns false, it means there was an external error (like email exists)
        // The error prop will be set by App.tsx, so we don't need to setFormError here for that.
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="animate-slideInFromRight" style={{animationDelay: '0.1s'}}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6" style={{fontFamily: "'Inter', sans-serif"}}>Create Your Account</h2>
      {(error || formError) && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          {error || formError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name-register" className="block text-sm font-medium text-gray-700">
            Name (Optional)
          </label>
          <input
            id="name-register"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="email-register" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email-register"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password-register" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password-register"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
            placeholder="Minimum 6 characters"
          />
        </div>
         <div>
          <label htmlFor="confirm-password-register" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirm-password-register"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
            placeholder="Re-enter password"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-md font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-gray-400 transition-all duration-300 ease-in-out transform hover:scale-102 active:scale-98"
          >
            {isLoading ? (
               <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </div>
      </form>
        <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          onClick={onNavigateToLogin}
          className="font-semibold text-emerald-600 hover:text-emerald-800 hover:underline transition-colors"
        >
          Sign in
        </button>
      </p>
    </div>
  );
};
