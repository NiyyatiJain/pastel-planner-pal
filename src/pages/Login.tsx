
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, User, Heart, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const affirmations = [
  "You are capable of amazing things.",
  "Every day, you're growing stronger.",
  "Your potential is limitless.",
  "You have the power to create change.",
  "You are worthy of all good things.",
  "Your presence makes a difference.",
];

// Bubble component for background animation
const Bubble = ({ size, duration, delay, left }: { size: number, duration: number, delay: number, left: string }) => (
  <div
    className="absolute rounded-full bg-white/20 backdrop-blur-sm animate-float pointer-events-none"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      bottom: '-100px',
      left,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    }}
  />
);

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [customAffirmation, setCustomAffirmation] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get a random affirmation
  const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin) {
      // Registration logic
      if (name && email && password) {
        // If user added a custom affirmation, add it to localStorage
        if (customAffirmation) {
          const storedAffirmations = JSON.parse(localStorage.getItem('customAffirmations') || '[]');
          storedAffirmations.push(customAffirmation);
          localStorage.setItem('customAffirmations', JSON.stringify(storedAffirmations));
        }
        
        // In a real app, we would send this to a backend
        localStorage.setItem('user', JSON.stringify({ name, email }));
        setRegistered(true);
        toast({
          title: "Registration Successful",
          description: "Welcome to our community!",
        });
      }
    } else {
      // Login logic
      if (email && password) {
        // In a real app, this would verify credentials with a backend
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        navigate("/");
      }
    }
  };

  // Array of bubbles with different sizes and positions
  const bubbles = [
    { size: 60, duration: 8, delay: 0, left: '10%' },
    { size: 40, duration: 10, delay: 2, left: '20%' },
    { size: 80, duration: 12, delay: 1, left: '35%' },
    { size: 30, duration: 9, delay: 3, left: '50%' },
    { size: 70, duration: 11, delay: 2, left: '65%' },
    { size: 50, duration: 10, delay: 1, left: '80%' },
    { size: 55, duration: 9, delay: 4, left: '90%' },
  ];

  if (registered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFE5EC] via-[#FFC2D4] to-[#FFE5EC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Floating bubbles in the background */}
        {bubbles.map((bubble, index) => (
          <Bubble key={index} {...bubble} />
        ))}
        
        <Card className="w-full max-w-md bg-white/90 backdrop-blur relative z-10">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Sparkles className="h-8 w-8 text-pink-500 animate-pulse" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800">Thank You!</CardTitle>
            <CardDescription className="text-gray-600">
              Your registration is complete. We're so happy to have you join us!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="p-6 bg-pastel-pink/20 rounded-lg">
              <p className="text-lg font-medium italic text-gray-700">"{randomAffirmation}"</p>
              {customAffirmation && (
                <p className="text-sm mt-2 text-pink-600 font-medium">Your affirmation: "{customAffirmation}"</p>
              )}
            </div>
            <p className="text-gray-600">We've created your account and you're ready to start your journey.</p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700"
              onClick={() => navigate("/")}
            >
              Continue to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE5EC] via-[#FFC2D4] to-[#FFE5EC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Floating bubbles in the background */}
      {bubbles.map((bubble, index) => (
        <Bubble key={index} {...bubble} />
      ))}
      
      <Card className="w-full max-w-md bg-white/90 backdrop-blur relative z-10 border-none shadow-lg">
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-pink-500 rounded-full p-3 shadow-lg">
          <Heart className="h-6 w-6 text-white" />
        </div>
        <CardHeader className="space-y-1 pt-8">
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin 
              ? "Enter your credentials to sign in" 
              : "Fill in your details to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="text-gray-500 h-4 w-4" />
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                </div>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  className="transition-all duration-300 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="text-gray-500 h-4 w-4" />
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-all duration-300 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lock className="text-gray-500 h-4 w-4" />
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="transition-all duration-300 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Heart className="text-pink-500 h-4 w-4" />
                  <label htmlFor="custom-affirmation" className="text-sm font-medium">
                    Your Personal Affirmation (optional)
                  </label>
                </div>
                <Input
                  id="custom-affirmation"
                  placeholder="Add your own affirmation"
                  value={customAffirmation}
                  onChange={(e) => setCustomAffirmation(e.target.value)}
                  className="transition-all duration-300 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            )}

            <div className="p-4 bg-pastel-pink/20 rounded-lg flex items-center gap-3">
              <Heart className="text-pink-500 h-5 w-5 flex-shrink-0 animate-pulse" />
              <p className="text-sm italic text-gray-700">"{randomAffirmation}"</p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-pink-600 hover:underline focus:outline-none transition-colors duration-300"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
