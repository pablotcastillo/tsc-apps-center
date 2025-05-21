import React from 'react';
    import { motion } from 'framer-motion';

    const GoogleFormProvider = ({ formUrl }) => {
      if (!formUrl) {
        return (
          <div className="text-center text-destructive p-4 border border-destructive rounded-md">
            La URL del formulario de Google no ha sido proporcionada.
          </div>
        );
      }

      return (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="w-full aspect-[9/10] md:aspect-video overflow-hidden rounded-lg border border-input shadow-inner"
        >
          <iframe
            src={formUrl}
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
        </motion.div>
      );
    };

    export default GoogleFormProvider;