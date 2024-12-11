import chessPieceModel from "../chessPiece.model";
import chessPieceServices from "../../services/chessPiece.services";
import ChessPiece from "../chessPiece.model";

class QueenPiece extends chessPieceModel {
    public static createInstance(piece_type: string, color: string, position: string, gameId: number): QueenPiece {
        return ChessPiece.createInstance("queen", color, position, gameId) as QueenPiece;
    }

    public async moveTo(position: string): Promise<void> {
        await chessPieceServices.moveTo(this, position);
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