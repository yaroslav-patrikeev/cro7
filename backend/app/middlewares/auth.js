import jwt from 'jsonwebtoken';
import UnauthorizedError from '../../errors/UnauthorizedError.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const authorization = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
  }
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-code',
    );
  } catch (errors) {
    next(new UnauthorizedError('Неправильный токен'));
  }
  req.user = payload;
  next();
};

export default authorization;
