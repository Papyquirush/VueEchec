import { Controller, Get, Route } from "tsoa";

@Route("games")
export class GameController extends Controller {

    @Get("/")
    public async getGames(): Promise<string[]> {
        return ["Game1", "Game2"];
    }


}

