import { createBrowserRouter, type RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("../pages/index")).default,
        }),
      },
      {
        path: "index",
        lazy: async () => ({
          Component: (await import("../pages/index")).default,
        }),
      },
      {
        path: "calculator",
        lazy: async () => ({
          Component: (await import("../pages/calculator")).default,
        }),
      },
      {
        path: "calendar",
        lazy: async () => ({
          Component: (await import("../pages/calendar")).default,
        }),
      },
      {
        path: "time",
        lazy: async () => ({
          Component: (await import("../pages/time")).default,
        }),
      },
      {
        path: "file",
        lazy: async () => ({
          Component: (await import("../pages/file")).default,
        }),
      },
      {
        path: "user",
        lazy: async () => ({
          Component: (await import("../pages/user")).default,
        }),
      },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_APP_BASE_URL,
});
