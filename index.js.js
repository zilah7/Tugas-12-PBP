const express = require("express");
const app = express();
const port = 3000;
const prisma = require("./modules/dbprisma");

app.use(express.json());

app.get("/ligabelanda", async (req, res) => {
  try {
    const footballers = await prisma.ligabelanda.findMany();
    res.status(200).json({
      status: "success",
      message: "Pemain berhasil diambil",
      footballers,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/ligainggris", async (req, res) => {
  try {
    const footballers = await prisma.ligainggris.findMany();
    res.status(200).json({
      status: "success",
      message: "Pemain berhasil diambil",
      footballers,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/ligajerman", async (req, res) => {
  try {
    const footballers = await prisma.ligajerman.findMany();
    res.status(200).json({
      status: "success",
      message: "Pemain berhasil diambil",
      footballers,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/ligaprancis", async (req, res) => {
  try {
    const footballers = await prisma.ligaprancis.findMany();
    res.status(200).json({
      status: "success",
      message: "Pemain berhasil diambil",
      footballers,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/ligaspanyol", async (req, res) => {
  try {
    const footballers = await prisma.ligaspanyol.findMany();
    res.status(200).json({
      status: "success",
      message: "Pemain berhasil diambil",
      footballers,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/pemain/:liga", async (req, res) => {
  const liga = req.params.liga;
  const { nama, umur, posisi, NA, KA, KSI, harga } = req.body;

  try {
    const insertFootballer = await prisma[liga].create({
      data: {
        nama,
        umur,
        posisi,
        NA,
        KA,
        KSI,
        harga,
      },
    });
    console.log(insertFootballer.id);
    res.status(201).json({
      status: "success",
      message: "Pemain berhasil ditambahkan ke liga " + liga,
      insertFootballer: insertFootballer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/pemain/:liga/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const liga = req.params.liga;

  const { nama, umur, posisi, NA, KA, KSI, harga } = req.body;

  try {
    const updateFootballer = await prisma[liga].update({
      where: { id },
      data: {
        nama,
        umur,
        posisi,
        NA,
        KA,
        KSI,
        harga,
      },
    });
    res
      .status(200)
      .json({
        status: "success",
        message: "Data pemain berhasil diupdate!",
        updateFootballer: updateFootballer,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.delete("/pemain/:liga/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const liga = req.params.liga;
  try {
    const deleteUser = await prisma[liga].delete({
      where: { id },
    });
    res
      .status(202)
      .json({ status: "success", message: "Data pemain berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

module.exports = app;
