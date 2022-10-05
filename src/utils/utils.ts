export const createArrayOfLength = (startNumber: number, length: number | null) => {
    const array = [];

    if (!length || length < startNumber) {
        return [];
    }

    for (let i = startNumber; i <= length; i++) {
        array.push(i);
    }

    return array;
}
