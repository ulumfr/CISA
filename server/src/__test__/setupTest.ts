import app from "../server";

let server: any;

beforeAll(() => {
  server = app.listen(3000);
});

afterAll(() => {
  server.close();
});

export default app;
