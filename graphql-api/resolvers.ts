//import { getAllExams, getAllStudents, getExam, getStudent } from '../database/database.ts'
import { db, AttendanceStatus, ExamStatus, Exam, Student, Take } from '../fake-database/main.ts';

const ExamResolver = (_parent: any, { id }: any, _context: any, _info: any) => db.Exams[id]
const StudentResolver = (_parent: any, { id }: any, _context: any, _info: any) => db.Students[id]
const TakeResolver = (_parent: any, { id }: any, _context: any, _info: any) => db.Takes[id]
const ExamsResolver = (_parent: any, {}: any, _context: any, _info: any) => Object.values(db.Exams);
const StudentsResolver = (_parent: any, {}: any, _context: any, _info: any) => Object.values(db.Students);

const StudentTakesResolver = (parent: any, { _id }: any, _context: any, _info: any) => {
  return Object.values(db.Takes).filter((take) => take.student.id === parent.id);
}

const TakeExamResolver = (parent: any, { _id }: any, _context: any, _info: any) => {
  return db.Exams[parent.exam.id];
}

const TakeStudentResolver = (parent: any, { _id }: any, _context: any, _info: any) => {
  return db.Students[parent.student.id];
}

const ExamTakesResolver = (parent: any, { _id }: any, _context: any, _info: any) => {
  return Object.values(db.Takes).filter((take) => take.exam.id === parent.id);
}

const AvailableExamsResolver = (parent: any, { studentId }: any, _context: any, _info: any) => {
  const examsOfStudent = Object.values(db.Takes).filter((take) => take.student.id == studentId).map((take) => take.exam.id);
  return Object.values(db.Exams).filter((exam) => (exam.status === ExamStatus.PLANNED) && (examsOfStudent.indexOf(exam.id) === -1));
}

export const resolvers = {
  Query: {
    Exam: ExamResolver,
    Student: StudentResolver,
    Take: TakeResolver,
    students: StudentsResolver,
    exams:  ExamsResolver,
    availableExams: AvailableExamsResolver
  },
  Student: {
    takes: StudentTakesResolver,
  },
  Take: {
    exam: TakeExamResolver,
    student: TakeStudentResolver,
  },
  Exam: {
    takes: ExamTakesResolver,
  }
}