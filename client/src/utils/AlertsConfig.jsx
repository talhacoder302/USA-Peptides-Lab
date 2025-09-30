import { toast } from "react-toastify";

const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  style: {
    backgroundColor: "#fff",
    color: "#093161",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    padding: "12px 16px",
  },
  progressStyle: {
    background: "#fff",
  },
};

// Success Toast
export const successToast = (message) => {
  return toast.success(message, {
    ...toastConfig,
    style: {
      ...toastConfig.style,
      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
    },
    progressStyle: {
      background: "linear-gradient(90deg, #10B981, #059669)",
    },
  });
};

// Error Toast
export const errorToast = (message) => {
  return toast.error(message, {
    ...toastConfig,
    style: {
      ...toastConfig.style,
      boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
    },
    progressStyle: {
      background: "linear-gradient(90deg, #EF4444, #DC2626)",
    },
  });
};

// Warning Toast
export const warningToast = (message) => {
  return toast.warning(message, {
    ...toastConfig,
    style: {
      ...toastConfig.style,
      boxShadow: "0 4px 12px rgba(245, 158, 11, 0.15)",
    },
    progressStyle: {
      background: "linear-gradient(90deg, #F59E0B, #D97706)",
    },
  });
};

// Info Toast
export const infoToast = (message) => {
  return toast.info(message, {
    ...toastConfig,
    style: {
      ...toastConfig.style,
      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
    },
    progressStyle: {
      background: "linear-gradient(90deg, #3B82F6, #2563EB)",
    },
  });
};

// Loading Toast
export const loadingToast = (message) => {
  return toast.loading(message, {
    ...toastConfig,
    style: {
      ...toastConfig.style,

      boxShadow: "0 4px 12px rgba(107, 114, 128, 0.15)",
    },
  });
};

// Update Toast
export const updateToast = (toastId, type, message) => {
  const updateConfig = {
    ...toastConfig,
    render: message,
    type: type,
    isLoading: false,
    autoClose: 3000,
  };

  switch (type) {
    case "success":
      updateConfig.style = {
        ...toastConfig.style,
        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
      };
      updateConfig.progressStyle = {
        background: "linear-gradient(90deg, #10B981, #059669)",
      };
      break;
    case "error":
      updateConfig.style = {
        ...toastConfig.style,
        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
      };
      updateConfig.progressStyle = {
        background: "linear-gradient(90deg, #EF4444, #DC2626)",
      };
      break;
    case "warning":
      updateConfig.style = {
        ...toastConfig.style,
        boxShadow: "0 4px 12px rgba(245, 158, 11, 0.15)",
      };
      updateConfig.progressStyle = {
        background: "linear-gradient(90deg, #F59E0B, #D97706)",
      };
      break;
    case "info":
      updateConfig.style = {
        ...toastConfig.style,
        boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
      };
      updateConfig.progressStyle = {
        background: "linear-gradient(90deg, #3B82F6, #2563EB)",
      };
      break;
    default:
      break;
  }

  toast.update(toastId, updateConfig);
};

// Dismiss Toast
export const dismissToast = (toastId) => {
  if (toastId) {
    toast.dismiss(toastId);
  } else {
    toast.dismiss();
  }
};

// Dismiss All Toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};

// Promise Toast (for async operations)
export const promiseToast = (promise, messages) => {
  return toast.promise(
    promise,
    {
      pending: messages.pending || "Loading...",
      success: messages.success || "Success!",
      error: messages.error || "Error occurred!",
    },
    toastConfig
  );
};
