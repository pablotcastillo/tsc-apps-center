
    import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import { Label } from '@/components/ui/label';
    import { Checkbox } from '@/components/ui/checkbox';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { useToast } from '@/components/ui/use-toast';
    import { Send, AlertCircle, Info, FileUp } from 'lucide-react';

    const initialAppsForSelect = [
      { id: 'app1', name: 'Gestor de Proyectos TSC' },
      { id: 'app2', name: 'Analizador de Datos IA' },
      { id: 'app3', name: 'CRM TSC Conecta' },
      { id: 'app4', name: 'EducaTech Plataforma' },
      { id: 'other', name: 'Otra / No listada' },
    ];

    const SupportPage = () => {
      const { toast } = useToast();
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        application: '',
        errorDate: '',
        errorTime: '',
        priority: 'medium',
        description: '',
        screenshot: null,
        agreeToTerms: false,
      });
      const [errors, setErrors] = useState({});
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [availableApps, setAvailableApps] = useState([]);

      useEffect(() => {
        setAvailableApps(initialAppsForSelect);
      }, []);

      const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };

      const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
      };
      
      const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, screenshot: e.target.files[0] }));
      };

      const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio.';
        if (!formData.email.trim()) newErrors.email = 'El correo electrónico es obligatorio.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El correo electrónico no es válido.';
        if (!formData.application) newErrors.application = 'Debe seleccionar una aplicación.';
        if (!formData.description.trim()) newErrors.description = 'La descripción del problema es obligatoria.';
        else if (formData.description.trim().length < 20) newErrors.description = 'La descripción debe tener al menos 20 caracteres.';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'Debe aceptar los términos y condiciones.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
          toast({
            title: "Error de Validación",
            description: "Por favor, corrija los errores en el formulario.",
            variant: "destructive",
          });
          return;
        }

        setIsSubmitting(true);
        // Simulate API call to submit form data (e.g., to Google Sheet via a backend or service)
        // For now, we'll just use localStorage as a placeholder
        try {
          const supportTickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
          const newTicket = { ...formData, id: Date.now(), status: 'abierto', submittedAt: new Date().toISOString() };
          // Remove file object before storing, as it's not serializable for localStorage directly
          const ticketToStore = { ...newTicket };
          delete ticketToStore.screenshot; 
          if (formData.screenshot) {
            ticketToStore.screenshotName = formData.screenshot.name; // Store filename
          }
          supportTickets.push(ticketToStore);
          localStorage.setItem('supportTickets', JSON.stringify(supportTickets));
          
          // Simulate delay
          await new Promise(resolve => setTimeout(resolve, 1500));

          toast({
            title: "Ticket Enviado",
            description: "Su solicitud de soporte ha sido enviada con éxito. Nos pondremos en contacto pronto.",
          });
          setFormData({
            name: '', email: '', application: '', errorDate: '', errorTime: '', priority: 'medium', description: '', screenshot: null, agreeToTerms: false,
          });
          setErrors({});
        } catch (error) {
          toast({
            title: "Error al Enviar",
            description: "Hubo un problema al enviar su solicitud. Por favor, inténtelo de nuevo.",
            variant: "destructive",
          });
        } finally {
          setIsSubmitting(false);
        }
      };
      
      const inputFieldVariants = {
        focus: { scale: 1.02, boxShadow: "0px 0px 8px rgba(46, 90, 141, 0.3)" },
      };

      return (
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl font-bold text-primary mb-3">Formulario de Soporte Técnico</h1>
            <p className="text-lg text-muted-foreground">
              ¿Experimentando problemas? Describa su incidente y nuestro equipo le asistirá.
            </p>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-8 bg-card p-8 rounded-xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-foreground">Nombre Completo</Label>
                <motion.div whileFocus="focus" variants={inputFieldVariants}>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Ej: Juan Pérez" className="mt-1" />
                </motion.div>
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground">Correo Electrónico</Label>
                <motion.div whileFocus="focus" variants={inputFieldVariants}>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Ej: juan.perez@example.com" className="mt-1" />
                </motion.div>
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="application" className="text-sm font-medium text-foreground">Aplicación Afectada</Label>
              <Select name="application" onValueChange={(value) => handleSelectChange('application', value)} value={formData.application}>
                <motion.div whileFocus="focus" variants={inputFieldVariants}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Seleccione una aplicación" />
                  </SelectTrigger>
                </motion.div>
                <SelectContent>
                  {availableApps.map(app => (
                    <SelectItem key={app.id} value={app.id}>{app.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.application && <p className="text-sm text-destructive mt-1">{errors.application}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="errorDate" className="text-sm font-medium text-foreground">Fecha del Error (Opcional)</Label>
                <motion.div whileFocus="focus" variants={inputFieldVariants}>
                  <Input id="errorDate" name="errorDate" type="date" value={formData.errorDate} onChange={handleInputChange} className="mt-1" />
                </motion.div>
              </div>
              <div>
                <Label htmlFor="errorTime" className="text-sm font-medium text-foreground">Hora del Error (Opcional)</Label>
                <motion.div whileFocus="focus" variants={inputFieldVariants}>
                  <Input id="errorTime" name="errorTime" type="time" value={formData.errorTime} onChange={handleInputChange} className="mt-1" />
                </motion.div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="priority" className="text-sm font-medium text-foreground">Prioridad</Label>
              <Select name="priority" onValueChange={(value) => handleSelectChange('priority', value)} defaultValue="medium" value={formData.priority}>
                <motion.div whileFocus="focus" variants={inputFieldVariants}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Seleccione la prioridad" />
                  </SelectTrigger>
                </motion.div>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="critical">Crítica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium text-foreground">Descripción Detallada del Problema</Label>
              <motion.div whileFocus="focus" variants={inputFieldVariants}>
                <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Describa el problema que está experimentando, incluyendo pasos para reproducirlo si es posible..." rows={5} className="mt-1" />
              </motion.div>
              {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
            </div>
            
            <div>
              <Label htmlFor="screenshot" className="text-sm font-medium text-foreground">Adjuntar Captura de Pantalla (Opcional)</Label>
              <motion.div whileFocus="focus" variants={inputFieldVariants} className="mt-1 flex items-center space-x-2 border border-input rounded-md p-2">
                <FileUp className="h-5 w-5 text-muted-foreground" />
                <Input id="screenshot" name="screenshot" type="file" onChange={handleFileChange} className="border-none p-0 h-auto file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
              </motion.div>
              {formData.screenshot && <p className="text-sm text-muted-foreground mt-1">Archivo seleccionado: {formData.screenshot.name}</p>}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="agreeToTerms" name="agreeToTerms" checked={formData.agreeToTerms} onCheckedChange={(checked) => handleSelectChange('agreeToTerms', checked)} />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="agreeToTerms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Acepto los términos y condiciones para el manejo de mi información.
                </Label>
                <p className="text-xs text-muted-foreground">
                  Su información será utilizada únicamente para resolver su solicitud de soporte.
                </p>
              </div>
            </div>
            {errors.agreeToTerms && <p className="text-sm text-destructive mt-1">{errors.agreeToTerms}</p>}

            <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-md border border-blue-200 dark:border-slate-700">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Proporcionar la mayor cantidad de detalles posible nos ayudará a resolver su problema más rápidamente.
                  </p>
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <motion.div 
                    className="mr-2 h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar Solicitud <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </motion.form>
        </div>
      );
    };

    export default SupportPage;
  