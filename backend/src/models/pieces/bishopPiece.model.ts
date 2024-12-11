import ChessPiece from "../chessPiece.model";
import chessPieceServices from "../../services/chessPiece.services";

class BishopPiece extends ChessPiece {
    public moveTo(position: string): void {
        const [positionX, positionY] = position.split('');
        // Implémentation spécifique pour le fou
        console.log(`Bishop moves to position (${positionX}, ${positionY})`);
    }

    public async getSlotsAvailable(): Promise<string[]> {
        let slotsAvailable: string[] = [];
        //Déplacement du fou
        //haut gauche
        for(let i = parseInt(this.position[1]) + 1, j = this.position[0].charCodeAt(0) - 1; i <= 8 && j >= 97; i++, j--){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(j)}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
        }

        //haut droite
        for(let i = parseInt(this.position[1]) + 1, j = this.position[0].charCodeAt(0) + 1; i <= 8 && j <= 104; i++, j++){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(j)}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
        }

        //bas gauche
        for(let i = parseInt(this.position[1]) - 1, j = this.position[0].charCodeAt(0) - 1; i >= 1 && j >= 97; i--, j--){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(j)}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
        }

        //bas droite
        for(let i = parseInt(this.position[1]) - 1, j = this.position[0].charCodeAt(0) + 1; i >= 1 && j <= 104; i--, j++){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(j)}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
        }
        return slotsAvailable;
    }
}

export default BishopPiece;