/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/user.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MoveController } from './../controllers/move.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GameController } from './../controllers/game.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ChessPieceController } from './../controllers/chessPiece.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserOutputDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "username": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserInputDTO": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserInputPatchDTO": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string"},
            "password": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MoveDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "game_id": {"dataType":"double","required":true},
            "move_number": {"dataType":"double","required":true},
            "player_id": {"dataType":"double","required":true},
            "piece_id": {"dataType":"double","required":true},
            "from_position": {"dataType":"string","required":true},
            "to_position": {"dataType":"string","required":true},
            "move_time": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateMoveDto": {
        "dataType": "refObject",
        "properties": {
            "game_id": {"dataType":"double","required":true},
            "move_number": {"dataType":"double","required":true},
            "player_id": {"dataType":"double","required":true},
            "piece_id": {"dataType":"double","required":true},
            "from_position": {"dataType":"string","required":true},
            "to_position": {"dataType":"string","required":true},
            "move_time": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateMoveDto": {
        "dataType": "refObject",
        "properties": {
            "game_id": {"dataType":"double"},
            "move_number": {"dataType":"double"},
            "player_id": {"dataType":"double"},
            "piece_id": {"dataType":"double"},
            "from_position": {"dataType":"string"},
            "to_position": {"dataType":"string"},
            "move_time": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GameDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "playerWhiteId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "playerBlackId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "gameState": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"}},"required":true},
            "isFinished": {"dataType":"boolean","required":true},
            "winnerId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "isPublic": {"dataType":"boolean","required":true},
            "turnCount": {"dataType":"double","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "finishedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateGameDTO": {
        "dataType": "refObject",
        "properties": {
            "playerWhiteId": {"dataType":"double"},
            "playerBlackId": {"dataType":"double"},
            "isPublic": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "chessPieceDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "pieceType": {"dataType":"string","required":true},
            "color": {"dataType":"string","required":true},
            "position": {"dataType":"string","required":true},
            "isCaptured": {"dataType":"boolean","required":true},
            "hasMoved": {"dataType":"boolean","required":true},
            "gameId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateChessPieceDTO": {
        "dataType": "refObject",
        "properties": {
            "pieceType": {"dataType":"string","required":true},
            "color": {"dataType":"string","required":true},
            "position": {"dataType":"string","required":true},
            "gameId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateChessPieceDTO": {
        "dataType": "refObject",
        "properties": {
            "pieceType": {"dataType":"string"},
            "color": {"dataType":"string"},
            "position": {"dataType":"string"},
            "isCaptured": {"dataType":"boolean"},
            "hasMoved": {"dataType":"boolean"},
            "gameId": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserController_getAllUsers: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/users',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getAllUsers)),

            async function UserController_getAllUsers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getAllUsers, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getAllUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getUserById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/users/:id',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUserById)),

            async function UserController_getUserById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getUserById, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getUserById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_createUser: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserInputDTO"},
        };
        app.post('/users',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.createUser)),

            async function UserController_createUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_createUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'createUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_deleteUser: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/users/:id',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.deleteUser)),

            async function UserController_deleteUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_deleteUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'deleteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_updateUser: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserInputPatchDTO"},
        };
        app.patch('/users/:id',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.updateUser)),

            async function UserController_updateUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_updateUser, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'updateUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMoveController_getAllMoves: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/moves',
            ...(fetchMiddlewares<RequestHandler>(MoveController)),
            ...(fetchMiddlewares<RequestHandler>(MoveController.prototype.getAllMoves)),

            async function MoveController_getAllMoves(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMoveController_getAllMoves, request, response });

                const controller = new MoveController();

              await templateService.apiHandler({
                methodName: 'getAllMoves',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMoveController_getMoveById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/moves/:id',
            ...(fetchMiddlewares<RequestHandler>(MoveController)),
            ...(fetchMiddlewares<RequestHandler>(MoveController.prototype.getMoveById)),

            async function MoveController_getMoveById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMoveController_getMoveById, request, response });

                const controller = new MoveController();

              await templateService.apiHandler({
                methodName: 'getMoveById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMoveController_createMove: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateMoveDto"},
        };
        app.post('/moves',
            ...(fetchMiddlewares<RequestHandler>(MoveController)),
            ...(fetchMiddlewares<RequestHandler>(MoveController.prototype.createMove)),

            async function MoveController_createMove(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMoveController_createMove, request, response });

                const controller = new MoveController();

              await templateService.apiHandler({
                methodName: 'createMove',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMoveController_deleteMove: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/moves/:id',
            ...(fetchMiddlewares<RequestHandler>(MoveController)),
            ...(fetchMiddlewares<RequestHandler>(MoveController.prototype.deleteMove)),

            async function MoveController_deleteMove(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMoveController_deleteMove, request, response });

                const controller = new MoveController();

              await templateService.apiHandler({
                methodName: 'deleteMove',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMoveController_updateMove: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UpdateMoveDto"},
        };
        app.patch('/moves/:id',
            ...(fetchMiddlewares<RequestHandler>(MoveController)),
            ...(fetchMiddlewares<RequestHandler>(MoveController.prototype.updateMove)),

            async function MoveController_updateMove(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMoveController_updateMove, request, response });

                const controller = new MoveController();

              await templateService.apiHandler({
                methodName: 'updateMove',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGameController_getGames: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/games',
            ...(fetchMiddlewares<RequestHandler>(GameController)),
            ...(fetchMiddlewares<RequestHandler>(GameController.prototype.getGames)),

            async function GameController_getGames(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGameController_getGames, request, response });

                const controller = new GameController();

              await templateService.apiHandler({
                methodName: 'getGames',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGameController_getGameById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/games/:id',
            ...(fetchMiddlewares<RequestHandler>(GameController)),
            ...(fetchMiddlewares<RequestHandler>(GameController.prototype.getGameById)),

            async function GameController_getGameById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGameController_getGameById, request, response });

                const controller = new GameController();

              await templateService.apiHandler({
                methodName: 'getGameById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsGameController_CreateGame: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateGameDTO"},
        };
        app.post('/games',
            ...(fetchMiddlewares<RequestHandler>(GameController)),
            ...(fetchMiddlewares<RequestHandler>(GameController.prototype.CreateGame)),

            async function GameController_CreateGame(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGameController_CreateGame, request, response });

                const controller = new GameController();

              await templateService.apiHandler({
                methodName: 'CreateGame',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsChessPieceController_getAllChessPieces: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/chessPieces',
            ...(fetchMiddlewares<RequestHandler>(ChessPieceController)),
            ...(fetchMiddlewares<RequestHandler>(ChessPieceController.prototype.getAllChessPieces)),

            async function ChessPieceController_getAllChessPieces(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChessPieceController_getAllChessPieces, request, response });

                const controller = new ChessPieceController();

              await templateService.apiHandler({
                methodName: 'getAllChessPieces',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsChessPieceController_getChessPieceById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/chessPieces/:id',
            ...(fetchMiddlewares<RequestHandler>(ChessPieceController)),
            ...(fetchMiddlewares<RequestHandler>(ChessPieceController.prototype.getChessPieceById)),

            async function ChessPieceController_getChessPieceById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChessPieceController_getChessPieceById, request, response });

                const controller = new ChessPieceController();

              await templateService.apiHandler({
                methodName: 'getChessPieceById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsChessPieceController_createChessPiece: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateChessPieceDTO"},
        };
        app.post('/chessPieces',
            ...(fetchMiddlewares<RequestHandler>(ChessPieceController)),
            ...(fetchMiddlewares<RequestHandler>(ChessPieceController.prototype.createChessPiece)),

            async function ChessPieceController_createChessPiece(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChessPieceController_createChessPiece, request, response });

                const controller = new ChessPieceController();

              await templateService.apiHandler({
                methodName: 'createChessPiece',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsChessPieceController_deleteChessPiece: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/chessPieces/:id',
            ...(fetchMiddlewares<RequestHandler>(ChessPieceController)),
            ...(fetchMiddlewares<RequestHandler>(ChessPieceController.prototype.deleteChessPiece)),

            async function ChessPieceController_deleteChessPiece(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChessPieceController_deleteChessPiece, request, response });

                const controller = new ChessPieceController();

              await templateService.apiHandler({
                methodName: 'deleteChessPiece',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsChessPieceController_updateChessPiece: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UpdateChessPieceDTO"},
        };
        app.patch('/chessPieces/:id',
            ...(fetchMiddlewares<RequestHandler>(ChessPieceController)),
            ...(fetchMiddlewares<RequestHandler>(ChessPieceController.prototype.updateChessPiece)),

            async function ChessPieceController_updateChessPiece(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChessPieceController_updateChessPiece, request, response });

                const controller = new ChessPieceController();

              await templateService.apiHandler({
                methodName: 'updateChessPiece',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsChessPieceController_move: Record<string, TsoaRoute.ParameterSchema> = {
                oldPosition: {"in":"path","name":"oldPosition","required":true,"dataType":"string"},
                newPosition: {"in":"path","name":"newPosition","required":true,"dataType":"string"},
                game: {"in":"path","name":"game","required":true,"dataType":"double"},
        };
        app.post('/chessPieces/move/:game/:oldPosition/:newPosition',
            ...(fetchMiddlewares<RequestHandler>(ChessPieceController)),
            ...(fetchMiddlewares<RequestHandler>(ChessPieceController.prototype.move)),

            async function ChessPieceController_move(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChessPieceController_move, request, response });

                const controller = new ChessPieceController();

              await templateService.apiHandler({
                methodName: 'move',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsChessPieceController_promote: Record<string, TsoaRoute.ParameterSchema> = {
                position: {"in":"path","name":"position","required":true,"dataType":"string"},
                pieceType: {"in":"path","name":"pieceType","required":true,"dataType":"string"},
                game: {"in":"path","name":"game","required":true,"dataType":"double"},
        };
        app.post('/chessPieces/promote/:game/:position/:pieceType',
            ...(fetchMiddlewares<RequestHandler>(ChessPieceController)),
            ...(fetchMiddlewares<RequestHandler>(ChessPieceController.prototype.promote)),

            async function ChessPieceController_promote(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChessPieceController_promote, request, response });

                const controller = new ChessPieceController();

              await templateService.apiHandler({
                methodName: 'promote',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsChessPieceController_getSlotsAvailable: Record<string, TsoaRoute.ParameterSchema> = {
                position: {"in":"path","name":"position","required":true,"dataType":"string"},
                gameId: {"in":"path","name":"gameId","required":true,"dataType":"double"},
        };
        app.get('/chessPieces/slots-available/:gameId/:position',
            ...(fetchMiddlewares<RequestHandler>(ChessPieceController)),
            ...(fetchMiddlewares<RequestHandler>(ChessPieceController.prototype.getSlotsAvailable)),

            async function ChessPieceController_getSlotsAvailable(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsChessPieceController_getSlotsAvailable, request, response });

                const controller = new ChessPieceController();

              await templateService.apiHandler({
                methodName: 'getSlotsAvailable',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
