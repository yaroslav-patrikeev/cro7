import { Joi, Segments, celebrate } from 'celebrate';
import { passwordRegExp } from '../../constants/validation.constants.js';

const loginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(passwordRegExp),
  }),
});

export { loginValidation };
