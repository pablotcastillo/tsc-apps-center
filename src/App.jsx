import React from 'react';
    import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Home, Briefcase, Newspaper, GraduationCap, Mail, UserCog, LogIn, LogOut, ShieldCheck, Settings, GitBranch, BarChart, HelpCircle } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Toaster } from '@/components/ui/toaster';
    import { useToast } from '@/components/ui/use-toast';
    import HomePage from '@/pages/HomePage';
    import AppsAndVersionsPage from '@/pages/AppsAndVersionsPage'; // Renamed AppsPage to AppsAndVersionsPage
    import NewsPage from '@/pages/NewsPage';
    import SupportPage from '@/pages/SupportPage';
    import TrainingPage from '@/pages/TrainingPage'; // New Page for Capacitaciones
    import AdminDashboard from '@/pages/AdminDashboard';
    import LoginPage from '@/pages/LoginPage';
    import NotFoundPage from '@/pages/NotFoundPage';
    import AppDetailsPage from '@/pages/AppDetailsPage'; // Kept for specific app details if needed later

    const App = () => {
      const [isAuthenticated, setIsAuthenticated] = React.useState(false);
      const [isAdmin, setIsAdmin] = React.useState(false); 
      const { toast } = useToast();
      const baseHomepageUrl = "https://pablotcastillo.github.io/tsc-apps-center/";

      const handleLogin = () => {
        setIsAuthenticated(true);
        // For simplicity, let's assume login also grants admin for now.
        // In a real app, this would be determined by user roles from backend.
        setIsAdmin(true); 
        toast({ title: "Inicio de sesión exitoso", description: "Bienvenido." });
      };

      const handleLogout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        toast({ title: "Cierre de sesión exitoso" });
      };

      const navItemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        hover: { scale: 1.05, color: '#A1C4E5' }, // Lighter blue for hover
        tap: { scale: 0.95 }
      };
      
      // Use a regular <a> tag for the main "Inicio" link to GitHub Pages
      const HomeNavLink = ({ icon, children }) => (
        <motion.li variants={navItemVariants} whileHover="hover" whileTap="tap">
          <a href={baseHomepageUrl} className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-300">
            {icon}
            <span>{children}</span>
          </a>
        </motion.li>
      );

      const InternalNavLink = ({ to, icon, children }) => (
        <motion.li variants={navItemVariants} whileHover="hover" whileTap="tap">
          <Link to={to} className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-300">
            {icon}
            <span>{children}</span>
          </Link>
        </motion.li>
      );
      
      return (
        <Router basename="/tsc-apps-center">
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 text-gray-800 dark:text-gray-100">
            <header className="bg-[#2E5A8D] shadow-lg sticky top-0 z-50">
              <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                <a href={baseHomepageUrl} className="text-xl sm:text-2xl font-bold text-white flex items-center">
                  <img src="/tsc-apps-center/tsc-logo.svg" alt="TSC Innovation Logo" className="h-8 w-8 mr-2 " />
                  <span>TSC Apps Center</span>
                </a>
                <motion.ul 
                  className="flex flex-wrap justify-end space-x-3 sm:space-x-4 items-center"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                >
                  <HomeNavLink icon={<Home size={18} />}>Inicio</HomeNavLink>
                  <InternalNavLink to="/apps-versions" icon={<Briefcase size={18} />}>Versiones</InternalNavLink>
                  <InternalNavLink to="/news" icon={<Newspaper size={18} />}>Novedades</InternalNavLink>
                  <InternalNavLink to="/training" icon={<GraduationCap size={18} />}>Capacitaciones</InternalNavLink>
                  <InternalNavLink to="/support" icon={<Mail size={18} />}>Soporte</InternalNavLink>
                  {isAuthenticated && isAdmin && (
                    <InternalNavLink to="/admin" icon={<ShieldCheck size={18} />}>Admin</InternalNavLink>
                  )}
                  {isAuthenticated ? (
                    <motion.li variants={navItemVariants} whileHover="hover" whileTap="tap">
                      <Button onClick={handleLogout} variant="ghost" className="text-white hover:bg-[#254a70] hover:text-white px-2 py-1 h-auto text-sm sm:px-3 sm:py-1.5">
                        <LogOut size={18} className="mr-1" /> Salir
                      </Button>
                    </motion.li>
                  ) : (
                     <motion.li variants={navItemVariants} whileHover="hover" whileTap="tap">
                      <Link to="/login">
                        <Button variant="ghost" className="text-white hover:bg-[#254a70] hover:text-white px-2 py-1 h-auto text-sm sm:px-3 sm:py-1.5">
                          <LogIn size={18} className="mr-1" /> Ingresar
                        </Button>
                      </Link>
                    </motion.li>
                  )}
                </motion.ul>
              </nav>
            </header>

            <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage baseHomepageUrl={baseHomepageUrl} />} />
                  <Route path="/apps-versions" element={<AppsAndVersionsPage />} />
                  <Route path="/apps/:appId" element={<AppDetailsPage />} /> 
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/training" element={<TrainingPage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminDashboard /> : <LoginPage onLogin={handleLogin} />} />
                  <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                  <Route path="*" element={<NotFoundPage baseHomepageUrl={baseHomepageUrl}/>} />
                </Routes>
              </AnimatePresence>
            </main>

            <footer className="bg-[#2E5A8D] text-white py-6 text-center">
              <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-sm">&copy; {new Date().getFullYear()} TSC Innovation. Todos los derechos reservados.</p>
                  <p className="text-xs mt-1">
                    <a href={baseHomepageUrl} className="hover:underline">Volver al inicio</a>
                  </p>
                </motion.div>
              </div>
            </footer>
            <Toaster />
          </div>
        </Router>
      );
    };

    export default App;