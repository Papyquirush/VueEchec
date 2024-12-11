import chessPieceModel from "../chessPiece.model";
import chessPieceServices from "../../services/chessPiece.services";

class RookPiece extends chessPieceModel {
    public moveTo(positionX: string, positionY: number): void {
        // Implémentation spécifique pour le fou
        console.log(`Bishop moves to position (${positionX}, ${positionY})`);
    }

    public async getSlotsAvailable(): Promise<string[]> {
        let slotsAvailable: string[] = [];
        // Implémentation spécifique pour la tour
        //haut
        for(let i = parseInt(this.position[1]) + 1; i <= 8; i++){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${this.position[0]}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${this.position[0]}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${this.position[0]}${i}`, this.game_id)){
                break;
            }
        }
        //bas
        for(let i = parseInt(this.position[1]) - 1; i >= 1; i--){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${this.position[0]}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${this.position[0]}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${this.position[0]}${i}`, this.game_id)){
                break;
            }
        }
        //gauche
        for(let i = this.position[0].charCodeAt(0) - 1; i >= 97; i--){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(i)}${parseInt(this.position[1])}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(i)}${parseInt(this.position[1])}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(i)}${parseInt(this.position[1])}`, this.game_id)){
                break;
            }
        }
        //droite
        for(let i = this.position[0].charCodeAt(0) + 1; i <= 104; i++){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(i)}${parseInt(this.position[1])}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(i)}${parseInt(this.position[1])}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(i)}${parseInt(this.position[1])}`, this.game_id)){
                break;
            }
        }
        //le roque
        if(!this.has_moved){
            if(this.color == 'white' && await chessPieceServices.isChessPieceInPosition('e1', this.game_id)){
                let kingPiece = await chessPieceServices.getChessPieceByPosition('e1', this.game_id);
                if(kingPiece.piece_type == 'king' && !this.has_moved){
                    switch(this.position){
                        case 'a1':
                            if(!await chessPieceServices.isChessPieceInPosition('b1', this.game_id) && !await chessPieceServices.isChessPieceInPosition('c1', this.game_id) && !await chessPieceServices.isChessPieceInPosition('d1', this.game_id)){
                                slotsAvailable.push('d1');
                            }
                            break;
                        case 'h1':
                            if(!await chessPieceServices.isChessPieceInPosition('f1', this.game_id) && !await chessPieceServices.isChessPieceInPosition('g1', this.game_id)){
                                slotsAvailable.push('f1');
                            }
                            break;
                        default:
                            break;
                    }
                }
            }else if(this.color == 'black' && await chessPieceServices.isChessPieceInPosition('e8', this.game_id)){
                let kingPiece = await chessPieceServices.getChessPieceByPosition('e8', this.game_id);
                if(kingPiece.piece_type == 'king' && !this.has_moved){
                    switch(this.position){
                        case 'a8':
                            if(!await chessPieceServices.isChessPieceInPosition('b8', this.game_id) && !await chessPieceServices.isChessPieceInPosition('c8', this.game_id) && !await chessPieceServices.isChessPieceInPosition('d8', this.game_id)){
                                slotsAvailable.push('d8');
                            }
                            break;
                        case 'h8':
                            if(!await chessPieceServices.isChessPieceInPosition('f8', this.game_id) && !await chessPieceServices.isChessPieceInPosition('g8', this.game_id)){
                                slotsAvailable.push('f8');
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        return slotsAvailable;
    }


}

export default RookPiece;