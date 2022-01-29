//import { getAllExams, getAllStudents, getExam, getStudent } from '../database/database.ts'
import { db, AttendanceStatus, ExamStatus } from '../fake-database/main.ts';

type Attendance = {
  exam: Exam;
  student: Student;
  status: AttendanceStatus;
  grade?: number;
}

type ExamAttendance = {
  student: Student;
  status: AttendanceStatus;
  grade?: number;
}

type StudentAttendance = {
  exam: Exam;
  status: AttendanceStatus;
  grade?: number;
}

type Exam = {
  id: number;
  name: string;
  time: string;
  status: ExamStatus;
  students: Array <ExamAttendance>;
}

type Student = {
  id: number;
  name: string;
  exams: Array<StudentAttendance>;
}

export const resolvers = {
  Query: {
    Exam: (parent: any, { id }: any, context: any, info: any) => {
      // @ts-ignore Ignore DB structure
      return db.Exams[id];
    },
    allExams: () => {
      return Object.values(db.Exams);
    },
    Student: (parent: any, { id }: any, context: any, info: any) => {
      // @ts-ignore Ignore DB structure
      return db.Students[id];
    },
    allStudents: () => {
      let hydratedStudent : Student;
      return Object.values(db.Students).map((student) => {
        // @ts-ignore Ignore DB structure
        const exams : Array<StudentAttendance> = Object.values(db.Attendances).filter((attendance) => attendance.student === student).map((attendance) => ({ exam: attendance.exam, status: attendance.status, grade: attendance.grade || undefined }));
        hydratedStudent = {...student, exams }
        return hydratedStudent;
      });
    },
  }
}

