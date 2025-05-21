
    import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/components/ui/use-toast';
    import { LogIn, Mail, Key } from 'lucide-react';

    const LoginPage = ({ onLogin }) => {
      const navigate = useNavigate();
      const { toast } = useToast();
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call for authentication
        // In a real app, this would involve a call to a backend (e.g., Supabase Auth)
        // For this example, we'll use a mock login.
        // IMPORTANT: This is NOT secure for a real application.
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (email === 'admin@tsc.com' && password === 'password123') {
          onLogin(); // This will set isAuthenticated and isAdmin in App.jsx
          toast({
            title: 'Inicio de Sesión Exitoso',
            description: 'Bienvenido al panel de administración.',
          });
          navigate('/admin');
        } else if (email && password) { // Basic user login (no admin rights)
           onLogin(); // This will set isAuthenticated in App.jsx, but not isAdmin
           toast({
            title: 'Inicio de Sesión Exitoso',
            description: 'Bienvenido a TSC Apps Center.',
          });
          navigate('/'); // Redirect to home for regular users
        }
        else {
          toast({
            title: 'Error de Autenticación',
            description: 'Correo electrónico o contraseña incorrectos.',
            variant: 'destructive',
          });
        }
        setIsLoading(false);
      };
      
      const handleGoogleLogin = () => {
        // Placeholder for Google Sign-In
        // In a real app, this would trigger the Google OAuth flow (e.g., with Supabase)
        toast({
          title: "Inicio de Sesión con Google",
          description: "Esta funcionalidad se conectará con Google Sign-In.",
        });
        // For demo, simulate admin login if a specific action is taken
        // This is NOT how real Google Sign-In works.
        // For example, if we want to quickly test admin flow:
        // onLogin(); navigate('/admin'); 
      };

      return (
        <motion.div 
          className="flex flex-col items-center justify-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl shadow-2xl">
            <div className="text-center">
              <LogIn size={48} className="mx-auto text-primary mb-4" />
              <h1 className="text-3xl font-bold text-primary">Iniciar Sesión</h1>
              <p className="mt-2 text-muted-foreground">Acceda a su cuenta o al panel de administración.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="su@correo.com"
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                 <div className="relative mt-1">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full group" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <motion.div 
                      className="mr-2 h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Ingresando...
                  </>
                ) : (
                  <>
                    Ingresar <LogIn size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  O continuar con
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isLoading}>
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
              Iniciar Sesión con Google
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              ¿No tiene una cuenta? <a href="/support" className="font-medium text-primary hover:underline">Contacte a soporte</a>.
            </p>
          </div>
        </motion.div>
      );
    };

    export default LoginPage;
  