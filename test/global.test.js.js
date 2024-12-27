const request = require("supertest");
const app = require("../index");
const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();

beforeAll(async () => {
  await Prisma.ligabelanda.deleteMany();
  await Prisma.ligainggris.deleteMany();
  await Prisma.ligajerman.deleteMany();
  await Prisma.ligaprancis.deleteMany();
  await Prisma.ligaspanyol.deleteMany();
});

afterAll(async () => {
  await Prisma.$disconnect();
});

describe("Liga API Endpoints", () => {
  const liga = "ligainggris";
  let id;

  test("GET /ligabelanda - Read Footballers Data", async () => {
    const response = await request(app).get("/ligabelanda");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status === "success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("footballers");
  });
  test("GET /ligainggris - Read Footballers Data", async () => {
    const response = await request(app).get("/ligainggris");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status === "success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("footballers");
  });
  test("GET /ligajerman - Read Footballers Data", async () => {
    const response = await request(app).get("/ligajerman");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status === "success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("footballers");
  });
  test("GET /ligaprancis - Read Footballers Data", async () => {
    const response = await request(app).get("/ligaprancis");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status === "success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("footballers");
  });
  test("GET /ligaspanyol - Read Footballers Data", async () => {
    const response = await request(app).get("/ligaspanyol");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status === "success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("footballers");
  });

  test("POST /pemain/:liga - Create Footballer Data", async () => {
    const response = await request(app).post(`/pemain/${liga}`).send({
      nama: "Erling Haaland",
      umur: 20,
      posisi: "CF",
      NA: "Denmark",
      KA: "Borussia Dortmund",
      KSI: "Manchester City",
      harga: "1000000",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status === "success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("insertFootballer");
    id = response.body.insertFootballer.id;
  });

  test("PUT /pemain/:liga/:id - Edit Footballer Data", async () => {
    const response = await request(app).put(`/pemain/${liga}/${id}`).send({
      nama: "Erling Haaland",
      umur: 25,
      posisi: "CF",
      NA: "Denmark",
      KA: "Borussia Dortmund",
      KSI: "Manchester City",
      harga: "1000000",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body.status === "success");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("updateFootballer");
  });

  test("DELETE /pemain/:liga/:id - Menghapus Data Pemain", async () => {
    const response = await request(app).delete(`/pemain/${liga}/${id}`);

    expect(response.statusCode).toBe(202);
    expect(response.body).toHaveProperty("message");
  });
});
