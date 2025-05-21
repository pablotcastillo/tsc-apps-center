import React, { useState, useEffect } from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Package, ArrowLeft, Download, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

    const mockAppDetails = {
      app1: { 
        name: 'Gestor de Proyectos TSC', 
        version: '2.5.1', 
        lastUpdate: '2025-05-15', 
        category: 'Productividad', 
        description: 'Herramienta integral para la gestión eficiente de proyectos y tareas del equipo. Permite la colaboración en tiempo real, seguimiento de progreso y asignación de recursos.',
        longDescription: 'El Gestor de Proyectos TSC es una solución robusta diseñada para optimizar flujos de trabajo y mejorar la productividad de equipos de cualquier tamaño. Ofrece un conjunto completo de herramientas que incluyen tableros Kanban, diagramas de Gantt, gestión de tiempos, y reportes personalizables. Su interfaz intuitiva y su capacidad de integración con otras herramientas populares lo convierten en un aliado indispensable para la ejecución exitosa de proyectos.',
        icon: <Package size={64} className="text-blue-500" />,
        releaseNotes: [
          { version: '2.5.1', date: '2025-05-15', changes: ['Corrección de error menor en exportación de reportes.', 'Mejora de rendimiento en la carga de tableros grandes.'] },
          { version: '2.5.0', date: '2025-05-01', changes: ['Nueva funcionalidad: Integración con calendarios externos.', 'Actualización de la interfaz de usuario para una mejor experiencia.'] },
        ],
        documentationLink: '#', // Placeholder
        downloadLink: '#', // Placeholder
        screenshots: [
          { id: 'ss1', alt: 'Dashboard del Gestor de Proyectos TSC', description: 'Vista principal del dashboard con resumen de proyectos.' },
          { id: 'ss2', alt: 'Tablero Kanban del Gestor de Proyectos TSC', description: 'Ejemplo de un tablero Kanban para seguimiento de tareas.' },
          { id: 'ss3', alt: 'Diagrama de Gantt en Gestor de Proyectos TSC', description: 'Visualización de cronograma de proyecto con diagrama de Gantt.' },
        ]
      },
      app2: { 
        name: 'Analizador de Datos IA', 
        version: '1.8.0', 
        lastUpdate: '2025-05-10', 
        category: 'Análisis', 
        description: 'Plataforma avanzada para el análisis de grandes volúmenes de datos con Inteligencia Artificial. Descubra insights y patrones ocultos.',
        longDescription: 'El Analizador de Datos IA de TSC Innovation potencia la toma de decisiones basada en datos. Utiliza algoritmos de machine learning para procesar, analizar y visualizar información compleja, permitiendo a los usuarios identificar tendencias, predecir resultados y optimizar estrategias. Compatible con diversas fuentes de datos y con capacidades de personalización para adaptarse a necesidades específicas de negocio.',
        icon: <Package size={64} className="text-green-500" />,
        releaseNotes: [
          { version: '1.8.0', date: '2025-05-10', changes: ['Optimización de algoritmos de predicción.', 'Soporte para nuevas fuentes de datos.'] },
          { version: '1.7.5', date: '2025-04-20', changes: ['Mejoras en la interfaz de visualización de datos.', 'Correcciones de estabilidad.'] },
        ],
        documentationLink: '#',
        downloadLink: '#',
        screenshots: [
          { id: 'ss4', alt: 'Interfaz de análisis de datos IA', description: 'Panel principal de la herramienta de análisis de datos.' },
          { id: 'ss5', alt: 'Gráficos generados por el Analizador de Datos IA', description: 'Ejemplo de visualizaciones y gráficos de datos.' },
        ]
      },
       app3: { 
        name: 'CRM TSC Conecta', 
        version: '3.2.5', 
        lastUpdate: '2025-04-28', 
        category: 'Ventas', 
        description: 'Solución CRM para optimizar la relación con clientes y procesos de venta.',
        longDescription: 'CRM TSC Conecta centraliza toda la información de sus clientes y prospectos, facilitando la gestión de interacciones, el seguimiento de oportunidades de venta y la automatización de tareas de marketing. Con módulos para gestión de contactos, embudos de venta, campañas de email y servicio postventa, esta herramienta ayuda a construir relaciones más fuertes y duraderas con los clientes.',
        icon: <Package size={64} className="text-purple-500" />,
        releaseNotes: [
          { version: '3.2.5', date: '2025-04-28', changes: ['Nueva integración con plataformas de e-commerce.', 'Mejoras en la personalización de plantillas de correo.'] },
        ],
        documentationLink: '#',
        downloadLink: '#',
        screenshots: [
         { id: 'ss6', alt: 'Dashboard de CRM TSC Conecta', description: 'Vista general del dashboard del CRM.' },
        ]
      },
      app4: { 
        name: 'EducaTech Plataforma', 
        version: '1.2.3', 
        lastUpdate: '2025-05-01', 
        category: 'Educación', 
        description: 'Entorno virtual de aprendizaje con herramientas interactivas y contenido multimedia.',
        longDescription: 'EducaTech es una plataforma de e-learning completa que permite a instituciones educativas y empresas crear, gestionar y distribuir contenido formativo de manera eficaz. Incluye funcionalidades para la creación de cursos, evaluaciones, foros de discusión, videoconferencias y seguimiento del progreso de los estudiantes. Su diseño adaptable asegura una experiencia óptima en cualquier dispositivo.',
        icon: <Package size={64} className="text-orange-500" />,
        releaseNotes: [
          { version: '1.2.3', date: '2025-05-01', changes: ['Mejora en la herramienta de creación de cuestionarios.', 'Optimización para dispositivos móviles.'] },
        ],
        documentationLink: '#',
        downloadLink: '#',
        screenshots: [
          { id: 'ss7', alt: 'Interfaz de curso en EducaTech', description: 'Ejemplo de la vista de un curso dentro de la plataforma.' },
        ]
      },
    };
    
    const AppDetailsPage = () => {
      const { appId } = useParams();
      const [app, setApp] = useState(null);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
          const foundApp = mockAppDetails[appId];
          setApp(foundApp);
          setLoading(false);
        }, 500);
      }, [appId]);
    
      if (loading) {
        return (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
            />
          </div>
        );
      }
    
      if (!app) {
        return (
          <div className="text-center py-10">
            <AlertTriangle size={64} className="mx-auto text-destructive mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Aplicación no encontrada</h2>
            <p className="text-muted-foreground mb-6">Lo sentimos, no pudimos encontrar los detalles para esta aplicación.</p>
            <Link to="/apps">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver al catálogo
              </Button>
            </Link>
          </div>
        );
      }
    
      return (
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <Link to="/apps">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Catálogo
              </Button>
            </Link>
          </div>
    
          <header className="bg-card p-8 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="p-4 bg-primary/10 rounded-lg">
                {React.cloneElement(app.icon, { size: 64, className: 'text-primary' })}
              </div>
              <div>
                <h1 className="text-4xl font-bold text-primary">{app.name}</h1>
                <p className="text-lg text-muted-foreground">Versión: {app.version} ({app.category})</p>
                <p className="text-sm text-muted-foreground/80">Última actualización: {app.lastUpdate}</p>
              </div>
              <div className="md:ml-auto flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                <Button size="lg" className="group" onClick={() => window.open(app.downloadLink, '_blank')}>
                  <Download className="mr-2 h-5 w-5" /> Descargar
                </Button>
                <Button size="lg" variant="outline" className="group" onClick={() => window.open(app.documentationLink, '_blank')}>
                  <FileText className="mr-2 h-5 w-5" /> Documentación
                </Button>
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
              <h2 className="text-2xl font-semibold text-primary mb-4">Descripción Detallada</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{app.longDescription || app.description}</p>
            </motion.section>
    
            <motion.section 
              className="bg-card p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-primary mb-4">Notas de la Versión</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {app.releaseNotes?.map((note, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-md">
                    <p className="font-semibold text-primary">Versión {note.version} <span className="text-xs text-muted-foreground">({note.date})</span></p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-0.5">
                      {note.changes.map((change, idx) => (
                        <li key={idx}>{change}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {app.screenshots && app.screenshots.length > 0 && (
            <motion.section 
              className="bg-card p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Capturas de Pantalla</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {app.screenshots.map((ss) => (
                  <motion.div 
                    key={ss.id} 
                    className="rounded-lg overflow-hidden shadow-md border border-border"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <img  alt={ss.alt} class="w-full h-48 object-cover"  src="https://images.unsplash.com/photo-1575176893115-4bd0087f8005" />
                    <p className="text-xs text-center p-2 bg-background text-muted-foreground">{ss.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
    
        </motion.div>
      );
    };
    
    export default AppDetailsPage;