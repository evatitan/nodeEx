import express, { Router } from "express";
import db from "../../src/db.js";
import response from "../../utils/response.js";
const { NotFoundError, BadRequestError, success, failure } = response;
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { title, page = 1 } = req.query;
    const pageSize = 20;
    const offset = (parseInt(page) - 1) * pageSize;
    let query = db("articles").select("*");
    if (title) query = query.where("title", "like", `%${title}%`);
    const articles = await query.limit(pageSize).offset(offset);
    success(res, "get articles", { articles }, 200);
  } catch (error) {
    failure(res, error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const articles = await getArticle(id);
    success(res, "search article", articles, 200);
  } catch (error) {
    failure(res, error);
  }
});

router.post("/", async (req, res) => {
  try {
    const articleData = {
      title: req?.body?.title,
      content: req?.body?.content,
      created: new Date(),
      updated: new Date(),
    };
    validContent(articleData.title, articleData.content);
    const [insertedId] = await db("articles").insert(articleData);
    success(res, `add ${insertedId} article`);
  } catch (error) {
    failure(res, error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const article = await getArticle(id);
    const deleteId = await db("articles").where({ id }).del();
    success(res, `delete ${deleteId} article(s)`);
  } catch (error) {
    failure(res, error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const article = getArticle(id);
    const articleData = {
      title: req?.body?.title,
      content: req?.body?.content,
      updated: new Date(),
    };
    validContent(articleData.title, articleData.content);
    const updatedId = await db("articles").where({ id }).update(articleData);
    success(res, `update ${updatedId} article(s)`);
  } catch (error) {
    failure(res, error);
  }
});

async function getArticle(req) {
  const id = req;
  const article = await db("articles").select("*").where("id", id);
  if (!article) {
    throw new NotFoundError(`Can not find article with ID:${id}`);
  }
  return article;
}

function validContent(el1, el2) {
  if (el1 === "" || el2 === "") {
    throw new BadRequestError("Bad request");
  }
  return true;
}

export default router;
