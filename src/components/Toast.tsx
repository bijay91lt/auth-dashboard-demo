import { useToast } from "../contexts/toasts";

const Toast = () => {
  const { toasts, hideToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => {
        let bgColor = 'bg-blue-500';
        if (toast.type === 'success') bgColor = 'bg-green-500';
        if (toast.type === 'error') bgColor = 'bg-red-500';

        return (
          <div
            key={toast.id}
            className={`text-white px-4 py-2 rounded shadow-lg ${bgColor} animate-fade-in`}
            onClick={() => hideToast(toast.id)}
          >
            {toast.message}
          </div>
        );
      })}
    </div>
  );
};

export default Toast;