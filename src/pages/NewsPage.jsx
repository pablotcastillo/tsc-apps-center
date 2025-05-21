import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Calendar, Tag, ArrowRight, Newspaper } from 'lucide-react';
    import { Link } from 'react-router-dom';

    const initialNewsData = [
      { id: 'news1', title: 'Lanzamiento de Gestor de Proyectos TSC v2.5', date: '2025-05-15', category: 'Lanzamientos', summary: 'Estamos emocionados de anunciar la nueva versión de nuestro Gestor de Proyectos, con mejoras de rendimiento y nuevas funcionalidades de colaboración. Ideal para equipos que buscan eficiencia.', appLink: '/apps-versions', imageDescription: 'Equipo celebrando el lanzamiento de un nuevo software.' },
      { id: 'news2', title: 'TSC Innovation reconocida por su excelencia en IA', date: '2025-05-10', category: 'Premios', summary: 'TSC Innovation ha recibido un prestigioso premio por su contribución al campo de la Inteligencia Artificial con nuestra herramienta Analizador de Datos IA. Un hito importante.', appLink: '/apps-versions', imageDescription: 'Trofeo de premio sobre una mesa elegante.' },
      { id: 'news3', title: 'Próximo Webinar: Maximizando la eficiencia con CRM Conecta', date: '2025-05-05', category: 'Eventos', summary: 'Únase a nuestro webinar gratuito el 20 de Mayo para descubrir cómo CRM TSC Conecta puede transformar sus procesos de venta y relación con clientes. ¡Inscríbase ya!', appLink: '/training', imageDescription: 'Persona presentando en un webinar online.' },
      { id: 'news4', title: 'Actualización de seguridad importante para todas las apps', date: '2025-04-25', category: 'Seguridad', summary: 'Hemos implementado una actualización de seguridad crítica en todas nuestras aplicaciones para garantizar la protección de sus datos. Recomendamos actualizar a la brevedad.', appLink: '/apps-versions', imageDescription: 'Icono de escudo de seguridad digital.' },
      { id: 'news5', title: 'Nueva sección de Capacitaciones disponible', date: '2025-04-20', category: 'Plataforma', summary: 'Explore nuestra nueva sección de capacitaciones con tutoriales en video, guías y manuales para todas nuestras aplicaciones. Mejore su productividad hoy mismo.', appLink: '/training', imageDescription: 'Iconos de libros y videos representando aprendizaje.' },
    ];

    const NewsCard = ({ item, index }) => (
      <motion.div
        className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="md:w-1/3 h-48 md:h-auto rounded-md overflow-hidden">
          <img-replace alt={item.title} class="w-full h-full object-cover" />
        </div>
        <div className="md:w-2/3 flex flex-col">
          <h3 className="text-2xl font-semibold text-primary mb-2">{item.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground mb-3 space-x-4">
            <span className="flex items-center"><Calendar size={14} className="mr-1" /> {item.date}</span>
            <span className="flex items-center"><Tag size={14} className="mr-1" /> {item.category}</span>
          </div>
          <p className="text-muted-foreground mb-4 flex-grow text-sm leading-relaxed">{item.summary.length > 200 ? item.summary.substring(0, 197) + "..." : item.summary}</p>
          <Link to={item.appLink} className="self-start mt-auto">
            <Button variant="link" className="text-primary p-0 h-auto group text-sm">
              Leer Más / Ver Relacionado <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </motion.div>
    );

    const NewsPage = () => {
      const [newsItems, setNewsItems] = useState([]);

      useEffect(() => {
        setNewsItems(initialNewsData);
      }, []);

      return (
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Newspaper size={48} className="mx-auto text-primary mb-4" />
            <h1 className="text-4xl font-bold text-primary mb-3">Últimas Novedades y Anuncios</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Manténgase informado sobre los desarrollos más recientes, lanzamientos de productos y noticias importantes de TSC Innovation.
            </p>
          </motion.div>

          {newsItems.length > 0 ? (
            <div className="space-y-8">
              {newsItems.map((item, index) => (
                <NewsCard key={item.id} item={item} index={index} />
              ))}
            </div>
          ) : (
            <motion.p 
              className="text-center text-muted-foreground text-xl py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              No hay novedades recientes. Vuelva pronto.
            </motion.p>
          )}
        </div>
      );
    };

    export default NewsPage;