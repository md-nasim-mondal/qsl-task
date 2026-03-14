import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { JobRoutes } from "../modules/job/job.route";
import { ApplicationRoutes } from "../modules/application/application.route";
import { AuthRoutes } from "../modules/auth/auth.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/jobs",
    route: JobRoutes,
  },
  {
    path: "/applications",
    route: ApplicationRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
