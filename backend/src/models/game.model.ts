import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './user.model';

interface GameAttributes {
    id: number;
    playerWhite: number|undefined;
    playerBlack: number|undefined;
    isPublic: boolean;
    gameState: string;
    isFinished: boolean;
    winnerId: number | null;
    createdAt: Date;
    finishedAt?: Date;
}

interface GameCreationAttributes extends Optional<GameAttributes, 'id'> {}

class Game extends Model<GameAttributes, GameCreationAttributes> implements GameAttributes {
    public isPublic!: boolean;
    public gameState!: string;
    public isFinished!: boolean;
    public winnerId!: number | null;
    public finishedAt!: Date;
    public id!: number;
    public playerWhite!: number;
    public playerBlack!: number;

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
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        playerBlack: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        isPublic: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        gameState: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isFinished: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        winnerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        finishedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'Game',
        timestamps: true,
    }
);


export default Game;