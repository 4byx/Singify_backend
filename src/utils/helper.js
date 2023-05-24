export const checkUsername = (username) => {
  let pattern = /^[a-zA-Z0-9]{5,15}$/;
  if (pattern.test(username)) {
    return true;
  } else {
    return false;
  }
};
