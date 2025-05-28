import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Tag, ArrowRight, Rss } from 'lucide-react';
import { fetchNews } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';


const API_URL = "https://script.google.com/macros/s/AKfycbweZz-pelhvAX0BBqOPqoTyuve-9f4PeednshjxexzfnioWAokoUxokPTvtIdORlel5bQ/exec?sheet=Noticias";

const NewsCard = ({ item, index }) => {
  const { user } = useAuth();
  const isAdmin = user?.email === "admin@tsc.com";

  return (
    <motion.div
      className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row gap-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="md:w-1/3 h-48 md:h-auto rounded-md overflow-hidden">
        <img alt={item.title} className="w-full h-full object-cover" src={item.imagen || "https://images.unsplash.com/photo-1697256200022-f61abccad430"} />
      </div>

      <div className="md:w-2/3 flex flex-col">
        <h3 className="text-2xl font-semibold text-primary mb-2">{item.titulo}</h3>

        {item.estado !== "published" && isAdmin && (
          <span className="text-xs text-yellow-800 bg-yellow-100 border border-yellow-300 rounded px-2 py-0.5">
            Privado
          </span>
        )}

        <div className="flex items-center text-sm text-muted-foreground mb-3 space-x-4">
          <span className="flex items-center"><Calendar size={16} className="mr-1.5" /> {item.fecha}</span>
          <span className="flex items-center"><Tag size={16} className="mr-1.5" /> {item.categoria}</span>
        </div>

        <p className="text-muted-foreground mb-4 flex-grow">{item.resumen}</p>
        <a href={`/catalog/${item.appId}`} className="self-start">
          <Button variant="link" className="text-primary p-0 h-auto group">
            Leer Más <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </a>
      </div>
    </motion.div>
  );
};

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchNews()
      .then(data => {
        console.log("📥 Noticias crudas:", data);
        const visibles = data.filter(n => {
          const estado = (n.estado || "").toLowerCase();
          return estado === "published" || user?.email === "admin@tsc.com";
        });
        setNewsItems(visibles);
      })
      .catch(err => {
        console.error("❌ Error cargando noticias:", err);
      })
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Rss size={48} className="mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-3">Últimas Novedades y Anuncios</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Manténgase informado sobre los desarrollos más recientes, lanzamientos de productos y noticias importantes de TSC Innovation.
        </p>
      </motion.div>

      {loading ? (
        <motion.p 
          className="text-center text-muted-foreground text-xl py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Cargando noticias...
        </motion.p>
      ) : newsItems.length > 0 ? (
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
