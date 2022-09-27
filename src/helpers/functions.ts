export function delimitBySemicolon(arr: string[]) {
    if (arr.length === 0) return null;
    return arr.reduce((prev, curr) => prev + ";" + curr);
}