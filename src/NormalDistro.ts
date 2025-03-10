export default function Distribution(array: number[], interval: number) {
    array.sort((n1, n2) => n1 - n2);
    console.log(array.sort((n1, n2) => n1 - n2));
    let newArray: number[] = [];
    for (let i = 0; i <= interval - 1; i++) {
        newArray.push(0);
        let j: number = i * 5;
        while (itFits(array[i * 5], array[(i + 1) * 5], array[j])) {
            newArray[i] += 1;
            j += 1;
        }
    }
    return newArray;
}

function itFits(min: number, max: number, num: number) {
    if (num >= min && num <= max) {
        console.log(`itFits(${num}) check: ${min}, ${max} - true`);
        return true;
    }
    console.log(`itFits(${num}) check: ${min}, ${max} - false`);
    return false;
}
