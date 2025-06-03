
import React, { useState, useCallback, useEffect } from 'react';
import { GoalSelector } from '@/components/GoalSelector';
import { DietPlanDisplay } from '@/components/DietPlanDisplay';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
// LoginForm.tsx is no longer used and its import is removed.
import { RegistrationForm } from '@/components/RegistrationForm';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { SignInCard2 } from '@/components/ui/sign-in-card-2'; 
import { fetchDietPlan } from '@/services/geminiService';
import type { WellnessGoal, DietPlan, User, AuthView } from '@/types';
import { WellnessGoal as WellnessGoalEnum } from '@/types';
import { AppTitleIcon } from '@/constants';

// --- localStorage keys ---
const USERS_STORAGE_KEY = 'aiDietUsers';
const CURRENT_USER_EMAIL_KEY = 'aiDietCurrentUserEmail';

// --- Helper functions for localStorage (demo purposes) ---
const getUsersFromStorage = (): User[] => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

const saveUsersToStorage = (users: User[]): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const getCurrentUserEmailFromStorage = (): string | null => {
  return localStorage.getItem(CURRENT_USER_EMAIL_KEY);
};

const saveCurrentUserEmailToStorage = (email: string): void => {
  localStorage.setItem(CURRENT_USER_EMAIL_KEY, email);
};

const removeCurrentUserEmailFromStorage = (): void => {
  localStorage.removeItem(CURRENT_USER_EMAIL_KEY);
};
// --- End helper functions ---


