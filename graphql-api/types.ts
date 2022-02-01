import { gql } from 'https://deno.land/x/graphql_tag@0.0.1/mod.ts'

export const typeDefs = gql`

type Query {
  Exam(id: ID): Exam! 
  Student(id: ID): Student!
  Take(id: ID): Take!
  students: [Student!]
  exams: [Exam]!
  availableExams(studentId: ID): [Exam]!
}

type Mutation {
  takeExam(studentId: ID!, examId: ID!): Take!
  unregisterExam(studentId: ID!, examId: ID!): Take!
}

enum TakeStatus {
  SIGNED_IN
  SIGNED_OUT
  PASSED
  FAILED
}

enum ExamStatus {
  PLANNED
  CANCELED
  DONE
}

type Student {
  id: ID!
  name: String!
  takes: [Take]!
}

type Take {
  id: ID!
  student: Student!
  grade: Float
  status: TakeStatus!
  exam: Exam!
}

type Exam {
  id: ID!
  name: String!
  time: String!
  takes: [Take]!
}

`
