import { FriendshipStatus } from "../enums/Friends"

export const MOCK_REQUESTS = [
	{
		id: 1,
		name: "Juan Ramírez",
		username: "juanr",
		status: FriendshipStatus.PENDING,
		incoming: true,
	},
	{
		id: 2,
		name: "Elena Cruz",
		username: "elena_c",
		status: FriendshipStatus.PENDING,
		incoming: false,
	},
	{
		id: 3,
		name: "Sofía Herrera",
		username: "sofia_h",
		status: FriendshipStatus.PENDING,
		incoming: true,
	},
	{
		id: 4,
		name: "Andrés López",
		username: "andres_l",
		status: FriendshipStatus.PENDING,
		incoming: false,
	},
]

export const MOCK_FRIENDS = [
	{
		id: 1,
		name: "María Pérez",
		username: "mariap",
		status: FriendshipStatus.ACCEPTED,
	},
	{
		id: 2,
		name: "Carlos Sánchez",
		username: "carlos_s",
		status: FriendshipStatus.ACCEPTED,
	},
	{
		id: 3,
		name: "Luisa Fernández",
		username: "luisa_fer",
		status: FriendshipStatus.ACCEPTED,
	},
	{
		id: 4,
		name: "Pedro Gómez",
		username: "pedro.g",
		status: FriendshipStatus.ACCEPTED,
	},
	{
		id: 5,
		name: "Ana Torres",
		username: "ana.t",
		status: FriendshipStatus.ACCEPTED,
	},
]
