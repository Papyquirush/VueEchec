import chessPieceModel from "../chessPiece.model";

class KingPiece extends chessPieceModel {
    public moveTo(positionX: number, positionY: number): void {
        // Implémentation spécifique pour le fou
        console.log(`Bishop moves to position (${positionX}, ${positionY})`);
    }
}

export default KingPiece;