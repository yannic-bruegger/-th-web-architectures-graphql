const students = [
  {
    name : 'Yannic Brügger',
    id : '11125713'
  },
  {
    name : 'Jan Kollbär',
    id : '11125513'
  },
  {
    name : 'Wolfang Konen',
    id : '0000000'
  },
];

const exams = [
  {
    name : 'Sicherheit, Privatsphäre und Vertrauen',
    date : '2022-01-20T13:00',
    id : 'SPV2022-01-20'
  }
]

students.forEach((student) => {
  document.querySelectorAll('#students').forEach((container) => {
    const option = document.createElement('option');
    option.value = student.name;
    option.innerText = student.name;
    console.log(option)
    container.appendChild(option);
  });
});


function updateExams() {
  document.querySelectorAll('.available-exams > div').forEach((element) => {
    element.remove();
  });

  exams.forEach((exam) => {
    document.querySelectorAll('.available-exams').forEach((container) => {
      console.log('Test');
      const template = document.querySelector('#exam');
      template.content.querySelector('.name').innerText = exam.name;
      template.content.querySelector('.time').innerText = exam.date;
      const clone = document.importNode(template.content, true);
      container.appendChild(clone);
    });
  });
}

updateExams();