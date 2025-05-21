import React from 'react';
    import { motion } from 'framer-motion';
    import { Settings, Info, BarChart, HelpCircle, GitBranch, Newspaper } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';


    const featureCards = [
      { 
        icon: <GitBranch size={28} className="text-primary" />, 
        title: "Gestión de Versiones", 
        description: "Consulte el historial de versiones y las notas de cada actualización de nuestras aplicaciones.",
        link: "/apps" 
      },
      { 
        icon: <Newspaper size={28} className="text-primary" />, 
        title: "Novedades Recientes", 
        description: "Manténgase al día con los últimos anuncios, características y mejoras en nuestros productos.",
        link: "/news"
      },
      { 
        icon: <HelpCircle size={28} className="text-primary" />, 
        title: "Sistema de Soporte", 
        description: "Reporte incidentes y obtenga asistencia técnica de nuestro equipo especializado.",
        link: "/support"
      },
      { 
        icon: <BarChart size={28} className="text-primary" />, 
        title: "Seguimiento de Actualizaciones", 
        description: "Información detallada sobre el progreso y el estado de las actualizaciones planificadas.",
        link: "/news" // Or a dedicated updates page if available
      },
    ];

    const FeatureCard = ({ icon, title, description, link, index }) => (
      <motion.div
        className="bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border border-border"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="flex items-center text-primary mb-4">
          {icon}
          <h3 className="text-xl font-semibold ml-3 text-foreground">{title}</h3>
        </div>
        <p className="text-muted-foreground mb-4 flex-grow text-sm">{description}</p>
        <Link to={link} className="mt-auto">
          <Button variant="outline" className="w-full group text-sm">
            Más Información
          </Button>
        </Link>
      </motion.div>
    );

    const OtherFeaturesSection = () => {
      return (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card p-8 rounded-xl shadow-xl"
        >
          <div className="flex items-center mb-6">
            <Settings size={32} className="text-primary mr-3" />
            <h2 className="text-3xl font-semibold text-primary">Otras Funcionalidades</h2>
          </div>
          <p className="text-muted-foreground mb-8">
            Explore otras secciones importantes de nuestra plataforma para mantenerse informado y sacar el máximo provecho de nuestras herramientas.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {featureCards.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                link={feature.link}
                index={index}
              />
            ))}
          </div>
        </motion.section>
      );
    };

    export default OtherFeaturesSection;