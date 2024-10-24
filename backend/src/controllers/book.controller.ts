import { Controller, Get, Route } from "tsoa";

@Route("books")
export class BookController extends Controller {

  @Get("/")
  public async getBooks(): Promise<string[]> {
    return ["Book1", "Book2"];
  }

  
}

