import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
    import { PlusCircle, Edit3, Trash2, ListFilter, Users, BarChart2, Settings, PackagePlus, Newspaper, Ticket } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
      DialogClose,
    } from "@/components/ui/dialog";
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Checkbox } from '@/components/ui/checkbox';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

    // Mock data - in a real app, this would come from a backend/Supabase
    const initialAppsData = [
      { id: 'app1', name: 'Gestor de Proyectos TSC', version: '2.5.1', lastUpdate: '2025-05-15', category: 'Productividad', published: true, featured: true },
      { id: 'app2', name: 'Analizador de Datos IA', version: '1.8.0', lastUpdate: '2025-05-10', category: 'Análisis', published: true, featured: false },
      { id: 'app3', name: 'CRM TSC Conecta', version: '3.2.5', lastUpdate: '2025-04-28', category: 'Ventas', published: false, featured: false },
    ];

    const initialNewsData = [
      { id: 'news1', title: 'Lanzamiento de Gestor de Proyectos TSC v2.5', date: '2025-05-15', category: 'Lanzamientos', published: true },
      { id: 'news2', title: 'TSC Innovation reconocida por su excelencia en IA', date: '2025-05-10', category: 'Premios', published: true },
    ];
    
    const initialSupportTickets = [
      { id: 'ticket1', user: 'Juan Pérez', app: 'Gestor de Proyectos TSC', subject: 'Error al exportar reporte', priority: 'Alta', status: 'Abierto', assignedTo: 'Ana Gómez', date: '2025-05-20' },
      { id: 'ticket2', user: 'Maria López', app: 'Analizador de Datos IA', subject: 'No carga dataset grande', priority: 'Media', status: 'En Progreso', assignedTo: 'Carlos Ruiz', date: '2025-05-19' },
      { id: 'ticket3', user: 'Pedro Ramirez', app: 'CRM TSC Conecta', subject: 'Sugerencia: Nueva integración', priority: 'Baja', status: 'Cerrado', assignedTo: 'Ana Gómez', date: '2025-05-18' },
    ];

    const AdminDashboard = () => {
      const { toast } = useToast();
      const [activeTab, setActiveTab] = useState("apps");
      const [apps, setApps] = useState([]);
      const [news, setNews] = useState([]);
      const [tickets, setTickets] = useState([]);
      const [isAppDialogOpen, setIsAppDialogOpen] = useState(false);
      const [isNewsDialogOpen, setIsNewsDialogOpen] = useState(false);
      const [currentApp, setCurrentApp] = useState(null);
      const [currentNewsItem, setCurrentNewsItem] = useState(null);

      useEffect(() => {
        // Load data from localStorage or use initial mock data
        const storedApps = JSON.parse(localStorage.getItem('adminApps')) || initialAppsData;
        const storedNews = JSON.parse(localStorage.getItem('adminNews')) || initialNewsData;
        const storedTickets = JSON.parse(localStorage.getItem('supportTickets')) || initialSupportTickets; // Use supportTickets from localStorage
        setApps(storedApps);
        setNews(storedNews);
        setTickets(storedTickets);
      }, []);

      // Save to localStorage whenever apps or news change
      useEffect(() => {
        localStorage.setItem('adminApps', JSON.stringify(apps));
      }, [apps]);

      useEffect(() => {
        localStorage.setItem('adminNews', JSON.stringify(news));
      }, [news]);
      
      // Support tickets are managed by SupportPage for submission, AdminDashboard for viewing/management
      // This effect ensures AdminDashboard reflects changes made by SupportPage if it also writes to localStorage
      useEffect(() => {
        const handleStorageChange = () => {
          const updatedTickets = JSON.parse(localStorage.getItem('supportTickets')) || initialSupportTickets;
          setTickets(updatedTickets);
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
      }, []);


      const handleAppFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const appData = Object.fromEntries(formData.entries());
        appData.published = appData.published === 'on';
        appData.featured = appData.featured === 'on';
        appData.id = currentApp ? currentApp.id : `app${Date.now()}`;
        appData.lastUpdate = new Date().toISOString().split('T')[0];

        if (currentApp) {
          setApps(apps.map(app => app.id === currentApp.id ? appData : app));
          toast({ title: "Aplicación Actualizada", description: `${appData.name} ha sido actualizada.` });
        } else {
          setApps([...apps, appData]);
          toast({ title: "Aplicación Añadida", description: `${appData.name} ha sido añadida.` });
        }
        setIsAppDialogOpen(false);
        setCurrentApp(null);
      };
      
      const handleNewsFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newsData = Object.fromEntries(formData.entries());
        newsData.published = newsData.published === 'on';
        newsData.id = currentNewsItem ? currentNewsItem.id : `news${Date.now()}`;
        newsData.date = newsData.date || new Date().toISOString().split('T')[0];

        if (currentNewsItem) {
          setNews(news.map(item => item.id === currentNewsItem.id ? newsData : item));
          toast({ title: "Noticia Actualizada", description: `La noticia "${newsData.title}" ha sido actualizada.` });
        } else {
          setNews([...news, newsData]);
          toast({ title: "Noticia Añadida", description: `La noticia "${newsData.title}" ha sido añadida.` });
        }
        setIsNewsDialogOpen(false);
        setCurrentNewsItem(null);
      };

      const openAppDialog = (app = null) => {
        setCurrentApp(app);
        setIsAppDialogOpen(true);
      };
      
      const openNewsDialog = (newsItem = null) => {
        setCurrentNewsItem(newsItem);
        setIsNewsDialogOpen(true);
      };

      const deleteApp = (appId) => {
        setApps(apps.filter(app => app.id !== appId));
        toast({ title: "Aplicación Eliminada", variant: "destructive" });
      };
      
      const deleteNews = (newsId) => {
        setNews(news.filter(item => item.id !== newsId));
        toast({ title: "Noticia Eliminada", variant: "destructive" });
      };

      const AppForm = ({ app, onSubmit, onCancel }) => (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre de la Aplicación</Label>
            <Input id="name" name="name" defaultValue={app?.name} required />
          </div>
          <div>
            <Label htmlFor="version">Versión (Semántica)</Label>
            <Input id="version" name="version" defaultValue={app?.version} placeholder="Ej: 1.0.0" required />
          </div>
          <div>
            <Label htmlFor="category">Categoría</Label>
            <Input id="category" name="category" defaultValue={app?.category} required />
          </div>
          <div>
            <Label htmlFor="description">Descripción (Markdown)</Label>
            <Textarea id="description" name="description" defaultValue={app?.description} rows={3} />
          </div>
          {/* Add fields for adjuntos, rollback links etc. as per requirements */}
          <div className="flex items-center space-x-2">
            <Checkbox id="published" name="published" defaultChecked={app?.published} />
            <Label htmlFor="published">Publicada</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="featured" name="featured" defaultChecked={app?.featured} />
            <Label htmlFor="featured">Novedad Destacada</Label>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button type="submit">{app ? 'Actualizar' : 'Añadir'} Aplicación</Button>
          </DialogFooter>
        </form>
      );
      
      const NewsForm = ({ item, onSubmit, onCancel }) => (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" defaultValue={item?.title} required />
          </div>
          <div>
            <Label htmlFor="date">Fecha</Label>
            <Input id="date" name="date" type="date" defaultValue={item?.date || new Date().toISOString().split('T')[0]} required />
          </div>
          <div>
            <Label htmlFor="category">Categoría</Label>
            <Input id="category" name="category" defaultValue={item?.category} required />
          </div>
          <div>
            <Label htmlFor="summary">Resumen</Label>
            <Textarea id="summary" name="summary" defaultValue={item?.summary} rows={3} required />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="published" name="published" defaultChecked={item?.published} />
            <Label htmlFor="published">Publicada</Label>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button type="submit">{item ? 'Actualizar' : 'Añadir'} Noticia</Button>
          </DialogFooter>
        </form>
      );

      const TicketItem = ({ ticket }) => {
        const [assignedTo, setAssignedTo] = useState(ticket.assignedTo || '');
        const [status, setStatus] = useState(ticket.status || 'Abierto');

        const handleTicketUpdate = () => {
          const updatedTickets = tickets.map(t => 
            t.id === ticket.id ? { ...t, assignedTo, status } : t
          );
          setTickets(updatedTickets);
          localStorage.setItem('supportTickets', JSON.stringify(updatedTickets));
          toast({ title: "Ticket Actualizado", description: `El ticket ${ticket.id} ha sido actualizado.` });
        };
        
        return (
          <div className="bg-card p-4 rounded-md shadow-sm border border-border space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-primary">{ticket.subject}</p>
                <p className="text-sm text-muted-foreground">Usuario: {ticket.user} | App: {ticket.app}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                ticket.priority === 'Alta' || ticket.priority === 'Crítica' ? 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100' :
                ticket.priority === 'Media' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100' :
                'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100'
              }`}>{ticket.priority}</span>
            </div>
            <p className="text-sm text-muted-foreground">Fecha: {new Date(ticket.date || ticket.submittedAt).toLocaleDateString()}</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <div className="flex-1">
                <Label htmlFor={`assign-${ticket.id}`} className="text-xs">Asignar a:</Label>
                <Input 
                  id={`assign-${ticket.id}`} 
                  value={assignedTo} 
                  onChange={(e) => setAssignedTo(e.target.value)} 
                  placeholder="Nombre del agente"
                  className="h-8 text-sm"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor={`status-${ticket.id}`} className="text-xs">Estado:</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Abierto">Abierto</SelectItem>
                    <SelectItem value="En Progreso">En Progreso</SelectItem>
                    <SelectItem value="Resuelto">Resuelto</SelectItem>
                    <SelectItem value="Cerrado">Cerrado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button size="sm" onClick={handleTicketUpdate} className="mt-4 sm:mt-0 self-end sm:self-center">Actualizar</Button>
            </div>
          </div>
        );
      };


      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary">Panel de Administración</h1>
            {/* Global actions like "Settings" or "View Site" could go here */}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 gap-2 bg-primary/10 p-1 h-auto">
              <TabsTrigger value="apps" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><PackagePlus size={18}/> Aplicaciones</TabsTrigger>
              <TabsTrigger value="news" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Newspaper size={18}/> Novedades</TabsTrigger>
              <TabsTrigger value="tickets" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Ticket size={18}/> Tickets Soporte</TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Users size={18}/> Usuarios</TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><BarChart2 size={18}/> Analíticas</TabsTrigger>
            </TabsList>

            <TabsContent value="apps" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Gestionar Aplicaciones</h2>
                <Dialog open={isAppDialogOpen} onOpenChange={setIsAppDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => openAppDialog()}>
                      <PlusCircle size={18} className="mr-2" /> Añadir Aplicación
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>{currentApp ? 'Editar' : 'Añadir Nueva'} Aplicación</DialogTitle>
                      <DialogDescription>
                        Complete los detalles de la aplicación. Use Markdown para la descripción.
                      </DialogDescription>
                    </DialogHeader>
                    <AppForm app={currentApp} onSubmit={handleAppFormSubmit} onCancel={() => setIsAppDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-4">
                {apps.map(app => (
                  <div key={app.id} className="bg-card p-4 rounded-md shadow-sm border border-border flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg text-primary">{app.name} <span className="text-sm text-muted-foreground">(v{app.version})</span></h3>
                      <p className="text-xs text-muted-foreground">{app.category} - Última act: {app.lastUpdate}</p>
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${app.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {app.published ? 'Publicada' : 'Borrador'}
                      </span>
                      {app.featured && <span className="ml-2 text-xs font-medium px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">Destacada</span>}
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openAppDialog(app)}><Edit3 size={16} /></Button>
                      <Dialog>
                        <DialogTrigger asChild>
                           <Button variant="destructive" size="sm"><Trash2 size={16} /></Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirmar Eliminación</DialogTitle>
                            <DialogDescription>
                              ¿Está seguro de que desea eliminar la aplicación "{app.name}"? Esta acción no se puede deshacer.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button variant="destructive" onClick={() => deleteApp(app.id)}>Eliminar</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="news" className="mt-6">
               <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Gestionar Novedades</h2>
                <Dialog open={isNewsDialogOpen} onOpenChange={setIsNewsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => openNewsDialog()}>
                      <PlusCircle size={18} className="mr-2" /> Añadir Noticia
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>{currentNewsItem ? 'Editar' : 'Añadir Nueva'} Noticia</DialogTitle>
                      <DialogDescription>
                        Complete los detalles de la noticia.
                      </DialogDescription>
                    </DialogHeader>
                    <NewsForm item={currentNewsItem} onSubmit={handleNewsFormSubmit} onCancel={() => setIsNewsDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-4">
                {news.map(item => (
                  <div key={item.id} className="bg-card p-4 rounded-md shadow-sm border border-border flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg text-primary">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.category} - Fecha: {item.date}</p>
                       <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${item.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.published ? 'Publicada' : 'Borrador'}
                      </span>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openNewsDialog(item)}><Edit3 size={16} /></Button>
                       <Dialog>
                        <DialogTrigger asChild>
                           <Button variant="destructive" size="sm"><Trash2 size={16} /></Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirmar Eliminación</DialogTitle>
                            <DialogDescription>
                              ¿Está seguro de que desea eliminar la noticia "{item.title}"? Esta acción no se puede deshacer.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button variant="destructive" onClick={() => deleteNews(item.id)}>Eliminar</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tickets" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Gestionar Tickets de Soporte</h2>
                <Button variant="outline"><ListFilter size={18} className="mr-2" /> Filtrar Tickets</Button>
              </div>
              <div className="space-y-4">
                {tickets.length > 0 ? tickets.map(ticket => (
                  <TicketItem key={ticket.id} ticket={ticket} />
                )) : <p className="text-muted-foreground">No hay tickets de soporte.</p>}
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Gestión de Usuarios</h2>
              <p className="text-muted-foreground">Funcionalidad de gestión de usuarios (roles, permisos, etc.) se implementará aquí.</p>
              {/* Placeholder for user management UI */}
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Analíticas de Uso</h2>
              <p className="text-muted-foreground">Visualizaciones y estadísticas de uso de la plataforma y aplicaciones.</p>
              {/* Placeholder for analytics UI */}
            </TabsContent>

          </Tabs>
        </motion.div>
      );
    };

    export default AdminDashboard;