export interface IOrganization {
  id?: any
  name: string
  cvr: string
  active?: boolean
  updatedAt?: Date
  createdAt?: Date
}

export interface IOrganizationRegister {
  name: string,
  cvr: string,
  firstName: string,
  lastName: string,
  adminEmail: string,
  password: string,
  passwordRepeat: string
}
