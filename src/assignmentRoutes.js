const express = require("express");
const router = express.Router();

const assignmentModel = require("./assignmentModel");

function isValidAssignment(data) {
  return data.title && data.course && data.description && data.deadline && data.status;
}

router.get("/", async (req, res) => {
  try {
    const assignments = await assignmentModel.getAllAssignments();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve assignments" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const assignment = await assignmentModel.getAssignmentById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve assignment" });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!isValidAssignment(req.body)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const assignment = await assignmentModel.createAssignment(req.body);
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create assignment" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!isValidAssignment(req.body)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const assignment = await assignmentModel.updateAssignment(req.params.id, req.body);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Failed to update assignment" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const assignment = await assignmentModel.deleteAssignment(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete assignment" });
  }
});

module.exports = router;
