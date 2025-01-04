import { Route, Controller, Post, Body} from "tsoa";
import { AuthenticationInputDTO } from "../dto/authentication.dto";
import { authService } from "../services/authentication.services";

@Route("auth")
export class AuthenticationController extends Controller {
    @Post("/")
    public async authenticate(
        @Body() body: AuthenticationInputDTO
    ) {
        const {  username, password } = body;

        const temp = await authService.authenticate(username, password);

        const token = temp.token;

        const userId = temp.userId;


        return { token, userId };
    }
}