export interface CardInterface {
    word: string,
    definition?: string,
    partOfSpeech?: string,
    examples?: string[],
    tags?: string[],
    relatedWords?: string[],
    dialect?: string,
    memorization?: 1 | 2 | 3 | 4 | 5
};
