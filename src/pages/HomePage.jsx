
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Link } from 'react-router-dom';
    import { ArrowRight, Info, ListTree, Mail } from 'lucide-react';

    const FeatureCard = ({ icon, title, description, linkTo, linkText }) => (
      <motion.div
        className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center text-primary mb-4">
          {icon}
          <h3 className="text-xl font-semibold ml-3">{title}</h3>
        </div>
        <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
        <Link to={linkTo}>
          <Button variant="outline" className="w-full group">
            {linkText} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    );

    const HomePage = () => {
      return (
        <div className="space-y-12">
          <motion.section
            className="text-center py-16 bg-gradient-to-r from-[#2E5A8D] to-[#1E3A5D] rounded-lg shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="container mx-auto px-6">
              <motion.h1 
                className="text-5xl font-bold text-white mb-6"
                initial={{ y: -30 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
              >
                Bienvenido a TSC Apps Center
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
              >
                Su fuente centralizada para información oficial, actualizaciones y soporte de las aplicaciones de TSC Innovation.
              </motion.p>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.6 }}
              >
                <Link to="/apps">
                  <Button size="lg" className="bg-white text-[#2E5A8D] hover:bg-gray-100 transition-colors duration-300 group">
                    Explorar Aplicaciones <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.section>

          <section className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-10 text-primary">Descubra Nuestras Funcionalidades</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<ListTree size={32} />}
                title="Catálogo de Aplicaciones"
                description="Explore todas las aplicaciones desarrolladas por TSC Innovation, vea sus últimas versiones y notas de actualización."
                linkTo="/apps"
                linkText="Ver Aplicaciones"
              />
              <FeatureCard
                icon={<Info size={32} />}
                title="Últimas Novedades"
                description="Manténgase al día con los anuncios importantes, nuevas características y mejoras en nuestras aplicaciones."
                linkTo="/news"
                linkText="Leer Novedades"
              />
              <FeatureCard
                icon={<Mail size={32} />}
                title="Soporte Técnico"
                description="¿Necesita ayuda? Reporte incidentes o problemas fácilmente a través de nuestro sistema de soporte."
                linkTo="/support"
                linkText="Obtener Soporte"
              />
            </div>
          </section>
          
          <section className="container mx-auto px-6 py-12">
             <div className="bg-card p-8 rounded-lg shadow-lg text-center">
                <img-replace alt="Team working on innovative solutions" class="w-full max-w-md mx-auto rounded-md mb-6 shadow-md" />
                <h2 className="text-3xl font-semibold text-primary mb-4">Innovación Constante</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  En TSC Innovation, estamos comprometidos con la mejora continua y el desarrollo de soluciones que impulsen su éxito. El TSC Apps Center es un reflejo de este compromiso.
                </p>
             </div>
          </section>

        </div>
      );
    };

    export default HomePage;
  