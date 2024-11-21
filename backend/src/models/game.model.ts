import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface GameAttributes {
    id: number;
    playerWhite: string;
    playerBlack: string;
    isPublic: boolean;
    gameState: string;
    isFinished: boolean;
    winnerId: number | null;
    createdAt: Date;
    finishedAt: Date;
}

interface GameCreationAttributes extends Optional<GameAttributes, 'id'> {}

class Game extends Model<GameAttributes, GameCreationAttributes> implements GameAttributes {
    public isPublic!: boolean;
    public gameState!: string;
    public isFinished!: boolean;
    public winnerId!: number | null;
    public finishedAt!: Date;
    public id!: number;
    public playerWhite!: string;
    public playerBlack!: string;

    public readonly createdAt!: Date;
}

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        playerWhite: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        playerBlack: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        gameState: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isFinished: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        winnerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        finishedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: 'Game',
        timestamps: true,
    }
);

export default Game;