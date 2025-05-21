import React from 'react';
    import { motion } from 'framer-motion';
    import { Mail, Phone, MapPin, Users } from 'lucide-react';
    import { Button } from '@/components/ui/button';

    const ContactInfoCard = ({ icon, title, content, href }) => (
      <motion.div 
        className="bg-card p-6 rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4 text-primary flex justify-center">{icon}</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        {href ? (
          <a href={href} className="text-muted-foreground hover:text-primary transition-colors break-all">
            {content}
          </a>
        ) : (
          <p className="text-muted-foreground break-all">{content}</p>
        )}
      </motion.div>
    );

    const ContactPage = () => {
      const teamMembers = [
        { name: "Soporte General", email: "soporte@tscinnovation.com", role: "Consultas generales y tickets" },
        { name: "Equipo de Desarrollo", email: "devteam@tscinnovation.com", role: "Consultas técnicas avanzadas" },
        { name: "Administración", email: "admin@tscinnovation.com", role: "Asuntos administrativos y de cuenta" },
      ];

      return (
        <div className="space-y-12">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-primary mb-3">Contáctenos</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Estamos aquí para ayudarle. Encuentre la información de contacto que necesita o envíenos un mensaje.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ContactInfoCard 
              icon={<Mail size={40} />} 
              title="Correo Electrónico Principal" 
              content="info@tscinnovation.com"
              href="mailto:info@tscinnovation.com"
            />
            <ContactInfoCard 
              icon={<Phone size={40} />} 
              title="Teléfono de Soporte" 
              content="+1 (555) 123-4567"
              href="tel:+15551234567"
            />
            <ContactInfoCard 
              icon={<MapPin size={40} />} 
              title="Oficina Central" 
              content="123 Calle Innovación, Ciudad Tecnológica, CP 01010"
            />
          </div>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-card p-8 rounded-xl shadow-xl"
          >
            <div className="flex items-center mb-6">
              <Users size={32} className="text-primary mr-3" />
              <h2 className="text-3xl font-semibold text-primary">Nuestro Equipo de Soporte</h2>
            </div>
            <p className="text-muted-foreground mb-8">
              Contacte directamente con el equipo adecuado para su consulta.
            </p>
            <div className="space-y-6">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  className="p-5 border border-border rounded-lg hover:shadow-md transition-shadow bg-background"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <h4 className="text-lg font-semibold text-foreground">{member.name}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{member.role}</p>
                  <a href={`mailto:${member.email}`} className="text-primary hover:underline text-sm flex items-center group">
                    <Mail size={16} className="mr-1.5" /> {member.email}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center py-8"
          >
            <img-replace alt="Customer support team working together" class="w-full max-w-lg mx-auto rounded-lg shadow-md mb-6" />
            <h2 className="text-2xl font-semibold text-primary mb-3">¿Prefiere que le contactemos?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Si tiene una consulta específica y prefiere que uno de nuestros especialistas se ponga en contacto, por favor utilice nuestro formulario de soporte.
            </p>
            <a href="/support">
              <Button size="lg" className="group">
                Ir al Formulario de Soporte
              </Button>
            </a>
          </motion.section>
        </div>
      );
    };

    export default ContactPage;