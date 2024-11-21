import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ChessPieceAttributes {
    id: number;
    gameId: number;
    pieceType: string;
    color: string;
    position: string;
    hasMoved?: boolean;
    isCaptured?: boolean;
}


interface ChessPieceCreationAttributes extends Optional<ChessPieceAttributes, 'id'> {}

class ChessPiece extends Model<ChessPieceAttributes, ChessPieceCreationAttributes> implements ChessPieceAttributes {
    public id!: number;
    public gameId!: number;
    public pieceType!: string;
    public color!: string;
    public position!: string;
    public hasMoved!: boolean;
    public isCaptured!: boolean;

}

ChessPiece.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pieceType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hasMoved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isCaptured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: 'ChessPieces',
        sequelize,
    }
);

export default ChessPiece;