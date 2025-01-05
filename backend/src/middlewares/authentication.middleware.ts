import * as express from "express";
import * as jwt from "jsonwebtoken";

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "jwt") {
        const authHeader = request.headers["authorization"];

        if (!authHeader) {
            return Promise.reject(new Error("Authentication required - No token provided"));
        }

        if (!authHeader.startsWith("Bearer ")) {
            return Promise.reject(new Error("Invalid token format - Must be Bearer token"));
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return Promise.reject(new Error("No token provided after Bearer"));
        }
        return new Promise((resolve, reject) => {
            jwt.verify(
                token,
                "your_jwt_secret_key",
                function (err: any, decoded: any) {
                    if (err) {
                        reject(err);
                    }  else {
                        if (scopes !== undefined) {
                            const userScopes = decoded.scopes;

                            for (let scope of scopes) {
                                const [resource, action] = scope.split(":");
                                if (!userScopes[resource]?.includes(action)) {
                                    reject(new Error("JWT does not contain required permission for" + scope));
                                }
                            }
                        }
                        resolve(decoded);
                    }
                }
            );
        });
    } else {

        throw new Error("Only support JWT security");
    }
}