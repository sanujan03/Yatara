
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(email, password);
    setIsSubmitting(false);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#020617] md:grid-cols-2">
      <section className="hidden bg-gradient-to-br from-[#052E2B] via-[#064E3B]/70 to-[#020617] p-10 md:flex md:flex-col md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#E6F4F1]/80">Yatara Ceylon</p>
          <h1 className="mt-4 max-w-sm text-5xl font-bold leading-tight text-[#E6F4F1]">
            Curated journeys across Sri Lanka.
          </h1>
        </div>
        <p className="glass-surface max-w-md rounded-[20px] p-4 text-[#E6F4F1]/90">
          Manage your bookings, travel dates, and requests from one place.
        </p>
      </section>

      <section className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="glass-surface w-full max-w-md space-y-7 rounded-[20px] p-8">
        <div>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#E6F4F1]/70">Welcome Back</p>
          <h2 className="mt-2 text-center text-3xl font-bold text-[#E6F4F1]">Sign In</h2>
          <p className="mt-2 text-center text-sm text-[#E6F4F1]/70">
            Enter your account details to continue.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-[20px] border border-[#10B981]/35 bg-[#052E2B]/60 px-3 py-3 text-[#E6F4F1] placeholder-[#E6F4F1]/55 backdrop-blur focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-[#10B981]/35"
                placeholder="Email Address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-[20px] border border-[#10B981]/35 bg-[#052E2B]/60 px-3 py-3 text-[#E6F4F1] placeholder-[#E6F4F1]/55 backdrop-blur focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-[#10B981]/35"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-[20px] border border-[#10B981]/50 bg-[#064E3B]/70 px-4 py-3 text-sm font-semibold text-[#E6F4F1] shadow-[0_0_24px_rgba(16,185,129,0.22)] transition hover:bg-[#064E3B]/95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Signing in...' : 'Enter Your Journey'}
            </button>
          </div>

          <div className="text-center text-sm text-[#E6F4F1]/70">
            New to Yatara?{' '}
            <Link to="/signup" className="font-semibold text-[#10B981] hover:underline">
              Create account
            </Link>
          </div>
        </form>
      </div>
      </section>
    </div>
  );
};

export default SignIn;