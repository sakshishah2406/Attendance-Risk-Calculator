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

    if (total === 0) return 0;

    return ((present / total) * 100).toFixed(2);
}

// Subject Stats

function getSubjectStats(subject) {
    let total = subject.present + subject.absent;

    let percentage =
        total === 0
            ? 0
            : ((subject.present / total) * 100).toFixed(2);

    return {
        name: subject.name,
        total,
        percentage
    };
}

// Semester

function saveSemester(startDate, endDate, minAttendance) {

    const semester = {
        startDate,
        endDate,
        minAttendance
    };

    localStorage.setItem(
        "semester",
        JSON.stringify(semester)
    );
}

function loadSemester() {

    return JSON.parse(
        localStorage.getItem("semester")
    );
}

// Subjects

function getSubjects() {

    return JSON.parse(
        localStorage.getItem("subjects")
    ) || [];
}

function saveSubjects(subjects) {

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );
}

function addSubject(name) {

    let subjects = getSubjects();

    subjects.push({
        name,
        present: 0,
        absent: 0
    });

    saveSubjects(subjects);
}

function deleteSubject(index) {

    let subjects = getSubjects();

    subjects.splice(index, 1);

    saveSubjects(subjects);
}
// Timetable

function saveTimetable(timetable) {

    localStorage.setItem(
        "timetable",
        JSON.stringify(timetable)
    );
}

function loadTimetable() {

    return JSON.parse(
        localStorage.getItem("timetable")
    ) || {};
}
function markAttendance(subjectName, status) {

    let subjects = getSubjects();

    subjects = subjects.map(subject => {

        if(subject.name === subjectName){

            if(status === "P"){
                subject.present++;
            }

            if(status === "A"){
                subject.absent++;
            }
        }

        return subject;
    });

    saveSubjects(subjects);
}

function getAttendancePercentage(subject){

    let total =
    subject.present + subject.absent;

    if(total === 0) return 0;

    return (
        (subject.present / total) * 100
    ).toFixed(2);
}