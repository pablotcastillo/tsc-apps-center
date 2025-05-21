
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { AlertTriangle, Home } from 'lucide-react';

    const NotFoundPage = () => {
      return (
        <motion.div 
          className="flex flex-col items-center justify-center text-center py-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AlertTriangle className="h-24 w-24 text-destructive mb-8" />
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-foreground mb-6">Página No Encontrada</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-md">
            Lo sentimos, la página que está buscando no existe o ha sido movida.
          </p>
          <Link to="/">
            <Button size="lg" className="group">
              <Home className="mr-2 h-5 w-5" />
              Volver a Inicio
            </Button>
          </Link>
          <div className="mt-16">
            <img  alt="Ilustración de una brújula perdida" class="w-64 h-auto opacity-50"  src="https://images.unsplash.com/photo-1583936073869-f62de4d7d4da" />
          </div>
        </motion.div>
      );
    };

    export default NotFoundPage;
  