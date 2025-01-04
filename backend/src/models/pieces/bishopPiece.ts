import ChessPiece from "../chessPiece.model";
import chessPieceServices from "../../services/chessPiece.services";
import { gameService } from "../../services/game.services";
import { GameDTO } from "../../dto/game.dto";

class BishopPiece extends ChessPiece {
    public static createInstance(piece_type: string, color: string, position: string, gameId: number): BishopPiece {
        return ChessPiece.createInstance("bishop", color, position, gameId) as BishopPiece;
    }

    public async getSlotsAvailable(toCheck : boolean, gameDto:GameDTO |null =null): Promise<string[]> {
        let slotsAvailable: string[] = [];
        let game = gameDto ? gameDto : await gameService.getGameById(this.game_id);
        if(!toCheck &&!await chessPieceServices.isTurnWithDTO(game, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        if (!toCheck && await chessPieceServices.isCheck(this.game_id)){
            let possibilities = await (await chessPieceServices.slotsAvailableForOutOfCheck(this.game_id));
            for (let [piece, slots] of possibilities) {
                if (piece.pieceType == this.piece_type && piece.color == this.color && piece.position == this.position) {
                    slotsAvailable = slotsAvailable.concat(slots);
                }
            }            
            return slotsAvailable;
        }
        //Déplacement du fou
        //haut gauche
        for(let i = parseInt(this.position[1]) + 1, j = this.position[0].charCodeAt(0) - 1; i <= 8 && j >= 97; i++, j--){
            if(await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, `${String.fromCharCode(j)}${i}`, game)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(j)}${i}`);
            if(await chessPieceServices.isChessPieceInPositionWithDTO(`${String.fromCharCode(j)}${i}`, game)){
                break;
            }
        }

        //haut droite
        for(let i = parseInt(this.position[1]) + 1, j = this.position[0].charCodeAt(0) + 1; i <= 8 && j <= 104; i++, j++){
            if(await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, `${String.fromCharCode(j)}${i}`, game)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(j)}${i}`);
            if(await chessPieceServices.isChessPieceInPositionWithDTO(`${String.fromCharCode(j)}${i}`, game)){
                break;
            }
        }

        //bas gauche
        for(let i = parseInt(this.position[1]) - 1, j = this.position[0].charCodeAt(0) - 1; i >= 1 && j >= 97; i--, j--){
            if(await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, `${String.fromCharCode(j)}${i}`, game)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(j)}${i}`);
            if(await chessPieceServices.isChessPieceInPositionWithDTO(`${String.fromCharCode(j)}${i}`, game)){
                break;
            }
        }

        //bas droite
        for(let i = parseInt(this.position[1]) - 1, j = this.position[0].charCodeAt(0) + 1; i >= 1 && j <= 104; i--, j++){
            if(await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, `${String.fromCharCode(j)}${i}`, game)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(j)}${i}`);
            if(await chessPieceServices.isChessPieceInPositionWithDTO(`${String.fromCharCode(j)}${i}`, game)){
                break;
            }
        }
        if(await chessPieceServices.isTurnWithDTO(game, this.color) && !toCheck){
                    return await chessPieceServices.removeSlotAvailablesForInCheck(game,slotsAvailable,this.position);
        }
        return slotsAvailable;
    }

    public async moveTo(position: string): Promise<void> {
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        await chessPieceServices.moveTo(this, position);
    }

}

export default BishopPiece;