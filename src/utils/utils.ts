export const getSelectOptionsByAttribute = (attribute: string, optionsNumber: number) => {
    if(!optionsNumber) return [];

    const optionArray = [];

    for (let i = 1; i <= optionsNumber; i++) {
        optionArray.push({
            label: `${attribute} - ${i}`,
            value: i
        })
    }

    return optionArray;
}
