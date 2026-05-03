const pool = require("./db");

async function getAllAssignments() {
  const result = await pool.query("SELECT * FROM assignments ORDER BY id ASC");
  return result.rows;
}

async function getAssignmentById(id) {
  const result = await pool.query("SELECT * FROM assignments WHERE id = $1", [id]);
  return result.rows[0];
}

async function createAssignment(data) {
  const { title, course, description, deadline, status } = data;

  const result = await pool.query(
    `INSERT INTO assignments (title, course, description, deadline, status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, course, description, deadline, status]
  );

  return result.rows[0];
}

async function updateAssignment(id, data) {
  const { title, course, description, deadline, status } = data;

  const result = await pool.query(
    `UPDATE assignments
     SET title = $1, course = $2, description = $3, deadline = $4, status = $5
     WHERE id = $6
     RETURNING *`,
    [title, course, description, deadline, status, id]
  );

  return result.rows[0];
}

async function deleteAssignment(id) {
  const result = await pool.query(
    "DELETE FROM assignments WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
}

module.exports = {
  getAllAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment
};
