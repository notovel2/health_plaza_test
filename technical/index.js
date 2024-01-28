/**
 * 
 * @param {string[]} strArray 
 */
const findLongestPrefix = (strArray) => {
    const firstStr = strArray[0];
    let index = null;

    for (let i = 0; i < firstStr.length; i++) {
        const isAllCharEqual = strArray.every((s) => s[i] === firstStr[i]);
        if (isAllCharEqual) {
            index = i;
        } else {
            break;
        }
    }

    if (index === null) {
        return '';
    }

    return firstStr.slice(0, index + 1);
}

const input = process.argv.slice(2);
console.log(findLongestPrefix(input));