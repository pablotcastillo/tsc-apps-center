import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from '@/components/ui/dialog';
    import { Download, PlayCircle, Smartphone, Globe, BookOpen, Video, Info, FileText } from 'lucide-react';

    const appsData = [
      {
        id: 'tsc-app-mobile',
        name: 'TSC APP (Móvil)',
        description: 'Aplicación móvil para gestión y operaciones en campo. Acceda a sus datos y funcionalidades clave desde cualquier lugar.',
        downloadLink: '#', // Placeholder for APK or Play/App Store link
        downloadType: 'playstore', // 'apk', 'playstore', 'appstore'
        tutorialVideoId: 'dQw4w9WgXcQ', // Example YouTube Video ID
        platformIcon: <Smartphone size={32} className="text-primary" />,
      },
      {
        id: 'tsc-app-web',
        name: 'TSC APP WEB',
        description: 'Plataforma web completa para la administración centralizada, análisis de datos y configuración de sistemas.',
        accessLink: 'https://pablotcastillo.github.io/tsc-apps-center/', // Placeholder for web app link
        tutorialVideoId: ' L_LUpnjgPso', // Example YouTube Video ID
        platformIcon: <Globe size={32} className="text-primary" />,
      },
    ];

    const trainingResources = [
      { id: 'tr1', title: 'Guía de Inicio Rápido TSC APP', type: 'video', link: 'https://www.youtube.com/playlist?list=PL...', thumbnailDescription: 'Playlist de videos tutoriales para la app de TSC' },
      { id: 'tr2', title: 'Manual Avanzado TSC APP WEB', type: 'document', link: '#', thumbnailDescription: 'Documento PDF con el manual avanzado de la plataforma web.' },
      { id: 'tr3', title: 'Webinar: Optimizando Procesos con TSC', type: 'video', link: 'https://vimeo.com/...', thumbnailDescription: 'Grabación del último webinar sobre optimización de procesos.' },
      { id: 'tr4', title: 'FAQ y Resolución de Problemas', type: 'document', link: '#', thumbnailDescription: 'Documento con preguntas frecuentes y soluciones comunes.' },
    ];

    const AppCard = ({ app }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);

      return (
        <motion.div
          className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          layout
        >
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-primary/10 mr-4">
              {app.platformIcon}
            </div>
            <h3 className="text-xl font-semibold text-primary">{app.name}</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-6 flex-grow">{app.description}</p>
          <div className="mt-auto flex flex-col sm:flex-row gap-3">
            {app.downloadLink && (
              <a href={app.downloadLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full group">
                  <Download className="mr-2 h-4 w-4" /> 
                  {app.downloadType === 'apk' ? 'Descargar APK' : (app.downloadType === 'playstore' ? 'Google Play' : 'App Store')}
                </Button>
              </a>
            )}
            {app.accessLink && (
              <a href={app.accessLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full group">
                  <Globe className="mr-2 h-4 w-4" /> Acceder a Web App
                </Button>
              </a>
            )}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full group flex-1">
                  <PlayCircle className="mr-2 h-4 w-4" /> Ver Tutorial
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl aspect-video p-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${app.tutorialVideoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </motion.div>
                 <DialogClose className="absolute right-2 top-2 rounded-full p-1 bg-background/50 hover:bg-background/80 transition-colors">
                    <Info className="h-3 w-3 sr-only" /> {/* Using Info as a placeholder for X, update if X is available */}
                 </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>
      );
    };

    const TrainingResourceCard = ({ resource, index }) => (
      <motion.div
        className="bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <div className="w-full h-32 bg-muted rounded-md mb-3 flex items-center justify-center">
          {/* Placeholder for thumbnail image, use icon based on type */}
          {resource.type === 'video' ? <Video size={40} className="text-primary" /> : <FileText size={40} className="text-primary" />}
        </div>
        <h4 className="text-md font-semibold text-foreground mb-1 truncate">{resource.title}</h4>
        <p className="text-xs text-muted-foreground mb-3 flex-grow">{resource.thumbnailDescription}</p>
        <a href={resource.link} target="_blank" rel="noopener noreferrer">
          <Button variant="link" className="p-0 h-auto text-sm text-primary group">
            Acceder Recurso <PlayCircle size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </a>
      </motion.div>
    );

    const AppsAndVersionsPage = () => {
      return (
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-center text-primary mb-3">Aplicaciones y Versiones</h1>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Explore nuestras aplicaciones principales, acceda a sus últimas versiones, descargas y recursos de capacitación.
            </p>
          </motion.div>

          <section>
            <h2 className="text-3xl font-semibold text-primary mb-6 flex items-center">
              <Info size={28} className="mr-3" /> Registro de Aplicaciones
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {appsData.map(app => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-primary mb-8 flex items-center">
              <BookOpen size={28} className="mr-3" /> Capacitaciones y Videos
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trainingResources.map((resource, index) => (
                <TrainingResourceCard key={resource.id} resource={resource} index={index} />
              ))}
            </div>
             <div className="mt-8 text-center">
                <Link to="/training">
                    <Button size="lg" variant="outline">
                        Ver Todas las Capacitaciones
                    </Button>
                </Link>
            </div>
          </section>
        </div>
      );
    };

    export default AppsAndVersionsPage;