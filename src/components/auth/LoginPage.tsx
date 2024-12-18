import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
        // Don't navigate after signup as they need to verify email
      } else {
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "Successfully signed in.",
        });
        navigate("/meditate");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast({
        title: "Error",
        description:
          error?.message || "An error occurred during authentication.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-500">
            {isSignUp
              ? "Start your mindfulness journey"
              : "Continue your mindfulness journey"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full"
              minLength={6}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isSignUp ? "Creating Account..." : "Signing In..."}
              </>
            ) : isSignUp ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="text-center space-y-2">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-blue-600 hover:underline"
            type="button"
            disabled={isLoading}
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>
          {!isSignUp && (
            <div>
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() => {
                  toast({
                    title: "Coming soon",
                    description:
                      "Password reset functionality will be added soon.",
                  });
                }}
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>
          )}
        </div>

        {isSignUp && (
          <p className="text-sm text-gray-500 text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy.
            You'll need to verify your email before signing in.
          </p>
        )}
      </Card>
    </div>
  );
};

export default LoginPage;
