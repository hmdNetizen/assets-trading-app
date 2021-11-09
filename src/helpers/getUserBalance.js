export const getUserBalance = (user) =>
  user ? user.balance + parseFloat(user.bonus) : 0;
