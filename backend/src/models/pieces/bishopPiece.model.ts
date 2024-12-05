import ChessPiece from "../chessPiece.model";

class BishopPiece extends ChessPiece {
    public moveTo(positionX: number, positionY: number): void {
        // Implémentation spécifique pour le fou
        console.log(`Bishop moves to position (${positionX}, ${positionY})`);
    }
}

export default BishopPiece;