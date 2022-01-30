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

export type Exam = {
  id: number;
  name: string;
  time: string;
  status: ExamStatus;
}

export type Student = {
  id: number;
  name: string;
}
export type Take = {
  id: number;
  student: Student;
  exam: Exam;
  status: AttendanceStatus;
}

const Students: { [key: number]: Student } = {
  1: { id: 1, name: 'Yannic Brügger'},
  2: { id: 2, name: 'Bene Engel'},
  3: { id: 3, name: 'Jan Koll'},
  4: { id: 4, name: 'Tim Loges'},
};

const Exams: { [key: number]: Exam } = {
  1: { id: 1, name: 'SPV mündliche Prüfung', time: '2021-01-20T12:00', status: ExamStatus.PLANNED },
  2: { id: 2, name: 'Web Tech Prüfung', time: '2021-01-25T14:00', status: ExamStatus.PLANNED },
};

const Takes: { [key: number]: Take } = {
  1: { id: 1, student: Students[1], exam: Exams[1], status: AttendanceStatus.SIGNED_IN },
  2: { id: 2, student: Students[2], exam: Exams[1], status: AttendanceStatus.SIGNED_IN },
  3: { id: 3, student: Students[3], exam: Exams[1], status: AttendanceStatus.SIGNED_IN },
};

export const db = { Students, Exams, Takes };