import chessPieceModel from "../chessPiece.model";

class KingPiece extends chessPieceModel {
    public moveTo(position: string): void {
        const [positionX, positionY] = position.split('');
        // Implémentation spécifique pour le fou
        console.log(`Bishop moves to position (${positionX}, ${positionY})`);
    }
}

export default KingPiece;