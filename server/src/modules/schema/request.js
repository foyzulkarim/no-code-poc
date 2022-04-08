const Joi = require("joi");

const schema = Joi.object().keys({
  _id: Joi.string().optional(),
  name: Joi.string().min(2).max(30).required(),
  body: Joi.object().optional(),
});

const validate = (data, user) => {
  const result = schema.validate(data);
  result.value = {
    ...data,
    createdBy: user.id,
    updatedBy: user.id,
  };
  return result;
};

module.exports = { validate };
