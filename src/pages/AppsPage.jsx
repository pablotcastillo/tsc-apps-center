
    import React, { useState, useEffect, useMemo } from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Package, ArrowRight, Search, Filter } from 'lucide-react';
    import { Input } from '@/components/ui/input';
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuCheckboxItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";

    const sheetURL = "https://sheet.best/api/sheets/1gBdpoTiownumkWZ1vrlnVyefpcZHypBUivurAwQAFDY";

    const initialAppsData = [
      { id: 'app1', name: 'TSC APP', version: '2.5.1', lastUpdate: '2025-05-15', category: 'Productividad', description: 'Aplicación para gestionar tareas técnicas y registrar datos en campo en tiempo real.', icon: <Package size={48} className="text-blue-500" /> },
      { id: 'app2', name: 'TSC INTEGRAL WEB', version: '1.8.0', lastUpdate: '2025-05-10', category: 'Análisis', description: 'Plataforma central de TSC Innovation para acceder a controles, datos y herramientas clave de ingeniería.', icon: <Package size={48} className="text-green-500" /> },
     // { id: 'app3', name: 'CRM TSC Conecta', version: '3.2.5', lastUpdate: '2025-04-28', category: 'Ventas', description: 'Solución CRM para optimizar la relación con clientes y procesos de venta.', icon: <Package size={48} className="text-purple-500" /> },
      { id: 'app4', name: 'EducaTech Plataforma', version: '1.2.3', lastUpdate: '2025-05-01', category: 'Educación', description: 'Entorno virtual de aprendizaje con herramientas interactivas y contenido multimedia.', icon: <Package size={48} className="text-orange-500" /> },
    ];
    
    const AppCard = ({ app }) => (
      <motion.div
        className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        layout
      >
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-full bg-primary/10 mr-4">
            {React.cloneElement(app.icon, { size: 32, className: 'text-primary' })}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary">{app.name}</h3>
            <p className="text-sm text-muted-foreground">Versión: {app.version}</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">{app.description}</p>
        <p className="text-xs text-muted-foreground/80 mb-4">Última actualización: {app.lastUpdate}</p>
        <Link to={`/apps/${app.id}`}>
          <Button variant="outline" className="w-full group mt-auto">
            Ver Detalles <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    );

    const AppsPage = () => {
      const [apps, setApps] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [selectedCategories, setSelectedCategories] = useState([]);
      
      useEffect(() => {
        fetch("https://opensheet.elk.sh/1gBdpoTiownumkWZ1vrlnVyefpcZHypBUivurAwQAFDY/Aplicaciones")
          .then((res) => res.json())
          .then((data) => {
            const mappedApps = data.map((row) => ({
              id: row.id,
              name: row.name,
              version: row.version,
              lastUpdate: row.lastUpdate,
              category: row.category,
              description: row.description,
              icon: <Package size={48} className={`text-${row.iconColor}`} />,
            }));
            setApps(mappedApps);
          });
      }, []);

      const handleCategoryChange = (category) => {
        setSelectedCategories(prev => 
          prev.includes(category) 
            ? prev.filter(c => c !== category)
            : [...prev, category]
        );
      };

      // 1) Extrae dinámicamente categorías de tu estado apps:
      const categories = useMemo(
        () => [...new Set(apps.map(a => a.category))],
        [apps]
      );
      // 2) Filtra siempre sobre apps normalizados:
      const filteredApps = useMemo(() => {
        return apps.filter(app => {
          const matchesSearch =
            app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.description.toLowerCase().includes(searchTerm.toLowerCase());

          const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(app.category);

          return matchesSearch && matchesCategory;
        });
      }, [apps, searchTerm, selectedCategories]);

      return (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-center text-primary mb-2">Catálogo de Aplicaciones</h1>
            <p className="text-lg text-muted-foreground text-center mb-8">
              Descubra todas las soluciones innovadoras que TSC Innovation tiene para ofrecer.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
            <div className="relative flex-grow w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="Buscar aplicaciones..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="mr-2 h-4 w-4" /> Filtrar por Categoría
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Categorías</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map(category => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {filteredApps.length >= 0 ? (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              layout
            >
              {filteredApps.map(app => (
                <AppCard key={app.id} app={app} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <Package size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">No se encontraron aplicaciones que coincidan con su búsqueda o filtro.</p>
            </motion.div>
          )}
        </div>
      );
    };

    export default AppsPage;
  