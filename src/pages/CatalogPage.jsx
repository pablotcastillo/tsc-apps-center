// src/pages/CatalogPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, ArrowRight, Search, Filter, Calendar, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AppCard = ({ app }) => (
  <motion.div
    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-100"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    layout
  >
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 rounded-xl bg-indigo-200">
        <Package size={28} className="text-indigo-600" />
      </div>
      {app.categoria && (
        <span className="px-3 py-1 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-full">
          {app.categoria || app.category}
        </span>
      )}
    </div>
    <div className="flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-gray-800 mb-1">{app.nombre || app.name}</h3>
      <p className="text-sm text-muted-foreground mb-2">{app.descripcion || app.description}</p>
      <p className="text-xs text-muted-foreground flex items-center mb-4">
        <Calendar className="h-4 w-4 mr-1" />
        Última actualización: {new Date(app.lastUpdate).toLocaleDateString()}
      </p>
    </div>
    <Link to={`/catalog/${app.id}`} className="mt-auto">
      <Button variant="outline" className="w-full group">
        Ver Detalles
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Link>
  </motion.div>
);

export default function CatalogPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetch('/catalogo_apps.json')
      .then(res => res.ok ? res.json() : Promise.reject('Error'))
      .then(data => {
        setApps(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = Array.from(new Set(apps.map(a => a.category).filter(Boolean)));

  const filteredApps = apps.filter(app => {
    const t = searchTerm.toLowerCase();
    const matchesText =
      app.name.toLowerCase().includes(t) || app.description.toLowerCase().includes(t);
    const matchesCat =
      selectedCategories.length === 0 || selectedCategories.includes(app.category);
    return matchesText && matchesCat;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative bg-gradient-to-b from-purple-50 to-white rounded-xl shadow-lg max-w-3xl mx-auto px-8 py-10 flex flex-col items-center"
      >
        <Tag size={48} className="mx-auto text-primary mb-4" />

        {/* Marcador lateral */}
        <div className="absolute left-0 top-0 h-full w-2 bg-[#2E5A8D] rounded-l-xl" />

        <h1 className="text-5xl font-extrabold text-[#2E5A8D] mb-4">
          Catálogo de Aplicaciones
        </h1>
        <p className="text-lg text-[#2E5A8D] max-w-2xl text-center leading-relaxed">
          Explore nuestra colección de herramientas digitales, diseñadas para optimizar procesos, fomentar la colaboración y llevar su equipo al siguiente nivel.
        </p>
      </motion.div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por nombre o descripción"
            className="pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filtrar por Categoría
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Categorías</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map(cat => (
              <DropdownMenuCheckboxItem
                key={cat}
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() =>
                  setSelectedCategories(prev =>
                    prev.includes(cat)
                      ? prev.filter(c => c !== cat)
                      : [...prev, cat]
                  )
                }
              >
                {cat}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Resultados */}
      {filteredApps.length > 0 ? (
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0"
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
          className="text-center py-10 text-muted-foreground"
        >
          <Package size={64} className="mx-auto mb-4" />
          <p className="text-lg">No se encontraron aplicaciones que coincidan con su búsqueda.</p>
        </motion.div>
      )}
    </div>
  );
}


