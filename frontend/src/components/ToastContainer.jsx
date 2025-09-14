import { useEffect } from 'react';

const Toast = ({ toast, onRemove }) => {
  const { id, message, type } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onRemove]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-teal-50 border-teal-200 text-teal-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return 'ℹ';
      default:
        return '•';
    }
  };

  return (
    <div className={`rounded-lg border p-4 shadow-sm transition-all ${getTypeStyles()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{getIcon()}</span>
          <span className="text-sm">{message}</span>
        </div>
        <button
          onClick={() => onRemove(id)}
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const ToastContainer = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default ToastContainer;