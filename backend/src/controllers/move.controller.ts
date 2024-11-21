import { Controller, Get, Route } from "tsoa";

@Route("mooves")
export class MoveController extends Controller {

    @Get("/")
    public async getMooves(): Promise<string[]> {
        return ["Moove1", "Moove2"];
    }


}

