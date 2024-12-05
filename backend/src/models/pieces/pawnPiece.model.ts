import ChessPiece from '../chessPiece.model';

class PawnPiece extends ChessPiece {

    private letterToIndex(letter: string): number {
        return letter.charCodeAt(0) - 'a'.charCodeAt(0);
    }

    public moveTo(positionX: string, positionY: number): void {
        const [currentXLetter, currentY] = this.position.split('');
        const currentX = this.letterToIndex(currentXLetter);

        const newX = this.letterToIndex(positionX);

        if(newX < 0 || newX > 7 || positionY < 1 || positionY > 7) {
            console.log("Invalid move");
            return;
        }

        if(this.position === `${positionX}${positionY}`) {
            console.log("Invalid move");
            return;
        }

        if (!this.has_moved) {
            if (positionY - parseInt(currentY) > 2) {
                console.log("Invalid move");
                return;
            }
        }

        if(this.isMovePossible(newX, positionY)) {
            this.has_moved = true;
            this.position = `${positionX}${positionY}`;
        }

        console.log(`PawnPiece moves to position (${positionX}, ${positionY})`);
    }

    public isMovePossible(positionX: number, positionY: number): boolean {
        const [currentXLetter, currentY] = this.position.split('');
        const currentX = this.letterToIndex(currentXLetter);
        if(this.isPieceThere(positionX, positionY)) {
             if(this.canTakePiece(positionX, positionY)){
                 return true;
             }
        }
        return false;

    }

    public canTakePiece(positionX: number, positionY: number): boolean {
        if(this.isPieceAlly(positionX, positionY)) {
            console.log("Invalid move");
            return false;
        }

        const [currentXLetter, currentY] = this.position.split('');
        const currentX = this.letterToIndex(currentXLetter);

        if(this.color == "White" && (currentX + 1 === positionX && (parseInt(currentY) + 1 === positionY || parseInt(currentY) - 1 === positionY))) {
            return true;
        } else if(this.color == "Black" && (currentX - 1 === positionX && (parseInt(currentY) + 1 === positionY || parseInt(currentY) - 1 === positionY))) {
            return true;
        } else {
            console.log("Invalid move");
            return false;
        }
    }
}

export default PawnPiece;
