;/*function calculateAttendance(present, absent) {

    let total = present + absent;

    if (total === 0) {
        return 0;
    }

    return (present / total) * 100;
}

console.log(calculateAttendance(18, 2));*/

/*function bunkBudget(totalClasses, presentClasses) {

    let required = Math.ceil(totalClasses * 0.75);

    return presentClasses - required;
}

console.log(
    bunkBudget(60, 50)
);*/

// Attendance %

function attendancePercentage(present, absent) {
    let total = present + absent;

    if (total === 0) return 0;

    return ((present / total) * 100).toFixed(2);
}

// Bunk Budget

function bunkBudget(totalClasses, presentClasses) {
    let required = Math.ceil(totalClasses * 0.75);

    return presentClasses - required;
}

// Future Prediction

function simulateBunk(present, absent, futureBunks) {
    let newAbsent = absent + futureBunks;
    let total = present + newAbsent;

    return ((present / total) * 100).toFixed(2);
}

/*console.log("Attendance:", attendancePercentage(18, 2) + "%");
console.log("Bunks Left:", bunkBudget(60, 50));
console.log("After 5 More Bunks:", simulateBunk(50, 10, 5) + "%");*/

function getSubjectStats(subject) {

    let total = subject.present + subject.absent;

    let percentage =
        ((subject.present / total) * 100).toFixed(2);

    return {
        name: subject.name,
        total,
        percentage
    };
}