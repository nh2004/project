import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    const toast = { id, message, type };
    
    setToasts(prev => [...prev, toast]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showSuccess = useCallback((message) => {
    addToast(message, 'success');
  }, [addToast]);

  const showError = useCallback((message) => {
    addToast(message, 'error');
  }, [addToast]);

  const showInfo = useCallback((message) => {
    addToast(message, 'info');
  }, [addToast]);

  return {
    toasts,
    showSuccess,
    showError,
    showInfo,
    removeToast,
  };
};