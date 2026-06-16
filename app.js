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


function renderAttendanceScreen() {

    let subjects =
        getTodaysSubjects();

    let container =
        document.getElementById(
            "attendanceContainer"
        );

    container.innerHTML = "";

    if(subjects.length === 0){

        container.innerHTML =
        "<p>No classes today</p>";

        return;
    }

    subjects.forEach(subject => {

        container.innerHTML += `

        <div>

            <h3>
            ${subject.name}
            </h3>

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

function markPresent(subjectName) {

    markAttendance(
        subjectName,
        "P"
    );

    renderStats();
    renderBunkCalculator();
    renderRiskDashboard();
}

function markAbsent(subjectName) {

    markAttendance(
        subjectName,
        "A"
    );

    renderStats();
    renderBunkCalculator();
    renderRiskDashboard();
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

function renderBunkCalculator() {

    let subjects =
        getSubjects();

    let container =
        document.getElementById(
            "bunkContainer"
        );

    container.innerHTML = "";

    subjects.forEach(subject => {

        container.innerHTML += `
        <div>

            <h3>${subject.name}</h3>

            <p>
            Bunks Left:
            ${getBunkBudget(subject)}
            </p>

        </div>

        <hr>
        `;
    });
}

function renderRiskDashboard() {

    let subjects =
        getSubjects();

    let container =
        document.getElementById(
            "riskContainer"
        );

    container.innerHTML = "";

    subjects.forEach(subject => {

        let risk =
            getRiskStatus(subject);

        let attendance =
            getAttendancePercentage(
                subject
            );

        let bunks =
            getBunkBudget(
                subject
            );

        container.innerHTML += `

        <div
        style="
        border:1px solid #ddd;
        padding:10px;
        margin:10px 0;
        border-radius:10px;
        ">

            <h3>
            ${subject.name}
            </h3>

            <p>
            Attendance:
            ${attendance}%
            </p>

            <p>
            Bunks Left:
            ${bunks}
            </p>

            <p
            style="
            color:${risk.color};
            font-weight:bold;
            ">

            ${risk.status}

            </p>

        </div>
        `;
    });
}

function renderPredictor() {

    let subjects =
        getSubjects();

    let container =
        document.getElementById(
            "predictorContainer"
        );

    container.innerHTML = "";

    subjects.forEach(subject => {

        container.innerHTML += `

        <div>

            <h3>${subject.name}</h3>

            <input
            type="number"
            min="0"
            value="0"
            id="future-${subject.name}"
            >

            <button
            onclick="calculatePrediction('${subject.name}')">

            Predict

            </button>

            <p
            id="result-${subject.name}">
            </p>

        </div>

        <hr>
        `;
    });
}

function calculatePrediction(
    subjectName
) {

    let subjects =
        getSubjects();

    let subject =
        subjects.find(
            s => s.name === subjectName
        );

    let futureBunks =
        parseInt(
            document.getElementById(
                `future-${subjectName}`
            ).value
        );

    let prediction =
        predictAttendance(
            subject,
            futureBunks
        );

    let result =
        document.getElementById(
            `result-${subjectName}`
        );

    result.innerHTML =
        `Future Attendance: ${prediction}%`;

    if(prediction < 75){

        result.innerHTML +=
        " ⚠️ AT RISK";

    } else {

        result.innerHTML +=
        " ✅ SAFE";
    }
}

function renderExtraLecture(){

    let subjects =
        getSubjects();

    let container =
        document.getElementById(
            "extraLectureContainer"
        );

    container.innerHTML = "";

    subjects.forEach(subject => {

        let count =
        getExtraLectures(
            subject.name
        ).length;

        let history =
getExtraLectures(
    subject.name
);

let historyHtml = "";

history.forEach(lecture => {

    historyHtml += `
    <li>
        ${lecture.date} -
        ${
            lecture.attended
            ? "Present"
            : "Absent"
        }
    </li>
    `;
});
        
        container.innerHTML += `

        <div>

            <h3>
            ${subject.name}
            </h3>

            <p>
            Extra Lectures:
            ${count}
            </p>


            <ul>
${historyHtml}
</ul>
            <button
            onclick="
            markExtraPresent(
            '${subject.name}'
            )">

            Extra Present

            </button>

            <button
            onclick="
            markExtraAbsent(
            '${subject.name}'
            )">

            Extra Absent

            </button>

        </div>

        <hr>
        `;
    });
}

function markExtraPresent(
    subjectName
){

    addExtraLecture(
        subjectName,
        true
    );

    refreshAll();
}

function markExtraAbsent(
    subjectName
){

    addExtraLecture(
        subjectName,
        false
    );

    refreshAll();
}

function renderCancelLecture(){

    let subjects =
        getSubjects();

    let container =
        document.getElementById(
            "cancelLectureContainer"
        );

    container.innerHTML = "";

    subjects.forEach(subject => {

        container.innerHTML += `

        <div>

            <h3>
            ${subject.name}
            </h3>

            <button
            onclick="
            cancelSubjectLecture(
            '${subject.name}'
            )">

            Cancel Lecture

            </button>

        </div>

        <hr>
        `;
    });
}

function cancelSubjectLecture(
    subjectName
){

    cancelLecture(
        subjectName
    );

    refreshAll();
}

function populateSubjects(){

    let subjects =
        getSubjects();

    let dropdown =
        document.getElementById(
            "slotSubject"
        );

    dropdown.innerHTML = "";

    subjects.forEach(subject => {

        dropdown.innerHTML += `

        <option>

        ${subject.name}

        </option>

        `;
    });
}


function addLectureSlot(){

    let subject =
        document.getElementById(
            "slotSubject"
        ).value;

    let day =
        document.getElementById(
            "slotDay"
        ).value;

    let startTime =
        document.getElementById(
            "startTime"
        ).value;

    let endTime =
        document.getElementById(
            "endTime"
        ).value;

    saveLectureSlot({

        subject,
        day,
        startTime,
        endTime

    });

    renderLectureSlots();
}

function renderLectureSlots(){

    let slots =
        loadLectureSlots();

    let container =
        document.getElementById(
            "slotContainer"
        );

    container.innerHTML = "";

    slots.forEach(slot => {

        container.innerHTML += `

        <div>

        ${slot.subject}

        -

        ${slot.day}

        -

        ${slot.startTime}

        to

        ${slot.endTime}

        </div>

        <br>
        `;
    });
}

   function refreshAll(){

    renderSubjects();
    renderTimetable();
    renderAttendanceScreen();
    renderStats();
    renderBunkCalculator();
    renderRiskDashboard();
    renderPredictor();
    renderExtraLecture();
    renderCancelLecture();

    populateSubjects();
    renderLectureSlots();
}

refreshAll();