import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Mail, Users, Send, ExternalLink, HelpCircle, GitBranch, Newspaper, BarChart, Settings, GraduationCap } from 'lucide-react';
    import { Link } from 'react-router-dom';

    const supportTeam = [
      { name: "Alejandro Vásquez Villalobos", email: "avasquev@tscinnovation.com", role: "Responsable principal" },
      { name: "Andres Delboy", email: "2adrs8@gmail.com", role: "Soporte técnico" },
      { name: "Alejandra Lizeth Salas", email: "asalastal@unsa.edu.pe", role: "Soporte técnico" },
      { name: "Luis Cristopher Larios", email: "clarios@tscinnovation.com", role: "Soporte técnico" },
      { name: "Abed Norabuena Guiramay", email: "anorabue@tscinnovation.com", role: "Soporte técnico" },
      { name: "Juan Deyby", email: "deyby57@gmail.com", role: "Soporte técnico" },
      { name: "Bertha Burgos", email: "berthaburgosmendez@gmail.com", role: "Soporte técnico" },
    ];
    
    const googleFormUrl = "https://forms.gle/m4tPHvFQvm5rfhHo6";

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
        {link && (
          <Link to={link} className="mt-auto">
            <Button variant="outline" className="w-full group text-sm">
              Más Información
            </Button>
          </Link>
        )}
      </motion.div>
    );

    const SupportPage = () => {
      const functionalities = [
        { icon: <GitBranch size={28} className="text-primary" />, title: "Gestión de Versiones", description: "Historial semántico (v1.2.3), rollback, descripciones en markdown.", link: "/apps-versions" },
        { icon: <Newspaper size={28} className="text-primary" />, title: "Novedades Recientes", description: "Feed de noticias con resumen ≤200 caracteres y enlace a detalle.", link: "/news" },
        { icon: <HelpCircle size={28} className="text-primary" />, title: "Soporte Técnico Centralizado", description: "Google Forms → Google Sheets → notificaciones internas." },
        { icon: <BarChart size={28} className="text-primary" />, title: "Seguimiento Automatizado", description: "Cada reporte se almacena con timestamp, prioridad y estado (Abierto/En progreso/Cerrado)." },
        { icon: <GraduationCap size={28} className="text-primary" />, title: "Capacitaciones y Documentación", description: "Archivos descargables (PDF, Google Docs embebidos) y vídeos.", link: "/training" },
      ];

      return (
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <HelpCircle size={48} className="mx-auto text-primary mb-4" />
            <h1 className="text-4xl font-bold text-primary mb-3">Soporte Técnico</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              ¿Tuviste un problema o necesitas ayuda? Completa el formulario y nuestro equipo de soporte (liderado por Alejandro Vásquez Villalobos) te contactará a la brevedad. Cada reporte se registra automáticamente en Google Sheets para seguimiento.
            </p>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-card p-6 sm:p-8 rounded-xl shadow-2xl"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-6 text-center">Enviar Reporte Técnico</h2>
            
            <div className="w-full aspect-[9/11] sm:aspect-[5/4] md:aspect-video overflow-hidden rounded-lg border border-input shadow-inner mb-6">
              <iframe
                src={googleFormUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                title="Google Form para Reporte Técnico"
                className="rounded-lg"
                loading="lazy"
              >
                Cargando formulario…
              </iframe>
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="group text-base px-6 py-3 rounded-md shadow-md hover:shadow-lg" 
                onClick={() => window.open(googleFormUrl, '_blank')}
              >
                Abrir Formulario en Nueva Pestaña <ExternalLink size={18} className="ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card p-6 sm:p-8 rounded-xl shadow-xl"
          >
            <div className="flex items-center mb-6">
              <Users size={28} sm:size={32} className="text-primary mr-3" />
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Equipo de Soporte</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
              {supportTeam.map((member, index) => (
                <motion.div
                  key={index}
                  className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow bg-background flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <img-replace alt={`Avatar de ${member.name}`} class="w-10 h-10 rounded-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{member.name}</h4>
                    {member.role && <p className="text-xs text-muted-foreground">{member.role}</p>}
                    <a href={`mailto:${member.email}`} className="text-primary hover:underline text-xs flex items-center group">
                      <Mail size={12} className="mr-1" /> {member.email}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-50 dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-xl"
          >
            <div className="flex items-center mb-6">
              <Settings size={28} sm:size={32} className="text-primary mr-3" />
              <h2 className="text-2xl sm:text-3xl font-semibold text-primary">Nuestras Funcionalidades Clave</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {functionalities.map((feature, index) => (
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
        </div>
      );
    };

    export default SupportPage;