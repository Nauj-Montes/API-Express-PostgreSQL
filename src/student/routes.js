const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", (req, res) => controller.getStudents(req, res));
router.post("/", (req, res) => controller.createStudent(req, res));
router.get("/:id", (req, res) => controller.getStudentById(req, res));
router.put("/:id", (req, res) => controller.updateStudent(req, res));
router.delete("/:id", (req, res) => controller.deleteStudent(req, res));

module.exports = router;
