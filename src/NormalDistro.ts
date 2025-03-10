export default function Distribution(array: number[], numOfIntervals: number) {
    array.sort((n1, n2) => n1 - n2);
    console.log(array.sort((n1, n2) => n1 - n2));
    let newArray: number[] = [];
    const maxValueOfArray = array[array.length - 1];
    let IntervalLength = Math.floor(maxValueOfArray / numOfIntervals);
    let currentIndex = 0;
    for (let i = IntervalLength; i <= maxValueOfArray; i += IntervalLength) {
        let sum = 0;
        do {
            sum += 1;
            currentIndex++;
        } while (array[currentIndex] < i);
        newArray.push(sum);
    }

    return newArray;
}
