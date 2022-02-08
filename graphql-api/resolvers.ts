//import { getAllExams, getAllStudents, getExam, getStudent } from '../database/database.ts'
import { db, TakeStatus, ExamStatus, Exam, Student, Take } from '../fake-database/main.ts';

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
  const examsOfStudent = Object.values(db.Takes).filter((take) => take.student.id == studentId && (take.status === TakeStatus.SIGNED_IN || take.status === TakeStatus.PASSED) ).map((take) => take.exam.id);
  return Object.values(db.Exams).filter((exam) => (exam.status === ExamStatus.PLANNED) && (examsOfStudent.indexOf(exam.id) === -1));
}

const MutationTakeExamResolver = (parent: any, { studentId, examId }: any, _context: any, _info: any) => {
  const ids = Object.keys(db.Takes);
  const newKey = parseInt(ids.sort((a, b) => parseInt(a) - parseInt(b))[ids.length - 1]) + 1
  db.Takes[newKey] = {
    id: newKey,
    exam: db.Exams[examId],
    student: db.Students[studentId],
    status: TakeStatus.SIGNED_IN,
  }
  return db.Takes[newKey];
}

const MutationUnregisterExamResolver = (parent: any, { studentId, examId }: any, _context: any, _info: any) => {
  const resultId = Object.values(db.Takes).filter(take => (
    take.student.id == studentId && take.exam.id == examId && take.status === TakeStatus.SIGNED_IN
  ))[0].id;
  db.Takes[resultId].status = TakeStatus.SIGNED_OUT;
  return db.Takes[resultId];
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
  Mutation: {
    takeExam: MutationTakeExamResolver,
    unregisterExam: MutationUnregisterExamResolver,
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
