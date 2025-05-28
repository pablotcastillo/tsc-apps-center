// src/App.jsx
import React from 'react';
import ReactDOM from "react-dom/client";
import WithAuthData from "@/components/WithAuthData" 
import { AuthProvider } from "@/context/AuthContext"; // Ajusta el path
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RequireAuth from "./components/RequireAuth";
import { motion } from 'framer-motion';
import {
  Home,
  Info,
  ListTree,
  Mail,
  GraduationCap,
  UserCog,
  LogIn,
  LogOut,
  PlusCircle,
  Edit3,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import HomePage from '@/pages/HomePage';
import TrainingPage from '@/pages/TrainingPage';
import AppsPage from '@/pages/AppsPage';
import CatalogPage from '@/pages/CatalogPage';  
import AppDetailsPage from '@/pages/AppDetailsPage';
import NewsPage from '@/pages/NewsPage';
import SupportPage from '@/pages/SupportPage';
import ContactPage from '@/pages/ContactPage';
import AdminDashboard from '@/pages/AdminDashboard';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const { toast } = useToast();

  const handleLogin = (userRole) => {
    setIsAuthenticated(true);
    setIsAdmin(userRole === 'admin');
    toast({
      title: 'Sesión iniciada',
      description: `Bienvenido, rol: ${userRole}`,
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    toast({
      title: 'Sesión cerrada',
      description: 'Has salido de tu cuenta.',
    });
  };

  return (
    
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-white from-slate-900 dark:to-slate-800 text-gray-800 dark:text-gray-200">
          <header className="bg-[#2E5A8D] shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-white flex items-center">
                <img
                  src="/tsc.svg"
                  alt="TSC Innovation Logo"
                  className="h-8 w-auto mr-2"
                />
                TSC Innovation
              </Link>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/" className="text-white hover:underline flex items-center">
                    <Home className="mr-1" /> Inicio
                  </Link>
                </li>
                <nav>
                  <Link to="/catalog" className="text-white hover:underline flex items-center">
                    <ListTree className="mr-1" /> Aplicaciones
                  </Link>
                </nav>
                <li>
                  <Link to="/training" className="text-white hover:underline flex items-center">
                    <GraduationCap className="mr-1" /> Capacitación
                  </Link>
                </li>
                <li>
                  <Link to="/news" className="text-white hover:underline flex items-center">
                    <Info className="mr-1" /> Noticias
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-white hover:underline flex items-center">
                    <ShieldCheck className="mr-1" /> Soporte
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white hover:underline flex items-center">
                    <Mail className="mr-1" /> Contacto
                  </Link>
                </li>
              </ul>
              <div className="flex items-center space-x-2">
                {isAuthenticated ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      <LogOut className="mr-1" /> Salir
                    </Button>
                  </>
                ) : (
                <Link to="/login">
                  <Button variant="default" size="sm">
                    <LogIn className="mr-1" /> Iniciar Sesión
                  </Button>
                </Link>
                )}
              </div>
            </nav>
          </header>
            <main className="flex-grow container mx-auto px-6 py-10">
              <Routes>
                <Route
                  path="/"
                  element={
                    <WithAuthData>
                      {(rol) => <HomePage showAdmin={rol === "admin"} />}
                    </WithAuthData>
                  }
                />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/catalog/:appId" element={<AppDetailsPage />} />
                <Route path="/training" element={<TrainingPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/contact" element={<ContactPage />} />

                <Route
                  path="/admin"
                  element={
                    <RequireAuth requiredRole="admin">
                      <AdminDashboard />
                    </RequireAuth>
                  }
                />

                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

          <footer className="bg-gradient-to-t to-slate-800 from-slate-900 text-gray-400 py-6">
            <div className="container mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p>&copy; {new Date().getFullYear()} TSC Innovation. Todos los derechos reservados.</p>
                <p className="text-sm mt-1">Plataforma centralizada de aplicaciones.</p>
              </motion.div>
            </div>
          </footer>

          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
