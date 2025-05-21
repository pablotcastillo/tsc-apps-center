import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
    import { GraduationCap, PlayCircle, FileText, ListVideo, BookOpen } from 'lucide-react';

    const trainingMaterials = [
      {
        id: 'tm1',
        title: 'Tutorial Completo: TSC APP Móvil',
        type: 'video_playlist',
        description: 'Aprenda a utilizar todas las funciones de nuestra aplicación móvil con esta serie de videos detallados.',
        link: 'https://www.youtube.com/embed/videoseries?list=YOUR_PLAYLIST_ID_MOBILE', // Replace with actual playlist embed URL
        thumbnailDescription: 'Serie de videos sobre la app móvil.',
        icon: <ListVideo size={24} className="text-primary" />
      },
      {
        id: 'tm2',
        title: 'Manual de Usuario: TSC APP WEB',
        type: 'document_pdf',
        description: 'Consulte el manual completo en PDF para dominar la plataforma web y sus herramientas avanzadas.',
        link: '/path/to/manual_web.pdf', // Replace with actual PDF link
        thumbnailDescription: 'Manual PDF de la app web.',
        icon: <FileText size={24} className="text-primary" />
      },
      {
        id: 'tm3',
        title: 'Webinar: Novedades y Mejores Prácticas',
        type: 'video_single',
        description: 'Reviva nuestro último webinar donde presentamos las novedades y compartimos consejos para optimizar su uso.',
        link: 'https://www.youtube.com/embed/SINGLE_VIDEO_ID', // Replace with actual single video embed URL
        thumbnailDescription: 'Grabación del último webinar.',
        icon: <PlayCircle size={24} className="text-primary" />
      },
      {
        id: 'tm4',
        title: 'Guías Rápidas y FAQ',
        type: 'document_collection',
        description: 'Acceda a guías rápidas para tareas comunes y un compendio de preguntas frecuentes.',
        link: '/docs/faq-guides', // Link to a page or a collection of documents
        thumbnailDescription: 'Guías rápidas y FAQ.',
        icon: <BookOpen size={24} className="text-primary" />
      }
    ];

    const TrainingCard = ({ material }) => {
      const [isModalOpen, setIsModalOpen] = useState(false);

      const renderContent = () => {
        if (material.type.startsWith('video')) {
          return (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={material.link}
                title={material.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-md"
              ></iframe>
            </div>
          );
        } else if (material.type.startsWith('document')) {
          // For PDFs or other docs, could be an embed or just a link
          return (
            <div>
              <p className="mb-4 text-muted-foreground">{material.description}</p>
              <a href={material.link} target="_blank" rel="noopener noreferrer">
                <Button className="w-full">Abrir Documento</Button>
              </a>
              <p className="text-xs text-muted-foreground mt-2 text-center">Se abrirá en una nueva pestaña.</p>
            </div>
          );
        }
        return <p>Contenido no disponible.</p>;
      };


      return (
        <motion.div
          className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start mb-3">
            <span className="p-2 bg-primary/10 rounded-md mr-3">{material.icon}</span>
            <h3 className="text-lg font-semibold text-primary mt-1">{material.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4 flex-grow">{material.thumbnailDescription}</p>
          
          {material.type.startsWith('video') ? (
             <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full group mt-auto">
                  <PlayCircle className="mr-2 h-4 w-4" /> Ver Contenido
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl p-4 sm:p-6">
                <DialogHeader>
                  <DialogTitle>{material.title}</DialogTitle>
                  {material.description && <DialogDescription>{material.description}</DialogDescription>}
                </DialogHeader>
                {renderContent()}
              </DialogContent>
            </Dialog>
          ) : (
             <a href={material.link} target="_blank" rel="noopener noreferrer" className="mt-auto">
                <Button variant="outline" className="w-full group">
                  <FileText className="mr-2 h-4 w-4" /> Abrir Documento
                </Button>
              </a>
          )}
        </motion.div>
      );
    };

    const TrainingPage = () => {
      return (
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <GraduationCap size={48} className="mx-auto text-primary mb-4" />
            <h1 className="text-4xl font-bold text-primary mb-3">Capacitaciones y Recursos</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Encuentre tutoriales en video, manuales, guías rápidas y otros recursos para ayudarle a sacar el máximo provecho de nuestras aplicaciones.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingMaterials.map((material) => (
              <TrainingCard key={material.id} material={material} />
            ))}
          </div>
          
          <motion.section 
            className="mt-12 p-8 bg-primary/5 rounded-lg text-center border border-primary/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-primary mb-3">¿Necesita Ayuda Adicional?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Si no encuentra lo que busca o necesita asistencia personalizada, no dude en contactar a nuestro equipo de soporte.
            </p>
            <Link to="/support">
              <Button size="lg" className="group">
                Contactar a Soporte <PlayCircle className="ml-2 h-5 w-5 sr-only" />
              </Button>
            </Link>
          </motion.section>
        </div>
      );
    };

    export default TrainingPage;