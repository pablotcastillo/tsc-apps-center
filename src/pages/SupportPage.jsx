import React from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Mail, Users, Send, ExternalLink, Settings, Info, BarChart, HelpCircle } from 'lucide-react';
    import SupportTeamContacts from '@/components/support/SupportTeamContacts';
    import OtherFeaturesSection from '@/components/support/OtherFeaturesSection';
    import GoogleFormProvider from '@/components/support/GoogleFormProvider';

    const SupportPage = () => {
      const googleFormUrl = "https://forms.gle/m4tPHvFQvm5rfhHo6";

      return (
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <HelpCircle size={48} className="mx-auto text-primary mb-4" />
            <h1 className="text-4xl font-bold text-primary mb-3">Soporte Técnico</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ¿Necesita ayuda? Utilice nuestro formulario para reportar un incidente o contacte directamente a nuestro equipo.
            </p>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-card p-8 rounded-xl shadow-2xl"
          >
            <h2 className="text-3xl font-semibold text-primary mb-6 text-center">Reportar un Incidente</h2>
            
            <div className="mt-8 text-center">
              <Button 
                size="lg" 
                className="group" 
                onClick={() => window.open(googleFormUrl, '_blank')}
              >
                Enviar Reporte Técnico <ExternalLink size={18} className="ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Tu reporte será enviado automáticamente a nuestro equipo y será registrado en nuestra hoja de seguimiento para una pronta atención. ¡Gracias!
            </p>
          </motion.section>

          <SupportTeamContacts />
          
          <OtherFeaturesSection />

        </div>
      );
    };

    export default SupportPage;