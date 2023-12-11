const passwordRegExp =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+-=|\\]).{8,32}$/;
const nameRegExp = /.*[а-я] .*[а-я] .*[а-я]/;
export { nameRegExp, passwordRegExp };
