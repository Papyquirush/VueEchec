import ChessPiece from '../chessPiece.model';

class PawnPiece extends ChessPiece {
    public moveTo(positionX: number, positionY: number): void {
        if(positionX < 0 || positionX > 7 || positionY < 0 || positionY > 7) {
            console.log("Invalid move");
        }

        if(this.position === `${positionX},${positionY}`) {
            console.log("Invalid move");
        }



        if(this.isPieceThere(positionX, positionY)) {
            if(this.isPieceAlly(positionX, positionY)) {
                console.log("Invalid move");
            }else {
                if (this.isMovePossible(positionX, positionY)) {
                    this.position = `${positionX},${positionY}`;
                    console.log(`PawnPiece moves to position (${positionX}, ${positionY}) and takes the piece`);
                } else {
                    console.log("Invalid move");
                }
            }
        }



        this.has_moved = true;
        this.position = `${positionX},${positionY}`;


        console.log(`PawnPiece moves to position (${positionX}, ${positionY})`);
    }
}

export default PawnPiece;