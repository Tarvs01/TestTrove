export interface MatcherQuestionBody{
    left: string[],
    right: string[],
    leftHeading: string,
    rightHeading: string,
    q: string
}

export interface ObjectiveQuestionBody{
    q: string,
    options: {id: number, value: string}[]
}

export interface OrderingQuestionBody{
    q: string,
    orderItems: {id: string, value: string}[]
}

export interface ShortAnswerQuestionBody{
    q: string,
}

export interface LongAnswerQuestionBody{
    q: string,
}

export interface MultiOptionsQuestionBody{
    q: string;
    options: {
        id: number;
        value: string;
        selected: boolean;
    }[];
}

export interface MatcherSubObject {
    matchedWith: string;
    colorIndex: number;
}

export interface MatcherAnswer {
    [index: string] : MatcherSubObject
}

export interface FinalAnswer {
    (questionIndex: number, answer: string | number | number[] | MatcherAnswer | OrderingAnswer) : void
}


interface OrderingItem{
    id: string,
    value: string
}

export interface OrderingAnswer extends Array<OrderingItem>{}