// const addNums = (nums) => {
//     console.log("nums", nums);
//     let sum = 0;
//     sum = nums.reduce((sum, num) => sum + num);
//     console.log("sum", sum);
//     // sum = nums.map((n, sum) => {
//     //     sum += n;
//     //     console.log("sum", sum);
//     // });
//     return sum;
// };

// let apiKey = "alskdjfayiausydoiasuydfoiayu";

// export const dogName = "Tanner";

// export { addNums, apiKey };

// class User {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     greet() {
//         console.log(`Hi, ${this.name}. I hear you are ${this.age} years old.`);
//         if (this.age > 99) {
//             console.log(
//                 `${this.age} is too old for a human. You must be a robot.`
//             );
//         }
//     }
// }

// export const user1 = new User("David", 831);

// export const [firstName, lastName] = ["George", "Washington"];

// export const { age, name } = { name: "John Lennon", age: 35 };

export const baseUser = { name: "John Lennon", age: 35 };

export const extendedUser = {
    isAdmin: 1,
    ...baseUser,
};

// export const hobbies = ["pizza", "dog", "fasting"];

// hobbies.push("advice");

// const newHobbies = ["walking", "movies"];

// export const mergedHobbies = [...hobbies, ...newHobbies];
