import { gql } from 'https://deno.land/x/graphql_tag@0.0.1/mod.ts'

export const typeDefs = gql`
type Query {
  Exam(id: ID): Exam!
  allExams: [Exam]!

  Student(id: ID): Student!
  allStudents: [Student]!
}

interface Person {
  id: ID!
  name: String!
}

type Professor implements Person {
  id: ID!
  name: String!
  professorship: String!
}

type Student implements Person{
  id: ID!
  name: String!
  exams: [Attendance]!
}

enum ExamStatus {
  PLANNED
  CANCELED
  DONE
}

type Exam {
  id: ID!
  name: String!
  attendance: [Attendance]!
  status: ExamStatus!
  time: String
}

enum AttendanceStatus {
  SIGNED_IN
  SIGNED_OUT
  PASSED
  FAILED
}

type Attendance {
  exam: Exam!
  student: Student!
  status: AttendanceStatus!
  grade: Float
}
`