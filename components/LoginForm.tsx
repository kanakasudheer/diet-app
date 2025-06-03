
import React, { useState }  from 'react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void; // Changed return type to void
  onNavigateToRegister: () => void;
  error: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onNavigateToRegister, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call delay for realistic UX
    setTimeout(() => {
      onLogin(email, password); // The return value was not used, so void is fine.
      setIsLoading(false); 
    }, 500);
  };

  return (
    <div className="animate-slideInFromRight" style={{animationDelay: '0.1s'}}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6" style={{fontFamily: "'Inter', sans-serif"}}>Welcome Back!</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email-login" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email-login"
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
          <label htmlFor="password-login" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password-login"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
            placeholder="••••••••"
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
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          onClick={onNavigateToRegister}
          className="font-semibold text-emerald-600 hover:text-emerald-800 hover:underline transition-colors"
        >
          Create one
        </button>
      </p>
    </div>
  );
};
