const express = require("express");
const router = express.Router();
const Transaccion = require("../models/Transaccion");

// CREATE
router.post("/", async (req, res) => {
  const nueva = new Transaccion(req.body);
  const saved = await nueva.save();
  res.json(saved);
});

// READ
router.get("/", async (req, res) => {
  const data = await Transaccion.find().sort({ fecha: -1 });
  res.json(data);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Transaccion.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Transaccion.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Eliminado" });
});

module.exports = router;