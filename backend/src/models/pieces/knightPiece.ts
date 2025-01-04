import ChessPiece from '../chessPiece.model';
import chessPieceServices from "../../services/chessPiece.services";
import { gameService } from '../../services/game.services';
import { GameDTO } from '../../dto/game.dto';

class KnightPiece extends ChessPiece {
    public static createInstance(piece_type: string, color: string, position: string, gameId: number): KnightPiece {
        return ChessPiece.createInstance("knight", color, position, gameId) as KnightPiece;
    }
    
    public async getSlotsAvailable(toCheck : boolean, gameDto:GameDTO |null =null): Promise<string[]> {
        let slotsAvailable: string[] = [];
        let game = gameDto ? gameDto : await gameService.getGameById(this.game_id);
        if(!toCheck &&!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        if (!toCheck && await chessPieceServices.isCheck(this.game_id)){
            let possibilities = await (await chessPieceServices.slotsAvailableForOutOfCheck(this.game_id));
            for (let [piece, slots] of possibilities) {
                console.log(piece.pieceType, this.piece_type, piece.color == this.color);
                if (piece.pieceType == this.piece_type && piece.color == this.color && piece.position == this.position) {
                    slotsAvailable = slotsAvailable.concat(slots);
                    console.log(slotsAvailable);
                }
            }            
            return slotsAvailable;
        }
        // Implémentation spécifique pour le cavalier
        //2haut 1gauche
        if(!await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) + 2}`, game)
            && parseInt(this.position[1]) + 2 <= 8 && this.position[0].charCodeAt(0) - 1 >= 97){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) + 2}`);
        }
        //2haut 1droite
        if(!await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) + 2}`, game)
            && parseInt(this.position[1]) + 2 <= 8 && this.position[0].charCodeAt(0) + 1 <= 104){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) + 2}`);
        }
        //2bas 1gauche
        if(!await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) - 2}`, game)
            && parseInt(this.position[1]) - 2 >= 1 && this.position[0].charCodeAt(0) - 1 >= 97){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) - 2}`);
        }
        //2bas 1droite
        if(!await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) - 2}`, game)
            && parseInt(this.position[1]) - 2 >= 1 && this.position[0].charCodeAt(0) + 1 <= 104){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) - 2}`);
        }
        //2gauche 1haut
        if(!await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) - 2)}${parseInt(this.position[1]) + 1}`, game)
            && parseInt(this.position[1]) + 1 <= 8 && this.position[0].charCodeAt(0) - 2 >= 97){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 2)}${parseInt(this.position[1]) + 1}`);
        }
        //2gauche 1bas
        if(!await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) - 2)}${parseInt(this.position[1]) - 1}`, game)
            && parseInt(this.position[1]) - 1 >= 1 && this.position[0].charCodeAt(0) - 2 >= 97){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 2)}${parseInt(this.position[1]) - 1}`);
        }
        //2droite 1haut
        if(!await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) + 2)}${parseInt(this.position[1]) + 1}`, game)
            && parseInt(this.position[1]) + 1 <= 8 && this.position[0].charCodeAt(0) + 2 <= 104){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 2)}${parseInt(this.position[1]) + 1}`);
        }
        //2droite 1bas
        if(!await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) + 2)}${parseInt(this.position[1]) - 1}`, game)
            && parseInt(this.position[1]) - 1 >= 1 && this.position[0].charCodeAt(0) + 2 <= 104){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 2)}${parseInt(this.position[1]) - 1}`);
        }
        if(await chessPieceServices.isTurn(this.game_id, this.color) ){
                    return await chessPieceServices.removeSlotAvailablesForInCheck(game,slotsAvailable,this.position);
        }
        return slotsAvailable;
    }

    public async moveTo(position: string): Promise<void> {
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        await chessPieceServices.moveTo(this, position);
    }
}

export default KnightPiece;