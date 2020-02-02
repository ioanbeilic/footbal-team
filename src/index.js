const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  router = express.Router(),
  mongoose = require("mongoose");

const {
  createMatch,
  getAllMatches,
  getOneMatch,
  updateMatch,
  deleteMatch,
  getByIdMatch
} = require("./controllers/footballMatch.controller");
const FootballMatch = require("./models/footballMatch.schema");

const environment = "";

// connect to DB
if (environment === "dev") {
  try {
    mongoose.connect("mongodb://0.0.0.0:27017/football", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  } catch (error) {
    console.log(error);
  }
} else {
  try {
    mongoose.connect("mongodb://mongo:27017/football", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  } catch (error) {
    console.log(error);
  }
}

// swagger
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

const SocketIo = require("socket.io");

const app = express();

// settings
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router
  .route("/matches")
  .post(createMatch)
  .get(getAllMatches);

router
  .route("/match/:matchId")
  .get(getOneMatch)
  .put(updateMatch)
  .delete(deleteMatch);

router.param("matchId", getByIdMatch);

app.use("/api/v1", router);

// static file
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(app.get("port"), () => {
  console.info(`app on port ${app.get("port")}`);
});

// web socket
const io = SocketIo(server);

io.on("connection", socket => {
  console.log("new connection", socket.id);

  socket.on("post:data", data => {
    /**
     * 
 {
  "teams": [
    {
      "name": "Team 1"
    },
    {
      "name": "Team 2"
    }
  ],
  "location": "Madrid",
  "matchDate": "26/11/2020",
  "matchHour": "15:30",
  "result": ""
}

     */

    console.log(data);
    FootballMatch.findByIdAndUpdate(
      data._id,
      {
        teams: [{ name: data.team1 }, { name: data.team2 }],
        location: data.location,
        matchDate: data.matchDate,
        matchHour: data.matchHour,
        result: data.result
      },
      { new: true },
      (err, matches) => {
        if (err) {
          console.log(err);
        } else {
          console.log(matches);
          io.sockets.emit("post:data", matches);
          io.sockets
            .to(socket.id)
            .emit("message", { message: "You have change the data" });
        }
      }
    );
  });
});