const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AuthView>('login');

  const [selectedGoal, setSelectedGoal] = useState<WellnessGoal | null>(null);
  const [conditionDetails, setConditionDetails] = useState<string>('');
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);


  useEffect(() => {
    const storedEmail = getCurrentUserEmailFromStorage();
    if (storedEmail) {
      const users = getUsersFromStorage();
      const user = users.find(u => u.email === storedEmail);
      if (user) {
        setCurrentUser(user);
        setCurrentView('app');
      } else {
        removeCurrentUserEmailFromStorage();
        setCurrentView('login'); 
      }
    } else {
      setCurrentView('login'); 
    }
  }, []);

  const handleLogin = (email: string, passwordAttempt: string): void => {
    setAuthError(null); 
    const users = getUsersFromStorage();
    const user = users.find(u => u.email === email);

    if (user && user.passwordHash === passwordAttempt) { 
      setCurrentUser(user);
      saveCurrentUserEmailToStorage(user.email);
      setCurrentView('app');
      setError(null); 
      setDietPlan(null); 
      setSelectedGoal(null);
    } else {
      setAuthError("Invalid email or password.");
    }
  };

  const handleRegister = (name: string | undefined, email: string, passwordAttempt: string): boolean => {
    setAuthError(null);
    const users = getUsersFromStorage();
    if (users.find(u => u.email === email)) {
      setAuthError("An account with this email already exists.");
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      passwordHash: passwordAttempt, 
    };
    saveUsersToStorage([...users, newUser]);
    setCurrentUser(newUser);
    saveCurrentUserEmailToStorage(newUser.email);
    setCurrentView('app');
    setError(null); 
    setDietPlan(null);
    setSelectedGoal(null);
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    removeCurrentUserEmailFromStorage();
    setCurrentView('login');
    setDietPlan(null);
    setSelectedGoal(null);
    setConditionDetails('');
    setError(null);
    setAuthError(null);
  };

  const handleGetDietPlan = useCallback(async () => {
    if (!currentUser) {
      setError("Please log in to get a diet plan.");
      return;
    }
    if (!selectedGoal) {
      setError('Please select a wellness goal.');
      return;
    }
    if (selectedGoal === WellnessGoalEnum.MANAGE_CONDITION && !conditionDetails.trim()) {
      setError('Please specify your health condition.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setDietPlan(null);

    try {
      const goalDescription = selectedGoal === WellnessGoalEnum.MANAGE_CONDITION 
        ? `${selectedGoal}: ${conditionDetails}` 
        : selectedGoal;
      const plan = await fetchDietPlan(goalDescription, selectedGoal === WellnessGoalEnum.MANAGE_CONDITION ? conditionDetails : undefined);
      setDietPlan(plan);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'An unexpected error occurred.');
      } else {
        setError('An unexpected error occurred.');
      }
      console.error("Error fetching diet plan:", err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedGoal, conditionDetails, currentUser]);

  
  if (currentUser && currentView === 'app') {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-emerald-100">
        <header className="w-full p-4 sm:p-6 text-center shadow-md bg-white/90 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between">
            <div 
              className="flex items-center space-x-2 sm:space-x-3 opacity-0 animate-slideInUpStagger"
              style={{ animationDelay: '0.1s' }}
            >
              <AppTitleIcon className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" />
              <h1 style={{ fontFamily: "'Pacifico', cursive" }} className="text-3xl sm:text-4xl font-bold text-emerald-700">
                AI Diet Guide
              </h1>
            </div>
            <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <p 
                className="text-md text-gray-700 opacity-0 animate-slideInUpStagger"
                style={{ animationDelay: '0.2s' }}
              >
                Welcome, {currentUser.name || currentUser.email}!
              </p>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg shadow-md transition-colors duration-200 ease-in-out text-sm opacity-0 animate-fadeIn"
                style={{ animationDelay: '0.3s' }}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 w-full max-w-3xl">
          {isLoading && <LoadingSpinner />}
          {error && !isLoading && <ErrorMessage message={error} />}
          
          {!isLoading && !error && (
            dietPlan ? (
              <>
                <DietPlanDisplay dietPlan={dietPlan} />
                <button
                  onClick={() => {
                    setDietPlan(null);
                    setSelectedGoal(null); 
                    setConditionDetails(''); 
                    setError(null); 
                  }}
                  className="mt-8 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transform hover:scale-102 active:scale-98"
                >
                  Clear Plan & Select New Goal
                </button>
              </>
            ) : (
              <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 opacity-0 animate-popIn" style={{ animationDelay: '0.2s' }}>
                <GoalSelector
                  selectedGoal={selectedGoal}
                  onGoalChange={(goal) => { setSelectedGoal(goal); setError(null); }}
                  conditionDetails={conditionDetails}
                  onConditionChange={(details) => { setConditionDetails(details); setError(null); }}
                  onSubmit={handleGetDietPlan}
                  isLoading={isLoading} 
                />
              </div>
            )
          )}
        </main>

        <footer className="text-center py-4 sm:py-6 text-gray-600 bg-gray-100/50 border-t border-gray-200 mt-auto">
          <p className="text-sm">&copy; {new Date().getFullYear()} AI Diet Guide. All rights reserved.</p>
          <p className="text-xs mt-1">This platform provides AI-generated information and is not a substitute for professional medical advice.</p>
        </footer>
      </div>
    );
  } else { 
    // User not logged in
    if (currentView === 'login') {
      return (
        <SignInCard2
          onLogin={handleLogin}
          onNavigateToRegister={() => { setCurrentView('register'); setAuthError(null); }}
          authError={authError}
        />
      );
    } else if (currentView === 'register') {
      // Registration view retains the ContainerScroll and general header
      return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-emerald-100">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-4xl font-semibold text-gray-700 dark:text-white">
                  Transform Your Health With <br />
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-emerald-600">
                    AI-Powered Nutrition
                  </span>
                </h1>
              </>
            }
          >
            <img
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"
              alt="Healthy food spread"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-center"
              draggable={false}
            />
          </ContainerScroll>

          <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 -mt-16 md:-mt-24 relative z-10">
            <header 
              className="w-full max-w-4xl text-center mb-6 sm:mb-8 opacity-0 animate-slideInUpStagger" 
              style={{animationDelay: '0s'}}
            >
              <div 
                className="flex items-center justify-center space-x-3 opacity-0 animate-slideInUpStagger" 
                style={{animationDelay: '0.1s'}}
              >
                <AppTitleIcon className="w-12 h-12 text-emerald-600" />
                <h1 style={{fontFamily: "'Pacifico', cursive"}} className="text-4xl sm:text-5xl font-bold text-emerald-700">
                  AI Diet Guide
                </h1>
              </div>
              <p 
                className="text-lg text-gray-600 mt-2 opacity-0 animate-slideInUpStagger" 
                style={{animationDelay: '0.2s'}}
              >
                Create an account to get your personalized diet plan.
              </p>
            </header>

            <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-6 sm:p-8 animate-popIn" style={{ animationDelay: '0.3s' }}>
              <RegistrationForm
                onRegister={handleRegister}
                onNavigateToLogin={() => { setCurrentView('login'); setAuthError(null); }}
                error={authError}
              />
            </div>
          </div>
          
          <footer className="text-center mt-auto py-4 sm:py-6 text-gray-500 text-xs sm:text-sm opacity-0 animate-slideInUpStagger relative z-10" style={{animationDelay: '0.5s'}}>
            <p>&copy; {new Date().getFullYear()} AI Diet Guide. All rights reserved.</p>
            <p>This platform provides AI-generated information and is not a substitute for professional medical advice.</p>
          </footer>
        </div>
      );
    }
  }
  return null; 
};

export default App;
