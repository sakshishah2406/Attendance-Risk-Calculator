function saveSemesterData() {

    let startDate =
        document.getElementById("startDate").value;

    let endDate =
        document.getElementById("endDate").value;

    let minAttendance =
        document.getElementById("minAttendance").value;

    saveSemester(
        startDate,
        endDate,
        minAttendance
    );

    alert("Semester Saved");
}

function addSubjectData() {

    let name =
        document.getElementById("subjectName").value;

    if (!name) return;

    addSubject(name);

    renderSubjects();

    document.getElementById(
        "subjectName"
    ).value = "";

    renderTimetable();
}

function renderSubjects() {

    let subjects = getSubjects();

    let list =
        document.getElementById(
            "subjectList"
        );

    list.innerHTML = "";

    subjects.forEach(
        (subject, index) => {

            list.innerHTML += `
            <li>
                ${subject.name}
                <button onclick="removeSubject(${index})">
                    Delete
                </button>
            </li>
            `;
        }
    );
}

function removeSubject(index) {

    deleteSubject(index);

    renderSubjects();
    renderTimetable();
}

function renderTimetable() {

    let subjects = getSubjects();

    let table =
        document.getElementById(
            "timetableBody"
        );

    table.innerHTML = "";

    subjects.forEach(subject => {

        table.innerHTML += `
        <tr>
            <td>${subject.name}</td>

            <td><input type="checkbox"></td>
            <td><input type="checkbox"></td>
            <td><input type="checkbox"></td>
            <td><input type="checkbox"></td>
            <td><input type="checkbox"></td>
        </tr>
        `;
    });
}


function renderAttendanceScreen(){

    let subjects =
    getSubjects();

    let container =
    document.getElementById(
        "attendanceContainer"
    );

    container.innerHTML = "";

    subjects.forEach(subject => {

        container.innerHTML += `

        <div>

            <h3>${subject.name}</h3>

            <button
            onclick="markPresent('${subject.name}')">
            Present
            </button>

            <button
            onclick="markAbsent('${subject.name}')">
            Absent
            </button>

        </div>

        <br>
        `;
    });
}

function markPresent(subject){

    markAttendance(subject,"P");

    renderStats();
}

function markAbsent(subject){

    markAttendance(subject,"A");

    renderStats();
}

function renderStats(){

    let subjects =
    getSubjects();

    let container =
    document.getElementById(
        "statsContainer"
    );

    container.innerHTML = "";

    subjects.forEach(subject => {

        container.innerHTML += `

        <p>

        ${subject.name}

        -

        ${getAttendancePercentage(subject)}%

        </p>

        `;
    });
}

renderSubjects();
renderTimetable();
renderAttendanceScreen();
renderStats();