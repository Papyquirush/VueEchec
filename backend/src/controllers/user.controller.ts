import {
    Controller, Get, Route,

} from "tsoa";



@Route("users")

export class UserController extends Controller {

    @Get("/")
    public async getUsers(): Promise<string[]> {
        return ["User1", "User2"];
    }

}