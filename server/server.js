const app = require("./app.js");
const port = process.env.PORT | 8000;
app.listen(process.env.PORT, () => {
  console.log(`Server is Running on Port ${port}`);
});
