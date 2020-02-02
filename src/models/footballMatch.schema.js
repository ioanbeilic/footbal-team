const { Schema, model } = require("mongoose");

/**
- equipos 
- ubicación
- fecha 
- hora 
- resultado 
- lista de los jugadores que participan  para cada equipo
- El jugador que marca un gol
- La hora a la que se hizo un gol
- El jugador que recibe una tarjeta amarilla o roja
- El momento en que recibe una tarjeta amarilla o roja
 */

//defining team schema

const FootballMatchSchema = new Schema(
  {
    teams: [
      {
        name: {
          type: String,
          require: true
        }
        // players: [{ name: String }]
      }
    ],
    location: {
      type: String,
      required: true,
      trim: true
    },
    matchDate: {
      type: String,
      required: false
    },
    matchHour: {
      type: String,
      required: false
    },
    result: {
      type: String,
      required: false
    },
    goals: [
      {
        player: {
          name: String,
          required: false
        },

        hour: {
          type: String,
          required: false
        }
      }
    ],
    cards: [
      {
        player: {
          name: String,
          required: false
        },
        color: {
          type: String
        },
        hour: {
          type: String,
          required: false
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = model("FootballMatch", FootballMatchSchema);
