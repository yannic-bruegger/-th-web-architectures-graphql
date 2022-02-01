let students = [];

let availableExams = [];

let takenExams = [];


async function getTakenExams(studentId) {
  const query = {query: `{Student(id: ${studentId}){takes{status, exam{name, id, date: time}}}}`};
  const res = await fetch('http://127.0.0.1:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(query)
  });
  takenExams = Object.values((await res.json()).data.Student.takes);
}

async function getAvailableExams(studentId) {
  const query = {query: `{availableExams(studentId: ${studentId}){name, date: time, id}}`};
  const res = await fetch('http://127.0.0.1:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(query)
  });
  availableExams = Object.values((await res.json()).data.availableExams);
}


function updateTakenExams() {
  document.querySelectorAll('.taken-exams > div').forEach((element) => {
    element.remove();
  });

  takenExams.forEach((take) => {
    document.querySelectorAll('.taken-exams').forEach((container) => {
      const template = document.querySelector('.taken-exams #exam');
      template.content.querySelector('.name').innerText = take.exam.name;
      template.content.querySelector('.time').innerText = take.exam.date;
      const clone = document.importNode(template.content, true);
      container.appendChild(clone);
    });
  });
}

function updateAvailableExams() {
  document.querySelectorAll('.available-exams > div').forEach((element) => {
    element.remove();
  });

  availableExams.forEach((exam) => {
    document.querySelectorAll('.available-exams').forEach((container) => {
      const template = document.querySelector('.available-exams #exam');
      template.content.querySelector('.name').innerText = exam.name;
      template.content.querySelector('.time').innerText = exam.date;
      const clone = document.importNode(template.content, true);
      container.appendChild(clone);
    });
  });
}

async function getStudents() {
  const query = {query: `{students{name, id}}`};
  const res = await fetch('http://127.0.0.1:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(query)
  });
  students = Object.values((await res.json()).data.students);
}

function updateStudents(){
  document.querySelectorAll('#students > option').forEach((element) => {
    element.remove();
  });
  students.forEach((student) => {
    document.querySelectorAll('#students').forEach((container) => {
      const option = document.createElement('option');
      option.value = student.id;
      option.innerText = student.name;
      console.log(option)
      container.appendChild(option);
    });
  });
}

requestAnimationFrame(async () => {
  await getStudents();
  updateStudents();
  await updateExams();
  document.querySelector('#students').addEventListener('input', await updateExams);
});


async function updateExams() {
  await getAvailableExams(document.querySelector('#students').value);
  updateAvailableExams();
  await getTakenExams(document.querySelector('#students').value);
  updateTakenExams();
}