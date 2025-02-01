// how reduce works

// array.reduce(function(total, currentValue, currentIndex, arr), initialValue)

const nums = [1, 2, 3, 4];
const initialValue = 90;

const addItUp = nums.reduce((totalSum, currentValue) => {
    return totalSum + currentValue;
}, initialValue);

console.log(addItUp);
