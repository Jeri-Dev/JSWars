export enum CustomerGender {
	MALE = "MALE",
	FEMALE = "FEMALE",
	NOT_SPECIFIED = "NOT_SPECIFIED",
}

export const CustomerGenderLabels: Record<CustomerGender, string> = {
	[CustomerGender.MALE]: "Masculino",
	[CustomerGender.FEMALE]: "Femenino",
	[CustomerGender.NOT_SPECIFIED]: "No Especificado",
}
