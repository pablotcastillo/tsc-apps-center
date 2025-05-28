import React, { useState, useEffect } from 'react';
import { fetchTraining } from '@/lib/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger
} from '@/components/ui/dialog';
import {
  GraduationCap, PlayCircle, FileText, ListVideo, BookOpen, Loader, Rss
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';


const ICONS = {
  PlayCircle: <PlayCircle size={24} className="text-primary" />,
  FileText: <FileText size={24} className="text-primary" />,
  ListVideo: <ListVideo size={24} className="text-primary" />,
  BookOpen: <BookOpen size={24} className="text-primary" />
};

const TrainingCard = ({ material }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderContent = () => {
    if (material.type?.startsWith('video')) {
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
    } else if (material.type?.startsWith('document')) {
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

      {material.type?.startsWith('video') ? (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full group mt-auto">
              <PlayCircle className="mr-2 h-4 w-4" /> Ver Contenido
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>{material.title}</DialogTitle>
              {material.description && (
                <DialogDescription>{material.description}</DialogDescription>
              )}
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
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    fetchTraining()
      .then((data) => {
        const filtered = data
          .filter(item =>
            item.id &&
            item.title &&
            item.link &&
            (user?.email === 'admin@tsc.com' || true)
          )
          .map((item) => ({
            ...item,
            icon: ICONS[item.icon] || <GraduationCap size={24} className="text-primary" />,
            isPrivate: !item.public
          }));
        setMaterials(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar materiales:', err);
        setError("Error al cargar materiales");
        setLoading(false);
      });
  }, [user]);
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-primary/5 rounded-xl shadow-inner max-w-xl mx-auto mt-12 border border-primary/10">
        <Rss size={48} className="text-primary mb-4" />
        <h2 className="text-2xl font-semibold text-primary mb-2">
          Acceso restringido
        </h2>
        <p className="text-muted-foreground max-w-md">
          Debe iniciar sesión para acceder a las capacitaciones y recursos.
          Por favor, utilice el botón de <strong>Iniciar Sesión</strong> en la parte superior derecha.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-b from-purple-50 to-white rounded-xl shadow-lg max-w-3xl mx-auto px-8 py-10 flex flex-col items-center"
      >
        <GraduationCap size={48} className="mx-auto text-primary mb-4" />
        <h1 className="text-5xl font-extrabold text-[#2E5A8D] mb-4">Capacitaciones y Recursos</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Encuentre tutoriales en video, manuales, guías rápidas y otros recursos para ayudarle a sacar el máximo provecho de nuestras aplicaciones.
        </p>
        <div className="absolute left-0 top-0 h-full w-2 bg-[#2E5A8D] rounded-l-xl" />
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader className="animate-spin h-8 w-8 text-primary" />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materials.map((material) => (
            <TrainingCard key={material.id} material={material} />
          ))}
        </div>
      )}

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

