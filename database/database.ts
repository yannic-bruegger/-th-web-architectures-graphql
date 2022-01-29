import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB(`${Deno.cwd()}/database/psso.db`, { mode: "write" });

export function getExam(id: string) {
  return db.query(`SELECT * FROM Exams WHERE id = ${id};`);
}

export function getAllExams() {
  return db.query(`SELECT * FROM Exams;`);
}


export function getStudent(id: string) {
  const columns = ['id', 'name'];
  const rows = db.query(`SELECT ${columns.join(',')} FROM Students WHERE id = ${id};`);
  return parseStudentRowsToObject(rows, columns);

}

export function getAllStudents() {
  return db.query(`SELECT name as name FROM Students;`);
}

function parseStudentRowsToObject(rows: any[], map: Array<string>) {
  const result: any[] = [];
  rows.forEach(row => {
    const obj: {[key: string]: any} = {};
    map.forEach((key, index) => {
      obj[key] = row[index];
    });
    result.push(obj);
  });
  return result;
}