let students = []

const CREDITS = {
    'differential': 7,
    'numerical_methods': 6,
    'functional_analysis': 5,
    'gui': 4,
    'web': 2,
    'os': 2
}

let MAX_NUMBER_OF_STUDENTS = +prompt("Number of students");
console.log(MAX_NUMBER_OF_STUDENTS);

let NUMBER_OF_STUDENTS = 0;

const CREDIT_VALUES = Object.keys(CREDITS).map(val => CREDITS[val]);

function calculateMog() {
    students.forEach(student => student.mog = (student.grades.reduce((acc, value, index) =>
        acc + value * CREDIT_VALUES[index], 0) / CREDIT_VALUES.reduce((acc, credit) => acc + credit)).toFixed(3));
    const existingTable = document.getElementById("result-mog");
    if (existingTable) {
        existingTable.remove();
    }
    const table = document.createElement('table');
    table.setAttribute("id", "result-mog")
    const trHeader = document.createElement('tr');
    const thName = document.createElement('th');
    thName.innerText = "Ուսանող";
    const thMog = document.createElement('th');
    thMog.innerText = "ՄՈԳ";
    trHeader.append(thName, thMog);
    table.append(trHeader);
    students.forEach(student => {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        tdName.innerText = student.firstName + " " + student.lastName + " - " + student.group;
        const tdMog = document.createElement('td');
        tdMog.innerText = student.mog;
        tr.append(tdName, tdMog);
        table.appendChild(tr);
    })
    const mogResult = document.getElementById("forma");
    mogResult.appendChild(table);
}

const next_student_button = document.getElementById("next_student");
next_student_button.addEventListener("click", function (event) {
    const firstName = document.getElementById("name").value;
    const lastName = document.getElementById("firstName").value;
    const group = document.getElementById("group").value;
    const grades = [...document.querySelectorAll(".grade")].map(grade => +(grade.value));

    if (!validate(firstName, lastName, group, grades)) {
        alert("Ստուգեք տվյալները!");
        return false;
    }
    students.push({
        firstName: firstName,
        lastName: lastName,
        group: group,
        grades: grades
    })
    const form = document.getElementById("forma");
    form.reset();
    NUMBER_OF_STUDENTS++;
    if (NUMBER_OF_STUDENTS === MAX_NUMBER_OF_STUDENTS) {
        next_student_button.disabled = true;
        calculateMog();
    }
});

function validate(firstName, lastName, group, grades) {
    console.log(grades.find(grade => grade < 0 || grade > 20));
    return firstName && lastName && group && !(grades.find(grade => grade <= 0 || grade > 20) !== undefined);
}
