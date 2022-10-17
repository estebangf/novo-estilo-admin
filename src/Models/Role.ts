export type RoleType = "teacher" | "student" | "identified" | "unidentified" | "admin"


export const ROLES: { [key: string]: RoleType; } = {
  STUDENT: "student", // ESTUDIANTE
  TEACHER: "teacher", // DOCENTE
  IDENTIFIED: "identified", // IDENTIFICADO
  UNIDENTIFIED: "unidentified", // NO IDENTIFICADO
  ADMIN: "admin", // ADMINISTRADOR
}

type Roles = RoleType[]

export const ROLES_ALL: Roles = ["teacher", "student", "identified", "unidentified", "admin"]

export default Roles;