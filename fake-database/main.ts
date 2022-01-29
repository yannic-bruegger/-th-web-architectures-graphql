// import Students from './students.json' assert { type: "json" };
// import Exams from './exams.json' assert { type: "json" };
// import Professors from './professors.json' assert { type: "json" };
// import Attendance from './attendance.json' assert { type: "json" };

export enum ExamStatus {
  PLANNED,
  CANCELED,
  DONE
}
export enum AttendanceStatus {
  SIGNED_IN,
  SIGNED_OUT,
  PASSED,
  FAILED
}

const Students = {
  1: { id: 1, name: 'Yannic Brügger'},
  2: { id: 2, name: 'Bene Engel'},
  3: { id: 3, name: 'Jan Koll'},
  4: { id: 4, name: 'Tim Loges'},
};

const Exams = {
  1: { id: 1, name: 'SPV mündliche Prüfung', time: '2021-01-20T12:00', status: ExamStatus.PLANNED },
  2: { id: 2, name: 'Web Tech Prüfung', time: '2021-01-25T14:00', status: ExamStatus.PLANNED },
};

const Attendances = [
  { student: Students[1], exam: Exams[1], status: AttendanceStatus.SIGNED_IN },
  { student: Students[2], exam: Exams[1], status: AttendanceStatus.SIGNED_IN },
  { student: Students[3], exam: Exams[1], status: AttendanceStatus.SIGNED_IN },
]

export const db = { Students, Exams, Attendances };