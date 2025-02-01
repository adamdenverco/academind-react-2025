let mySleepHours = {
    sunday: 4.5,
    monday: 7.5,
    tuesday: 5.75,
    wednesday: 7,
    thursday: 5.75,
    friday: 8.5,
};

const getSleepHours = (day) => {
    return mySleepHours[day];
};

// console.log(getSleepHours('sunday'));
// console.log(getSleepHours('friday'));

const getActualSleepHours = () => {
    let sum = 0;
    for (const n in mySleepHours) {
        sum += mySleepHours[n];
        console.log(`${n}: ${mySleepHours[n]}`);
    }
    return sum;
};

console.log("getActualSleepHours:", getActualSleepHours());

const getIdealSleepHours = () => {
    const idealHours = 7.5;
    return idealHours * 7;
};
console.log("getIdealSleepHours:", getIdealSleepHours());

const calculateSleepDebt = () => {
    let actualSleepHours = getActualSleepHours();
    let idealSleepHours = getIdealSleepHours();

    let sleepDebt = idealSleepHours - actualSleepHours;

    if (sleepDebt === 0) {
        console.log("you got the perfect amount of rest");
    } else if (sleepDebt > 0) {
        let absSleepDebt = Math.abs(sleepDebt);
        console.log(`you need ${absSleepDebt} more hours of sleep`);
    } else if (sleepDebt < 0) {
        let absSleepDebt = Math.abs(sleepDebt);
        console.log(`you need ${absSleepDebt} less hours of sleep`);
    }
};

calculateSleepDebt();
