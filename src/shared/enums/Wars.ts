export enum WarStatus {
	IN_PROGRESS = "IN_PROGRESS",
	FINISHED = "FINISHED",
}

export enum WarsDifficulty {
	EASY = "EASY",
	MEDIUM = "MEDIUM",
	HARD = "HARD",
}

export const WARS_DIFFICULTY_LABELS: Record<WarsDifficulty, string> = {
	[WarsDifficulty.EASY]: "Fácil",
	[WarsDifficulty.MEDIUM]: "Intermedio",
	[WarsDifficulty.HARD]: "Difícil",
}
