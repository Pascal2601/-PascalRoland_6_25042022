// configuration des variables d'environement
const dotenv = require("dotenv");
dotenv.config();

// application express
const express = require("express");

const app = express();

const mongoose = require("mongoose");

const saucesRoutes = require("./routes/sauces");

const path = require("path");

const cors = require("cors");

const helmet = require("helmet");

// Connexions à mongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.woq9f.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//middelware de configuration de cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use(cors());
// sécuriser les en-têtes HTPP
app.use(helmet());

//configuration de route sauces
app.use("/api/sauces", saucesRoutes);
module.exports = app;
