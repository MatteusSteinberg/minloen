export interface IOrganization {
  id?: any
  name: string
  cvr: string
  active?: boolean
  address?: string
  zipCode?: string
  updatedAt?: Date
  createdAt?: Date
}

export interface IOrganizationRegister {
  name?: string,
  cvr?: string,
  firstName?: string,
  lastName?: string,
  adminEmail?: string,
  password?: string,
  passwordRepeat?: string
}
