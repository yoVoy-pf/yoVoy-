import { Router } from "express";
import { ROLES_LIST } from "../authorization/roles";
import { getOrganizations } from "../controllers/organizations"
import { authenticateToken } from "../middlewares/authenticateToken";
import { verifyRoles } from "../middlewares/verifyRoles";

export const router = Router();

router.get("/", authenticateToken, verifyRoles(ROLES_LIST.Admin), getOrganizations)
