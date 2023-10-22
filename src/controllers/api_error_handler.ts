import { ApiError } from "next/dist/server/api-utils";
import { ValidationError } from "yup";

const ApiErrorHandler = (
  error: unknown,
  defaultMessage: string,
  defaultStatusCode?: number
) => {
  let errorMessage = defaultMessage;
  let statusCode = defaultStatusCode || 500;
  if (error instanceof ValidationError) {
    errorMessage = error.message;
    statusCode = 400;
  }
  if (error instanceof ApiError) {
    errorMessage = error.message;
    statusCode = error.statusCode;
  }
  if (error instanceof Error) {
    console.log("Error: ", error.message);
  } else {
    console.log(defaultMessage);
  }
  return new Response(JSON.stringify({ message: errorMessage }), {
    status: statusCode,
  });
};
export default ApiErrorHandler;
