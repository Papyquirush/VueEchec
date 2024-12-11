import ChessPiece from "../chessPiece.model";

class BishopPiece extends ChessPiece {
    public moveTo(position: string): void {
        const [positionX, positionY] = position.split('');
        // Implémentation spécifique pour le fou
        console.log(`Bishop moves to position (${positionX}, ${positionY})`);
    }
}

export default BishopPiece;