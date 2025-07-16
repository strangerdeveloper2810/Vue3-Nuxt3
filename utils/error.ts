// Error handling utilities

interface ErrorResponse {
  data?: {
    message?: string;
  };
  message?: string;
}

export function getErrorMessage(
  error: unknown,
  defaultMessage = "Đã có lỗi xảy ra"
): string {
  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object") {
    const errorObj = error as ErrorResponse;

    // Check for API error format
    if (errorObj.data?.message) {
      return errorObj.data.message;
    }

    // Check for standard error message
    if (errorObj.message) {
      return errorObj.message;
    }
  }

  return defaultMessage;
}
