const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { readdirSync } = require("fs");
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,

    //==================
    writeConcern: {
      w: "majority",
    },
    //   ===============
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`CommuniCast server is running on port ${port}..`);
});
