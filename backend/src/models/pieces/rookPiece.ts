import chessPieceModel from "../chessPiece.model";
import ChessPiece from "../chessPiece.model";
import chessPieceServices from "../../services/chessPiece.services";
import { GameDTO } from "../../dto/game.dto";
import { gameService } from "../../services/game.services";

class RookPiece extends chessPieceModel {
    public static createInstance(piece_type: string, color: string, position: string, gameId: number): RookPiece {
        return ChessPiece.createInstance("rook", color, position, gameId) as RookPiece;
    }

    public async moveTo(position: string): Promise<void> {
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        await chessPieceServices.moveTo(this, position);
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
        // Implémentation spécifique pour la tour
        //haut
        for(let i = parseInt(this.position[1]) + 1; i <= 8; i++){
            if(await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, `${this.position[0]}${i}`, game)){
                break;
            }
            slotsAvailable.push(`${this.position[0]}${i}`);
            if(await chessPieceServices.isChessPieceInPositionWithDTO(`${this.position[0]}${i}`, game)){
                break;
            }
        }
        //bas
        for(let i = parseInt(this.position[1]) - 1; i >= 1; i--){
            if(await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, `${this.position[0]}${i}`, game)){
                break;
            }
            slotsAvailable.push(`${this.position[0]}${i}`);
            if(await chessPieceServices.isChessPieceInPositionWithDTO(`${this.position[0]}${i}`, game)){
                break;
            }
        }
        //gauche
        for(let i = this.position[0].charCodeAt(0) - 1; i >= 97; i--){
            if(await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, `${String.fromCharCode(i)}${parseInt(this.position[1])}`, game)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(i)}${parseInt(this.position[1])}`);
            if(await chessPieceServices.isChessPieceInPositionWithDTO(`${String.fromCharCode(i)}${parseInt(this.position[1])}`, game)){
                break;
            }
        }
        //droite
        for(let i = this.position[0].charCodeAt(0) + 1; i <= 104; i++){
            if(await chessPieceServices.isTwoPiecesInSameColorWithDTO(this.position, `${String.fromCharCode(i)}${parseInt(this.position[1])}`, game)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(i)}${parseInt(this.position[1])}`);
            if(await chessPieceServices.isChessPieceInPositionWithDTO(`${String.fromCharCode(i)}${parseInt(this.position[1])}`,game)){
                break;
            }
        }
        return slotsAvailable;
    }


}

export default RookPiece;