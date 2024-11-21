import { GameDTO } from "../dto/game.dto";
import Game from "../models/game.model";

export class GameService {
    public async getGames(): Promise<GameDTO> {
        let gameList = await Game.findAll();
        
    }
}