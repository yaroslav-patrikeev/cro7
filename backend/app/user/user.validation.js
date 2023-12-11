import { Joi, Segments, celebrate } from 'celebrate';
import {
  nameRegExp,
  passwordRegExp,
} from '../../constants/validation.constants.js';

const createUserValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(passwordRegExp),
    name: Joi.string().required().regex(nameRegExp),
    positions: Joi.array().required(),
    accesses: Joi.array().required(),
  }),
});

export { createUserValidator };
