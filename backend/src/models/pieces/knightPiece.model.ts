import ChessPiece from '../chessPiece.model';

class KnightPiece extends ChessPiece {
    public moveTo(position: string): void {
        const [positionX, positionY] = position.split('');
        // Implémentation spécifique pour le cavalier
        console.log(`Knight moves to position (${positionX}, ${positionY})`);
    }
}

export default KnightPiece;