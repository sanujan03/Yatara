
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await register(formData);
    setIsLoading(false);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[#020617] px-4 py-10">
      <Card className="w-full max-w-lg p-8" padding={false}>
        <div className="space-y-8 p-8">
        <div>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#E6F4F1]/70">Get Started</p>
          <h2 className="mt-2 text-center text-3xl font-bold text-[#E6F4F1]">Create Account</h2>
          <p className="mt-2 text-center text-sm text-[#E6F4F1]/70">
            Start planning your next journey in minutes.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              type="text"
              icon={FiUser}
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              icon={FiMail}
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              icon={FiLock}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />

            <Input
              label="Phone Number (optional)"
              name="phone"
              type="tel"
              icon={FiPhone}
              placeholder="+94 77 123 4567"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              Create Account
            </Button>
          </div>

          <div className="text-center text-sm">
            <span className="text-[#E6F4F1]/70">Already have an account? </span>
            <Link to="/signin" className="font-medium text-[#10B981] hover:underline">
              Sign In
            </Link>
          </div>
        </form>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;