import chessPieceModel from "../chessPiece.model";

import ChessPiece from "../chessPiece.model";

import chessPieceServices from "../../services/chessPiece.services";

class KingPiece extends chessPieceModel {
    public static createInstance(piece_type: string, color: string, position: string, gameId: number): KingPiece {
        return ChessPiece.createInstance("king", color, position, gameId) as KingPiece;
    }

    
    public async getSlotsAvailable(): Promise<string[]> {
        let slotsAvailable: string[] = [];
        // Implémentation spécifique pour le roi
        //haut
        if(parseInt(this.position[1]) + 1 <= 8){
            slotsAvailable.push(`${this.position[0]}${parseInt(this.position[1]) + 1}`);
        }
        //bas
        if(parseInt(this.position[1]) - 1 >= 1){
            slotsAvailable.push(`${this.position[0]}${parseInt(this.position[1]) - 1}`);
        }
        //gauche
        if(this.position[0].charCodeAt(0) - 1 >= 97){
            slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1])}`);
        }
        //droite
        if(this.position[0].charCodeAt(0) + 1 <= 104){
            slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1])}`);
        }
        //haut gauche
        if(parseInt(this.position[1]) + 1 <= 8 && this.position[0].charCodeAt(0) - 1 >= 97){
            slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) + 1}`);
        }
        //haut droite
        if(parseInt(this.position[1]) + 1 <= 8 && this.position[0].charCodeAt(0) + 1 <= 104){
            slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) + 1}`);
        }
        //bas gauche
        if(parseInt(this.position[1]) - 1 >= 1 && this.position[0].charCodeAt(0) - 1 >= 97){
            slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) - 1}`);
        }
        //bas droite
        if(parseInt(this.position[1]) - 1 >= 1 && this.position[0].charCodeAt(0) + 1 <= 104){
            slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) - 1}`);
        }
        //roque
        if(!this.has_moved){
            if(this.color == 'white'){
                if(await chessPieceServices.isChessPieceInPosition('e1', this.game_id)){
                    let kingPiece = await chessPieceServices.getChessPieceByPosition('e1', this.game_id);
                    if(kingPiece.piece_type == 'king' && !this.has_moved){
                        switch(this.position){
                            case 'a1':
                                if(await chessPieceServices.isChessPieceInPosition('a1', this.game_id)){
                                    let rookPiece = await chessPieceServices.getChessPieceByPosition('a1', this.game_id);
                                    if(rookPiece.piece_type == 'rook' && !rookPiece.has_moved){
                                        if(!await chessPieceServices.isChessPieceInPosition('b1', this.game_id) && !await chessPieceServices.isChessPieceInPosition('c1', this.game_id) && !await chessPieceServices.isChessPieceInPosition('d1', this.game_id)){
                                            slotsAvailable.push('c1');
                                        }
                                    }
                                }
                                break;
                            case 'h1':
                                if(await chessPieceServices.isChessPieceInPosition('h1', this.game_id)){
                                    let rookPiece = await chessPieceServices.getChessPieceByPosition('h1', this.game_id);
                                    if(rookPiece.piece_type == 'rook' && !rookPiece.has_moved){
                                        if(!await chessPieceServices.isChessPieceInPosition('f1', this.game_id) && !await chessPieceServices.isChessPieceInPosition('g1', this.game_id)){
                                            slotsAvailable.push('g1');
                                        }
                                    }
                                }
                                break;
                        }
                    }
                }
            }else{
                if(await chessPieceServices.isChessPieceInPosition('e8', this.game_id)){
                    let kingPiece = await chessPieceServices.getChessPieceByPosition('e8', this.game_id);
                    if(kingPiece.piece_type == 'king' && !this.has_moved){
                        switch(this.position){
                            case 'a8':
                                if(await chessPieceServices.isChessPieceInPosition('a8', this.game_id)){
                                    let rookPiece = await chessPieceServices.getChessPieceByPosition('a8', this.game_id);
                                    if(rookPiece.piece_type == 'rook' && !rookPiece.has_moved){
                                        if(!await chessPieceServices.isChessPieceInPosition('b8', this.game_id) && !await chessPieceServices.isChessPieceInPosition('c8', this.game_id) && !await chessPieceServices.isChessPieceInPosition('d8', this.game_id)){
                                            slotsAvailable.push('c8');
                                        }
                                    }
                                }
                                break;
                            case 'h8':
                                if(await chessPieceServices.isChessPieceInPosition('h8', this.game_id)){
                                    let rookPiece = await chessPieceServices.getChessPieceByPosition('h8', this.game_id);
                                    if(rookPiece.piece_type == 'rook' && !rookPiece.has_moved){
                                        if(!await chessPieceServices.isChessPieceInPosition('f8', this.game_id) && !await chessPieceServices.isChessPieceInPosition('g8', this.game_id)){
                                            slotsAvailable.push('g8');
                                        }
                                    }
                                }
                                break;
                        }
                    }
                }
            }
        }
        return slotsAvailable; 
    }


    public async moveTo(position: string): Promise<void> {
        await chessPieceServices.moveTo(this, position);
    }

}

export default KingPiece;