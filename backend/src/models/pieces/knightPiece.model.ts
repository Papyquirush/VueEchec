import ChessPiece from '../chessPiece.model';

class KnightPiece extends ChessPiece {
    public moveTo(positionX: number, positionY: number): void {
        // Implémentation spécifique pour le cavalier
        console.log(`Knight moves to position (${positionX}, ${positionY})`);
    }
}

export default KnightPiece;