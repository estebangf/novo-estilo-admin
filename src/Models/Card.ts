import { RoleType } from "./Role"

export interface CardType {
  title: string
  subTitle: string
  description: string
  image: string
  link: string
  roles: RoleType[]
}