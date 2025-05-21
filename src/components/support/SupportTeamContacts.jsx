import React from 'react';
    import { motion } from 'framer-motion';
    import { Mail, Users } from 'lucide-react';

    const supportTeam = [
      { name: "Alejandro Vásquez Villalobos", email: "avasquev@tscinnovation.com" },
      { name: "Andres Delboy", email: "2adrs8@gmail.com" },
      { name: "Alejandra Lizeth Salas", email: "asalastal@unsa.edu.pe" },
      { name: "Luis Cristopher Larios", email: "clarios@tscinnovation.com" },
      { name: "Abed Norabuena Guiramay", email: "anorabue@tscinnovation.com" },
      { name: "Juan Deyby", email: "deyby57@gmail.com" },
      { name: "Bertha Burgos", email: "berthaburgosmendez@gmail.com" },
    ];

    const SupportTeamContacts = () => {
      return (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card p-8 rounded-xl shadow-xl"
        >
          <div className="flex items-center mb-6">
            <Users size={32} className="text-primary mr-3" />
            <h2 className="text-3xl font-semibold text-primary">Contactos del Equipo de Soporte</h2>
          </div>
          <p className="text-muted-foreground mb-8">
            Si prefiere, puede contactar directamente a un miembro de nuestro equipo.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {supportTeam.map((member, index) => (
              <motion.div
                key={index}
                className="p-5 border border-border rounded-lg hover:shadow-md transition-shadow bg-background flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="text-md font-semibold text-foreground">{member.name}</h4>
                  <a href={`mailto:${member.email}`} className="text-primary hover:underline text-sm flex items-center group">
                    <Mail size={14} className="mr-1.5" /> {member.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      );
    };

    export default SupportTeamContacts;