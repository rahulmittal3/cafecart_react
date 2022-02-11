const createName = (name) => {
  const splitted = name.split("-");
  for (let i = 0; i < splitted.length; i++) {
    splitted[i] =
      splitted[i][0].toUpperCase() + splitted[i].substr(1).toLowerCase();
  }
  const finalString = splitted.join(" ");
  return finalString;
};
const object = { createName };
module.exports = object;
