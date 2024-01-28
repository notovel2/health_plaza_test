export interface Choice {
    id: number;
    title: string;
}

export interface Question {
    id: number;
    title: string;
    choices: Choice[];
    answer: number;
}

export interface LeaderboardItem {
    score: number;
    title: string;
}
