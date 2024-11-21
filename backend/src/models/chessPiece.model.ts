import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ChessPieceAttributes {
    id: number;
    game_id: number;
    piece_type: string;
    color: string;
    position: string;
    has_moved?: boolean;
    is_captured?: boolean;
}


interface ChessPieceCreationAttributes extends Optional<ChessPieceAttributes, 'id'> {}

class ChessPiece extends Model<ChessPieceAttributes, ChessPieceCreationAttributes> implements ChessPieceAttributes {
    public id!: number;
    public game_id!: number;
    public piece_type!: string;
    public color!: string;
    public position!: string;
    public has_moved!: boolean;
    public is_captured!: boolean;

}

ChessPiece.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        piece_type: {
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
        has_moved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_captured: {
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