import React from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { X } from 'lucide-react';
    import { Button } from '@/components/ui/button';

    const Modal = ({ isOpen, onClose, title, children }) => {
      const backdropVariants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      };

      const modalVariants = {
        hidden: { y: "-50px", opacity: 0, scale: 0.9 },
        visible: { y: "0px", opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
        exit: { y: "50px", opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
      };

      return (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={onClose}
            >
              <motion.div
                className="bg-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
              >
                <header className="flex items-center justify-between p-4 sm:p-6 border-b">
                  <h2 className="text-lg sm:text-xl font-semibold text-primary">{title}</h2>
                  <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
                    <X size={20} />
                    <span className="sr-only">Cerrar modal</span>
                  </Button>
                </header>
                <div className="p-4 sm:p-6 overflow-y-auto">
                  {children}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      );
    };

    export default Modal;