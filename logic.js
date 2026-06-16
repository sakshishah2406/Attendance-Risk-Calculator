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
function getBunkBudget(subject) {

    let present = subject.present;
    let absent = subject.absent;

    let total = present + absent;

    let bunks = 0;

    while (
        (present / (total + bunks)) * 100 >= 75
    ) {
        bunks++;
    }

    return bunks - 1;
}function getBunkBudget(subject) {

    let present = subject.present;
    let absent = subject.absent;

    let total = present + absent;

    let bunks = 0;

    while (
        (present / (total + bunks)) * 100 >= 75
    ) {
        bunks++;
    }

    return bunks - 1;
}
function simulateBunk(subject, futureBunks) {

    let newAbsent =
        subject.absent + futureBunks;

    let total =
        subject.present + newAbsent;

    if (total === 0) return 0;

    return (
        (subject.present / total) * 100
    ).toFixed(2);
}
function getRiskStatus(subject) {

    let attendance =
        parseFloat(
            getAttendancePercentage(subject)
        );

    if (attendance >= 75) {

        return {
            status: "SAFE",
            color: "green"
        };

    } else {

        return {
            status: "AT RISK",
            color: "red"
        };
    }
}
function predictAttendance(subject, futureBunks) {

    let present = subject.present;
    let absent = subject.absent;

    let newAbsent =
        absent + futureBunks;

    let total =
        present + newAbsent;

    if (total === 0) {
        return 0;
    }

    return (
        (present / total) * 100
    ).toFixed(2);
}
function getTodayDay() {

    const days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];

    return days[new Date().getDay()];
}

function getTodaysSubjects() {

    const timetable =
        loadTimetable();

    const today =
        getTodayDay();

    const subjects =
        getSubjects();

    return subjects.filter(subject => {

        if (
            timetable[subject.name]
        ) {

            return timetable[
                subject.name
            ][today];
        }

        return false;
    });
}

function addExtraLecture(
    subjectName,
    attended
){

    let subjects =
        getSubjects();

    subjects =
        subjects.map(subject => {

            if(
                subject.name ===
                subjectName
            ){

                if(
                    !subject.extraLectures
                ){
                    subject.extraLectures = [];
                }

                subject.extraLectures.push({

                    date:
                    new Date()
                    .toLocaleDateString(),

                    attended:
                    attended
                });

                if(attended){

                    subject.present++;

                }else{

                    subject.absent++;
                }
            }

            return subject;
        });

    saveSubjects(subjects);
}
function addExtraLecture(
    subjectName,
    attended
){

    let subjects =
        getSubjects();

    subjects =
        subjects.map(subject => {

            if(
                subject.name ===
                subjectName
            ){

                if(
                    !subject.extraLectures
                ){
                    subject.extraLectures = [];
                }

                subject.extraLectures.push({

                    date:
                    new Date()
                    .toLocaleDateString(),

                    attended:
                    attended
                });

                if(attended){

                    subject.present++;

                }else{

                    subject.absent++;
                }
            }

            return subject;
        });

    saveSubjects(subjects);
}
function getExtraLectures(
    subjectName
){

    let subjects =
        getSubjects();

    let subject =
        subjects.find(
            s =>
            s.name ===
            subjectName
        );

    return (
        subject
        ?.extraLectures
    ) || [];
}

function cancelLecture(subjectName){

    let subjects =
        getSubjects();

    subjects =
        subjects.map(subject => {

            if(
                subject.name ===
                subjectName
            ){

                let total =
                    subject.present +
                    subject.absent;

                if(total > 0){

                    if(
                        subject.absent > 0
                    ){

                        subject.absent--;

                    }else if(
                        subject.present > 0
                    ){

                        subject.present--;
                    }
                }
            }

            return subject;
        });

    saveSubjects(subjects);
}

function saveLectureSlot(slot){

    let slots =
        loadLectureSlots();

    slots.push(slot);

    localStorage.setItem(
        "lectureSlots",
        JSON.stringify(slots)
    );
}

function loadLectureSlots(){

    return JSON.parse(
        localStorage.getItem(
            "lectureSlots"
        )
    ) || [];
}