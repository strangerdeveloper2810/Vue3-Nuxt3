// Toast utility for consistent notifications
// Use this composable within Vue components to get toast functions

export const useAppToast = () => {
  const toast = useToast();

  return {
    success: (title: string, description?: string) => {
      toast.add({
        title,
        description,
        icon: "i-heroicons-check-circle",
        color: "success",
      });
    },

    error: (title: string, description?: string) => {
      toast.add({
        title,
        description,
        icon: "i-heroicons-exclamation-triangle",
        color: "error",
      });
    },

    info: (title: string, description?: string) => {
      toast.add({
        title,
        description,
        icon: "i-heroicons-information-circle",
        color: "info",
      });
    },

    warning: (title: string, description?: string) => {
      toast.add({
        title,
        description,
        icon: "i-heroicons-exclamation-triangle",
        color: "warning",
      });
    },
  };
};
