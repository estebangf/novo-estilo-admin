


export default interface Breadcrumb { [key: string]: string }
/* {
  path: string
  name: string
  link: string
} */

const newBreadcrumb = (path: string, name: string) => {
  return { [path]: name }
}


export const BREADCRUMBS: { [key: string]: string } = {
  ...newBreadcrumb("user", ""),
  ...newBreadcrumb("list", "Lista de turnos"),
  ...newBreadcrumb("today", "Agenda del dia"),
  ...newBreadcrumb("account", "Tu cuenta"),
  ...newBreadcrumb("admin", "Administración"),
}