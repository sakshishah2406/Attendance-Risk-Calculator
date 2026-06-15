function saveSemesterData(){

    let startDate =
    document.getElementById(
    "startDate").value;

    let endDate =
    document.getElementById(
    "endDate").value;

    let minAttendance =
    document.getElementById(
    "minAttendance").value;

    saveSemester(
        startDate,
        endDate,
        minAttendance
    );

    alert("Semester Saved");
}

function addSubjectData(){

    let name =
    document.getElementById(
    "subjectName").value;

    if(!name) return;

    addSubject(name);

    renderSubjects();

    document.getElementById(
    "subjectName").value = "";
}

function renderSubjects(){

    let subjects =
    getSubjects();

    let list =
    document.getElementById(
    "subjectList");

    list.innerHTML = "";

    subjects.forEach(
    (subject,index)=>{

        list.innerHTML += `
        <li>
            ${subject.name}
            <button
            onclick="removeSubject(${index})">
            Delete
            </button>
        </li>
        `;
    });
}

function removeSubject(index){

    deleteSubject(index);

    renderSubjects();
}

renderSubjects();