const express = require("express");
const { getQuery } = require("./service");
const {
  getByIdHandler,
  saveHandler,
  updateHandler,
  searchHandler: baseSearchHandler,
  countHandler: baseCountHandler,
  deleteHandler,
} = require("../../core/controller");
const { validate } = require("./request");
const { handleValidation } = require("../../common/middlewares");
const { dynamicSave, dynamicSearch2 } = require("../../core/repository");

const router = express.Router();

const searchHandler = async (req, res, next) => {
  req.searchQuery = getQuery({ ...req.body, userId: req.user.id });
  return baseSearchHandler(req, res, next);
};

const countHandler = async (req, res, next) => {
  req.searchQuery = getQuery({ ...req.body, userId: req.user.id });
  return baseCountHandler(req, res, next);
};

const dynamicSaveHandler = async (req, res) => {
  const { modelName, payload } = req.body;
  if (modelName) {
    req.modelName = modelName;
    const response = await dynamicSave(payload, modelName);
    return res.status(200).send(response);
  }
  return res.status(200).send({});
};

const dynamicSearch = async (req, res) => {
  const { modelName, payload } = req.body;
  req.modelName = modelName;
  req.searchQuery = {};
  if (modelName) {
    const data = await dynamicSearch2(payload, req.searchQuery, modelName);
    return res.status(200).send({ data, total: 0 });
  }
  return res.status(200).send({ data: [], total: 0 });
};

router.get("/detail", getByIdHandler);
router.post("/create", handleValidation(validate), saveHandler);
router.put("/update", handleValidation(validate), updateHandler);
router.post("/search", searchHandler);
router.post("/count", countHandler);
router.delete("/delete", deleteHandler);
router.post("/dynamicSave", dynamicSaveHandler);
router.post("/dynamicSearch", dynamicSearch);

module.exports = router;
