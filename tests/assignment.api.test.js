const request = require("supertest");
const app = require("../src/app");
const assignmentModel = require("../src/assignmentModel");

jest.mock("../src/assignmentModel");

describe("Assignment API Tests", () => {
  const sampleAssignment = {
    id: 1,
    title: "API Testing Assignment",
    course: "Software Testing",
    description: "Test REST API endpoints using Jest and SuperTest.",
    deadline: "2026-05-15",
    status: "Published"
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/assignments should return all assignments", async () => {
    assignmentModel.getAllAssignments.mockResolvedValue([sampleAssignment]);

    const response = await request(app).get("/api/assignments");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe("API Testing Assignment");
  });

  test("GET /api/assignments/:id should return one assignment", async () => {
    assignmentModel.getAssignmentById.mockResolvedValue(sampleAssignment);

    const response = await request(app).get("/api/assignments/1");

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
  });

  test("GET /api/assignments/:id should return 404 when assignment is not found", async () => {
    assignmentModel.getAssignmentById.mockResolvedValue(null);

    const response = await request(app).get("/api/assignments/999");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Assignment not found");
  });

  test("POST /api/assignments should create assignment", async () => {
    assignmentModel.createAssignment.mockResolvedValue(sampleAssignment);

    const response = await request(app)
      .post("/api/assignments")
      .send({
        title: "API Testing Assignment",
        course: "Software Testing",
        description: "Test REST API endpoints using Jest and SuperTest.",
        deadline: "2026-05-15",
        status: "Published"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("API Testing Assignment");
  });

  test("POST /api/assignments should return 400 if fields are missing", async () => {
    const response = await request(app)
      .post("/api/assignments")
      .send({
        title: "Incomplete Assignment"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("All fields are required");
  });

  test("PUT /api/assignments/:id should update assignment", async () => {
    const updatedAssignment = {
      ...sampleAssignment,
      status: "Closed"
    };

    assignmentModel.updateAssignment.mockResolvedValue(updatedAssignment);

    const response = await request(app)
      .put("/api/assignments/1")
      .send({
        title: "API Testing Assignment",
        course: "Software Testing",
        description: "Updated description.",
        deadline: "2026-05-20",
        status: "Closed"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("Closed");
  });

  test("PUT /api/assignments/:id should return 400 if fields are missing", async () => {
    const response = await request(app)
      .put("/api/assignments/1")
      .send({
        title: "Only title"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("All fields are required");
  });

  test("PUT /api/assignments/:id should return 404 when assignment is not found", async () => {
    assignmentModel.updateAssignment.mockResolvedValue(null);

    const response = await request(app)
      .put("/api/assignments/999")
      .send({
        title: "Unknown",
        course: "Unknown",
        description: "Unknown",
        deadline: "2026-05-20",
        status: "Draft"
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Assignment not found");
  });

  test("DELETE /api/assignments/:id should delete assignment", async () => {
    assignmentModel.deleteAssignment.mockResolvedValue(sampleAssignment);

    const response = await request(app).delete("/api/assignments/1");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Assignment deleted successfully");
  });

  test("DELETE /api/assignments/:id should return 404 when assignment is not found", async () => {
    assignmentModel.deleteAssignment.mockResolvedValue(null);

    const response = await request(app).delete("/api/assignments/999");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Assignment not found");
  });
});
