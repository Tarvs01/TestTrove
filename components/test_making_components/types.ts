export interface ShortAnswer{
    id: string;
    question: string;
    answers: {id: number, value: string}[];
    strictAnswers: boolean;
}

export interface MultiOptions{
    id: string;
    question: string;
    options: {id: number, value: string}[];
    answer: number[];
}

export interface Objective{
    id: string;
    question: string;
    options: {id: number, value: string}[];
    answer: number;
}

export interface Ordering{
    id: string;
    question: string;
    orderItems: {id: number, value: string}[];
}

export interface Matcher{
    id: string;
    question: string;
    matches: {id: number, left: string, right: string}[];
}