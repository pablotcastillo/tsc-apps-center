import React from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { AlertTriangle, Home } from 'lucide-react';

    const NotFoundPage = ({ baseHomepageUrl }) => {
      return (
        <motion.div 
          className="flex flex-col items-center justify-center text-center py-12 sm:py-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AlertTriangle className="h-20 w-20 sm:h-24 sm:w-24 text-destructive mb-6 sm:mb-8" />
          <h1 className="text-5xl sm:text-6xl font-bold text-primary mb-3 sm:mb-4">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 sm:mb-6">Página No Encontrada</h2>
          <p className="text-md sm:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-md mx-auto px-4">
            Lo sentimos, la página que está buscando no existe o ha sido movida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/">
              <Button size="lg" className="group w-full sm:w-auto text-base px-6 py-3 rounded-md shadow-md hover:shadow-lg">
                <Home className="mr-2 h-5 w-5" />
                Ir a Inicio (App Center)
              </Button>
            </Link>
            {baseHomepageUrl && (
                 <a href={baseHomepageUrl}>
                    <Button size="lg" variant="outline" className="group w-full sm:w-auto text-base px-6 py-3 rounded-md shadow-md hover:shadow-lg">
                        <Home className="mr-2 h-5 w-5" />
                        Ir a Inicio Principal
                    </Button>
                 </a>
            )}
          </div>
          <div className="mt-12 sm:mt-16">
            <img-replace alt="Ilustración de una brújula perdida o un mapa" class="w-48 h-auto sm:w-64 opacity-60" />
          </div>
        </motion.div>
      );
    };

    export default NotFoundPage;