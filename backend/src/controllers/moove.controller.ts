import { Controller, Get, Route } from "tsoa";

@Route("mooves")
export class MooveController extends Controller {

    @Get("/")
    public async getMooves(): Promise<string[]> {
        return ["Moove1", "Moove2"];
    }


}

