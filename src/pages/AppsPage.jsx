// src/pages/AppDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Package, ArrowLeft, Download, FileText, AlertTriangle } from 'lucide-react';

export default function AppDetailsPage() {
  const { appId } = useParams();           // ↓ obtiene el ID de la ruta
  const [app, setApp] = useState(null);    // ↓ solo la app encontrada
  const [loading, setLoading] = useState(true);

  // ↓ CAMBIO: fetch al JSON dinámico en lugar de usar datos mock
  useEffect(() => {
    // 1) Ver qué appId estamos recibiendo
    console.log('🔍 Parámetro appId:', appId);

    setLoading(true);
    fetch('/catalogo_apps.json')
      .then(res => {
        if (!res.ok) throw new Error('Error cargando JSON');
        return res.json();
      })
      .then(data => {
        // 2) Ver todo el JSON recibido
        console.log('🚀 JSON completo:', data);

        // 3) Buscar la app
        const found = data.find(a => a.id === appId);
        console.log('🔍 app encontrada:', found);

        setApp(found || null);
      })
      .catch(err => {
        console.error('❌ Error en fetch o find:', err);
        setApp(null);
      })
      .finally(() => setLoading(false));
  }, [appId]);



// Estado de no encontrada
  if (!app) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center py-10">
          <AlertTriangle size={64} className="mx-auto text-destructive mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Aplicación no encontrada</h2>
          <p className="text-muted-foreground mb-6">
            Lo sentimos, no pudimos encontrar los detalles para esta aplicación.
          </p>
          <Link to="/catalog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al catálogo
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Renderizado final con datos de `app`
  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <Link to="/catalog">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Catálogo
          </Button>
        </Link>
      </div>

      <header className="bg-card p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="p-4 bg-primary/10 rounded-lg">
            {app.icon ? React.cloneElement(app.icon, { size: 64, className: 'text-primary' }) : <Package size={64} className="text-primary" />}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-primary">{app.nombre || app.name}</h1>
            <p className="text-lg text-muted-foreground">
              Versión: {app.version} ({app.category || app.categoria})
            </p>
            <p className="text-sm text-muted-foreground/80">
              Última actualización: {new Date(app.lastUpdate).toLocalDateString() || app.ultima_actualizacion}
            </p>
          </div>
          <div className="md:ml-auto flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            {app.descarga && (
              <Button 
                size="lg" 
                className="group" 
                onClick={() => window.open(app.descarga || app.downloadLink, '_blank')}
              >
                <Download className="mr-2 h-5 w-5" /> Descargar
              </Button>
            )}
            {app.documentacion && (
              <Button 
                size="lg" 
                variant="outline" 
                className="group" 
                onClick={() => window.open(app.documentacion || app.docLink, '_blank')}
              >
                <FileText className="mr-2 h-5 w-5" /> Documentación
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.section 
          className="lg:col-span-2 bg-card p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Descripción Detallada
          </h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {app.description_detail || app.description || app.descripcion}
          </p>
        </motion.section>

        <motion.section 
          className="bg-card p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Notas de la Versión
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {(app.changelog_vers || app.notas_version)?.map((note, index) => (
              <div 
                key={index} 
                className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-md"
              >
                <p className="font-semibold text-primary">
                  Versión {note.changelog_text} 
                  <span className="text-xs text-muted-foreground">
                    ({note.date || note.changelog_vers})
                  </span>
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-0.5">
                  {(note.changes || note.cambios).map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {app.screenshots || app.imagen ? (
        <motion.section 
          className="bg-card p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
            Capturas de Pantalla
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(app.screenshots || app.imagenes).map((ss, idx) => (
              <motion.div 
                key={idx} 
                className="rounded-lg overflow-hidden shadow-md border border-border"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img  
                  alt={ss.alt || ss.description || `Captura ${idx + 1}`}  
                  className="w-full h-48 object-cover"  
                  src={ss.url || ss.src || ss}  // ↓ CAMBIO: usa la propiedad correcta del JSON
                />
                { (ss.description || ss.alt) && (
                  <p className="text-xs text-center p-2 bg-background text-muted-foreground">
                    {ss.description || ss.alt}
                  </p>
                ) }
              </motion.div>
            ))}
          </div>
        </motion.section>
      ) : null}
    </motion.div>
  );
}
