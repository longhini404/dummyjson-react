export interface Authentication {
  auth: (params: Authentication.Params) => Promise<void>
}

export namespace Authentication {
  export type Params = {
    username: string
    password: string
  }
}
