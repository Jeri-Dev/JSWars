export interface IRegisterUser {
	firstName: string
	lastName: string
	userName: string
	email: string
	password: string
	picture?: string
}

export interface ILoginUser {
	email: string
	password: string
}
