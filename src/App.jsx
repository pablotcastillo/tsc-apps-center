
    import React from 'react';
    import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Home, Info, ListTree, Mail, UserCog, LogIn, LogOut, PlusCircle, Edit3, ShieldCheck } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Toaster } from '@/components/ui/toaster';
    import { useToast } from '@/components/ui/use-toast';
    import HomePage from '@/pages/HomePage';
    import AppsPage from '@/pages/AppsPage';
    import NewsPage from '@/pages/NewsPage';
    import SupportPage from '@/pages/SupportPage';
    import ContactPage from '@/pages/ContactPage';
    import AdminDashboard from '@/pages/AdminDashboard';
    import LoginPage from '@/pages/LoginPage';
    import NotFoundPage from '@/pages/NotFoundPage';
    import AppDetailsPage from '@/pages/AppDetailsPage';

    const App = () => {
      const [isAuthenticated, setIsAuthenticated] = React.useState(false);
      const [isAdmin, setIsAdmin] = React.useState(false); 
      const { toast } = useToast();

      const handleLogin = () => {
        setIsAuthenticated(true);
        setIsAdmin(true); 
        toast({ title: "Inicio de sesión exitoso", description: "Bienvenido al panel de administración." });
      };

      const handleLogout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        toast({ title: "Cierre de sesión exitoso" });
      };

      const navItemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        hover: { scale: 1.1, color: '#5E8BBD' },
      };

      const NavLink = ({ to, icon, children }) => (
        <motion.li variants={navItemVariants} whileHover="hover">
          <Link to={to} className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-300">
            {icon}
            <span>{children}</span>
          </Link>
        </motion.li>
      );
      
      return (
        <Router>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-900 dark:to-slate-800 text-gray-800 dark:text-gray-200">
            <header className="bg-[#2E5A8D] shadow-lg sticky top-0 z-50">
              <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-white flex items-center">
                  <img-replace src="/tsc-logo.svg" alt="TSC Innovation Logo" class="h-8 w-8 mr-2 filter_invert_if_dark_mode_is_not_supported_otherwise_keep_original_color_scheme" />
                  <span>TSC Apps Center</span>
                </Link>
                <motion.ul 
                  className="flex space-x-6 items-center"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                  <NavLink to="/" icon={<Home size={20} />}>Inicio</NavLink>
                  <NavLink to="/apps" icon={<ListTree size={20} />}>Aplicaciones</NavLink>
                  <NavLink to="/news" icon={<Info size={20} />}>Novedades</NavLink>
                  <NavLink to="/support" icon={<Mail size={20} />}>Soporte</NavLink>
                  <NavLink to="/contact" icon={<UserCog size={20} />}>Contacto</NavLink>
                  {isAuthenticated && isAdmin && (
                    <NavLink to="/admin" icon={<ShieldCheck size={20} />}>Admin</NavLink>
                  )}
                  {isAuthenticated ? (
                    <motion.li variants={navItemVariants} whileHover="hover">
                      <Button onClick={handleLogout} variant="ghost" className="text-white hover:bg-blue-700 hover:text-white">
                        <LogOut size={20} className="mr-1" /> Salir
                      </Button>
                    </motion.li>
                  ) : (
                    <motion.li variants={navItemVariants} whileHover="hover">
                      <Link to="/login">
                        <Button variant="ghost" className="text-white hover:bg-blue-700 hover:text-white">
                          <LogIn size={20} className="mr-1" /> Ingresar
                        </Button>
                      </Link>
                    </motion.li>
                  )}
                </motion.ul>
              </nav>
            </header>

            <main className="flex-grow container mx-auto px-6 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/apps" element={<AppsPage />} />
                <Route path="/apps/:appId" element={<AppDetailsPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminDashboard /> : <LoginPage onLogin={handleLogin} />} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            <footer className="bg-[#2E5A8D] text-white py-8 text-center">
              <div className="container mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p>&copy; {new Date().getFullYear()} TSC Innovation. Todos los derechos reservados.</p>
                  <p className="text-sm mt-1">Plataforma centralizada de aplicaciones.</p>
                </motion.div>
              </div>
            </footer>
            <Toaster />
          </div>
        </Router>
      );
    };

    export default App;
  