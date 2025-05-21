import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';
    import { ArrowRight, Briefcase, Newspaper, GraduationCap, Mail, Settings, GitBranch, BarChart, HelpCircle } from 'lucide-react';

    const MainFeatureCard = ({ icon, title, description, linkTo, linkText, delay }) => (
      <motion.div
        className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
      >
        <div className="flex items-center text-primary mb-4">
          {icon}
          <h3 className="text-xl font-semibold ml-3 text-foreground">{title}</h3>
        </div>
        <p className="text-muted-foreground mb-4 flex-grow text-sm">{description}</p>
        <Link to={linkTo}>
          <Button variant="outline" className="w-full group text-sm py-2 px-3 h-auto">
            {linkText} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    );

    const FunctionalityCard = ({ icon, title, description, index }) => (
      <motion.div
        className="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-border flex flex-col items-center text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <div className="p-3 bg-primary/10 rounded-full mb-4 text-primary">{icon}</div>
        <h4 className="text-lg font-semibold text-primary mb-2">{title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </motion.div>
    );

    const HomePage = ({ baseHomepageUrl }) => {
      const functionalities = [
        { icon: <GitBranch size={24} />, title: "Gestión de Versiones", description: "Historial semántico (v1.2.3), rollback, descripciones en markdown." },
        { icon: <Newspaper size={24} />, title: "Novedades Recientes", description: "Feed de noticias con resumen conciso (≤200 caracteres) y enlace a detalle." },
        { icon: <HelpCircle size={24} />, title: "Soporte Centralizado", description: "Google Forms → Google Sheets → notificaciones internas para una rápida atención." },
        { icon: <BarChart size={24} />, title: "Seguimiento Automatizado", description: "Cada reporte se almacena con timestamp, prioridad y estado (Abierto/En progreso/Cerrado)." },
        { icon: <GraduationCap size={24} />, title: "Capacitaciones y Docs", description: "Archivos descargables (PDF, Google Docs embebidos) y vídeos tutoriales." },
        { icon: <Settings size={24} />, title: "Configuración Flexible", description: "Adaptamos nuestras soluciones a las necesidades específicas de tu proyecto." },
      ];

      return (
        <div className="space-y-12 md:space-y-16">
          <motion.section
            className="text-center py-12 md:py-16 bg-gradient-to-br from-[#2E5A8D] to-[#1e3a5c] rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <motion.h1 
                className="text-4xl sm:text-5xl font-bold text-white mb-4 sm:mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
              >
                Bienvenido a TSC Apps Center
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
              >
                Su plataforma centralizada para información oficial, versiones, novedades, capacitaciones y soporte de las aplicaciones de TSC Innovation.
              </motion.p>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.6 }}
              >
                <Link to="/apps-versions">
                  <Button size="lg" className="bg-white text-[#2E5A8D] hover:bg-gray-100 transition-colors duration-300 group text-base px-6 py-3 rounded-md shadow-md hover:shadow-lg">
                    Explorar Aplicaciones <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.section>

          <section className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-semibold text-center mb-10 text-primary">Acceso Rápido</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <MainFeatureCard
                icon={<Briefcase size={28} />}
                title="Versiones de Apps"
                description="Consulte las últimas versiones, notas de lanzamiento y enlaces de descarga/acceso."
                linkTo="/apps-versions"
                linkText="Ver Versiones"
                delay={0.1}
              />
              <MainFeatureCard
                icon={<Newspaper size={28} />}
                title="Últimas Novedades"
                description="Manténgase al día con anuncios importantes y mejoras en nuestras aplicaciones."
                linkTo="/news"
                linkText="Leer Novedades"
                delay={0.2}
              />
              <MainFeatureCard
                icon={<GraduationCap size={28} />}
                title="Capacitaciones"
                description="Acceda a tutoriales, videos y documentación para optimizar el uso de nuestras herramientas."
                linkTo="/training"
                linkText="Ver Capacitaciones"
                delay={0.3}
              />
              <MainFeatureCard
                icon={<Mail size={28} />}
                title="Soporte Técnico"
                description="Reporte incidentes o problemas fácilmente a través de nuestro sistema de soporte."
                linkTo="/support"
                linkText="Obtener Soporte"
                delay={0.4}
              />
            </div>
          </section>
          
          <section className="container mx-auto px-4 sm:px-6 py-12 md:py-16 bg-gray-50 dark:bg-slate-800 rounded-lg">
            <h2 className="text-3xl font-semibold text-center mb-10 text-primary">Nuestras Funcionalidades Destacadas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {functionalities.map((func, index) => (
                <FunctionalityCard 
                  key={index}
                  icon={func.icon}
                  title={func.title}
                  description={func.description}
                  index={index}
                />
              ))}
            </div>
          </section>

          <section className="container mx-auto px-4 sm:px-6 text-center">
            <img-replace alt="Team working on innovative solutions at TSC Innovation" class="w-full max-w-lg mx-auto rounded-lg shadow-md mb-6" />
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-3">Innovación Constante</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              En TSC Innovation, estamos comprometidos con la mejora continua y el desarrollo de soluciones que impulsen su éxito. El TSC Apps Center es un reflejo de este compromiso, facilitando el acceso a la información y el soporte que necesita.
            </p>
            {baseHomepageUrl && (
                <div className="mt-8">
                    <a href={baseHomepageUrl}>
                        <Button variant="link" className="text-primary text-lg">
                            Volver al inicio principal de TSC Innovation
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </a>
                </div>
            )}
          </section>
        </div>
      );
    };

    export default HomePage;