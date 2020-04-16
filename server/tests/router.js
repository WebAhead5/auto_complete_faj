/* eslint-disable no-unused-vars */
const test = require("tape");
const supertest = require("supertest");
const router = require("../src/router");
const app = require("../app");

test("route to index.html", t => {
    supertest(app)
      .get("/")
      .expect(200)
      .expect("content-type", "text/html; charset=UTF-8")
      .end((err, res) => {
        t.error(err);
        t.end();
      });
  });

  test("route to js files in src", t => {
    supertest(app)
      .get("/src/index.js")
      .expect(200)
      .expect("content-type", "application/javascript; charset=UTF-8")
      .end((err, res) => {
        t.error(err);
        t.end();
      });
  });

  test("route to css files in bublic", t => {
    supertest(app)
      .get("/index.css")
      .expect(200)
      .expect("content-type", "text/css; charset=UTF-8")
      .end((err, res) => {
        t.error(err);
        t.end();
      });
  });

