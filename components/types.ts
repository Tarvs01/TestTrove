export interface MatcherQuestionBody{
    left: string[],
    right: string[],
    leftHeading: string,
    rightHeading: string,
    q: string
}

export interface ObjectiveQuestionBody{
    q: string,
    options: string[]
}

export interface OrderingQuestionBody{
    q: string,
    orderItems: {id: string, value: string}[]
}

export interface ShortAnswerQuestionBody{
    q: string,
}

export interface MatcherSubObject {
    matchedWith: string;
    colorIndex: number;
}

export interface MatcherAnswer {
    [index: string] : MatcherSubObject
}

interface OrderingItem{
    id: string,
    value: string
}

export interface OrderingAnswer extends Array<OrderingItem>{}