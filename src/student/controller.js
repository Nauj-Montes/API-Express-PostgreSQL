const pool = require("../../db.js");
const queries = require("./queries.js");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    const studentNotFound = results.rowCount === 0;
    if (studentNotFound) {
      res.status(404).send("Student doesn't exist in database");
      throw error;
    }

    res.status(200).json(results.rows);
  });
};

const createStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  pool.query(queries.checkEmailExist, [email], (error, results) => {
    if (results.rows.length > 0) {
      return res.status(400).send("Email already exists");
    } else {
      pool.query(
        queries.createStudent,
        [name, email, age, dob],
        (error, results) => {
          if (error) {
            throw error;
          }
          res.status(201).send(`Student added with ID: ${results.insertId}`);
        }
      );
    }
  });
};

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    const studentNotFound = results.rowCount === 0;
    if (studentNotFound) {
      res.status(404).send("Student doesn't exist in database");
      throw error;
    }

    pool.query(queries.deleteStudent, [id], (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).send("Student remove sucessfully");
    });
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    const studentNotFound = results.rowCount === 0;
    if (studentNotFound) {
      res.status(404).send("Student doesn't exist in database");
      throw error;
    }

    const { name, email, age, dob } = req.body;
    pool.query(
      queries.updateStudent,
      [name, email, age, dob, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`Student modified with ID: ${id}`);
      }
    );
  });
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
};
