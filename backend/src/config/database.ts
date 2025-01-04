import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  define: {
    timestamps: false,
  },
  logging: false,
  storage: "./library.sqlite", // Chemin vers la base SQLite
});

export default sequelize;