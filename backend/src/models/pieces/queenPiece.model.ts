import chessPieceModel from "../chessPiece.model";
import chessPieceServices from "../../services/chessPiece.services";

class QueenPiece extends chessPieceModel {
    public moveTo(position: string): void {
        const [positionX, positionY] = position.split('');
        // Implémentation spécifique pour le fou
        console.log(`Bishop moves to position (${positionX}, ${positionY})`);
    }


    public async getSlotsAvailable(): Promise<string[]> {

        let slotsAvailable: string[] = [];

        //vérification d'une pièce devant le pion
        if((this.position[2]!=='8'&& this.color=='white')||(this.position[2]!=='1'&& this.color=='black')) {

            if(this.color == 'white') {
                for(let i = parseInt(this.position[1]) + 1; i <= 8; i++) {
                    let chessPieceInfront : boolean = await chessPieceServices.isChessPieceInPosition(`${this.position[0]}${i}`, this.game_id);
                    if(chessPieceInfront) {
                        if(!this.isPieceAlly(this.letterToIndex(this.position[0]), i)) {
                            slotsAvailable.push(`${this.position[0]}${i}`);
                        }
                        break;
                    } else {
                        slotsAvailable.push(`${this.position[0]}${i}`);
                    }
                }
            }else {
                for(let i = parseInt(this.position[1]) - 1; i >= 1; i--) {
                    let chessPieceInfront : boolean = await chessPieceServices.isChessPieceInPosition(`${this.position[0]}${i}`, this.game_id);
                    if(chessPieceInfront) {
                        if(!this.isPieceAlly(this.letterToIndex(this.position[0]), i)) {
                            slotsAvailable.push(`${this.position[0]}${i}`);
                        }
                        break;
                    } else {
                        slotsAvailable.push(`${this.position[0]}${i}`);
                    }
                }
            }

        }




        return slotsAvailable;
    }


    private letterToIndex(s: string) {
        return s.charCodeAt(0) - 'a'.charCodeAt(0);
    }
}

export default QueenPiece;