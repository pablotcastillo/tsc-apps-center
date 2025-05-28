// src/pages/AppDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Package, ArrowLeft, Download, FileText, AlertTriangle, Calendar, Tag } from 'lucide-react';

export default function AppDetailsPage() {
  const { appId } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/catalogo_apps.json')
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
      .then(data => setApp(data.find(a => a.id === appId) || null))
      .catch(() => setApp(null))
      .finally(() => setLoading(false));
  }, [appId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, loop: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!app) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white p-8">
        <AlertTriangle size={72} className="text-red-500 mb-4" />
        <h2 className="text-3xl font-bold mb-2">Aplicación no encontrada</h2>
        <p className="text-gray-600 mb-6">Lo sentimos, no pudimos encontrar los detalles para esta aplicación.</p>
        <Link to="/catalog">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-5 w-5" /> Volver al Catálogo
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-[#2E5A8D] to-[#1E3A5D] text-white p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="p-4 bg-white/20 rounded-lg">
          {app.icon 
            ? React.cloneElement(app.icon, { size: 64, className: 'text-white' })
            : <Package size={64} className="text-white" />}
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold">{app.name}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <span className="px-3 py-1 bg-white/30 rounded-full text-sm font-medium">
              v{app.version}
            </span>
            <span className="flex items-center text-sm">
              <Calendar className="mr-1" /> {new Date(app.lastUpdate).toLocaleDateString()}
            </span>
            <span className="flex items-center text-sm">
              <Tag className="mr-1" /> {app.category || 'Sin categoría'}
            </span>
          </div>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          {app.downloadLink && (
            <Button 
              size="lg" 
              variant="outline" 
              className="
              bg-white text-[#2E5A8D]
              hover:text-white hover:border-white hover:bg-white/10 
              transition"
              onClick={() => window.open(app.downloadLink, '_blank')}
            >
              <Download className="mr-2" /> Descargar
            </Button>
          )}
          {app.docLink && (
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-[#2E5A8D] 
              hover:text-white hover:border-white hover:bg-white/10 
              transition"
              onClick={() => window.open(app.docLink, '_blank')}
            >
              <FileText className="mr-2" /> Documentación
            </Button>
          )}
        </div>
      </div>

      {/* ================= TABS ================= */}
      <Tabs defaultValue="descripcion" className="p-6">
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="descripcion">Descripción</TabsTrigger>
          <TabsTrigger value="notas">Notas</TabsTrigger>
          <TabsTrigger value="screenshots">Capturas</TabsTrigger>
        </TabsList>

        <TabsContent value="descripcion">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="prose max-w-none text-gray-700"
          >
            <h2 className="text-2xl font-semibold mb-4">Descripción Detallada</h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {app.description_detail}
              </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="notas">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4 max-h-96 overflow-y-auto"
          >
         <div className="p-4 border-l-4 border-indigo-600 bg-indigo-50 rounded">
           <h3 className="font-semibold mb-2">
             v{app.changelog_vers} — {new Date(app.changelog_fecha).toLocaleDateString()}
           </h3>
          <ul className="list-disc list-inside mt-2 text-gray-700">
             {app.changelog_text.map((c, j) => (
               <li key={j}>{c}</li>
             ))}
           </ul>
         </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="screenshots">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {app.images.map((src, idx) => (
              <motion.div 
                key={idx}
                className="overflow-hidden rounded-lg shadow-md bg-gray-100"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img src={src} alt={`Captura ${idx + 1}`} className="w-full h-48 object-cover" />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* ================= FOOTER “Volver” ================= */}
      <div className="p-6 border-t text-right">
        <Link to="/catalog">
          <Button variant="ghost">
            <ArrowLeft className="mr-2" /> Volver al Catálogo
          </Button>
        </Link>
      </div>
    </div>
  );
}
