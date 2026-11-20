import type { RequestHandler } from "express";

export const allowFrontendOrigin: RequestHandler = (
  request,
  response,
  next,
) => {
  const frontendOrigin = process.env.FRONTEND_ORIGIN;

  response.vary("Origin");
  if (frontendOrigin && request.get("Origin") === frontendOrigin) {
    response.set("Access-Control-Allow-Origin", frontendOrigin);
  }

  next();
};
