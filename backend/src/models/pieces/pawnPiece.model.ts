import ChessPiece from '../chessPiece.model';
import chessPieceServices from "../../services/chessPiece.services";
import moveServices from "../../services/move.services";
import {gameService} from "../../services/game.services";


class PawnPiece extends ChessPiece {


    constructor(pawnPiece : PawnPiece) {
        super(pawnPiece);
    }


    public static createInstance(piece_type: string, color: string, position: string, gameId: number): PawnPiece {
        return ChessPiece.createInstance("pawn", color, position, gameId) as PawnPiece;
    }

    private letterToIndex(letter: string): number {
        return letter.charCodeAt(0) - 'a'.charCodeAt(0);
    }

    public async getSlotsAvailable(): Promise<string[]> {
        let slotsAvailable: string[] = [];
        //vérification d'une pièce devant le pion
        if((this.position[2]!=='8'&& this.color=='white')||(this.position[2]!=='1'&& this.color=='black')){
            let chessPieceInfront : boolean = this.color == 'white' ? await chessPieceServices.isChessPieceInPosition(`${this.position[0]}${parseInt(this.position[1]) + 1}`, this.game_id) : await chessPieceServices.isChessPieceInPosition(`${this.position[0]}${parseInt(this.position[1]) - 1}`, this.game_id);
            if(!chessPieceInfront) {
                slotsAvailable.push(this.color == 'white' ? `${this.position[0]}${parseInt(this.position[1]) + 1}` : `${this.position[0]}${parseInt(this.position[1]) - 1}`);
            }
        }
        //vérification si le pion n'a pas bougé si il y a une pièce deux cases devant
        if(!this.has_moved){
            let chessPieceTwoInfront : boolean = this.color == 'white' ? await chessPieceServices.isChessPieceInPosition(`${this.position[0]}${parseInt(this.position[1]) + 2}`, this.game_id) : await chessPieceServices.isChessPieceInPosition(`${this.position[0]}${parseInt(this.position[1]) - 2}`, this.game_id);
            if(!chessPieceTwoInfront) {
                slotsAvailable.push(this.color == 'white' ? `${this.position[0]}${parseInt(this.position[1]) + 2}` : `${this.position[0]}${parseInt(this.position[1]) - 2}`);
            }
        }
        //vérification des pièces à prendre
        let chessPieceLeft : boolean = this.color == 'white' ? await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) + 1}`, this.game_id) : await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) - 1}`, this.game_id);
        if(chessPieceLeft && !this.isPieceAlly(this.letterToIndex(String.fromCharCode(this.position[0].charCodeAt(0) - 1)), this.color == 'white' ? parseInt(this.position[1]) + 1 : parseInt(this.position[1]) - 1)){
            slotsAvailable.push(this.color == 'white' ? `${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) + 1}` : `${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) - 1}`);
        }
        let chessPieceRight : boolean = this.color == 'white' ? await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) + 1}`, this.game_id) : await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) - 1}`, this.game_id);
        if(chessPieceRight && !this.isPieceAlly(this.letterToIndex(String.fromCharCode(this.position[0].charCodeAt(0) + 1)), this.color == 'white' ? parseInt(this.position[1]) + 1 : parseInt(this.position[1]) - 1)){
            slotsAvailable.push(this.color == 'white' ? `${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) + 1}` : `${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) - 1}`);
        }

        return slotsAvailable;
    }

    public async moveTo(position : string): Promise<void> {
        const [positionX, positionY] = position.split('');


        let slots = await this.getSlotsAvailable();
        if(slots.includes(position)) {
            this.position = position;
            this.has_moved = true;
            await chessPieceServices.updateChessPiece(this.id, this.piece_type, this.color, position, this.game_id);


            console.log(`PawnPiece moves to position (${positionX}, ${positionY})`);
        }


    }



    public async promotePiece(pieceType: string): Promise<void> {
        const [currentXLetter, currentY] = this.position.split('');
        const newX = this.letterToIndex(currentXLetter);

        if(newX >= 0 || newX <= 8 || (parseInt(currentY) == 0 || parseInt(currentY) == 8)) {

            await chessPieceServices.updateChessPiece(this.id, pieceType, this.color, `${newX}${parseInt(currentY)}`, this.game_id);
        }

        console.log(`PawnPiece is promoted to ${pieceType}`);
    }




}

export default PawnPiece;