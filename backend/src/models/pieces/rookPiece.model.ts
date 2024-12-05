import chessPieceModel from "../chessPiece.model";

class RookPiece extends chessPieceModel {
    public moveTo(positionX: string, positionY: number): void {
        // Implémentation spécifique pour le fou
        console.log(`Bishop moves to position (${positionX}, ${positionY})`);
    }
}

export default RookPiece;