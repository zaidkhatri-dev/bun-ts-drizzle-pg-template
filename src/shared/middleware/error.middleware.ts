import { DatabaseError } from "pg";
import { ZodError } from "zod";
import type { NextFunction, Request, Response } from "express";

import {AppError} from "@classes/app-error.class.js";
import type { ResponseFormat } from "../types/response.type.js";
import { env } from "@/config/env.js";
import { CONSTRAINT_MESSAGES, FOREIGN_KEY_CONSTRAINT_MESSAGES, UNIQUE_CONSTRAINT_MESSAGES } from "../constants/db.constants.js";

const validationErrorHandler = (err: ZodError) => {
    for (const issue of err.issues) {
        console.error(issue.path.join("."), issue.message);
    }

    return new AppError(err.issues[0]?.message || "The provided input is invalid", 422)   
}

const dbErrorHandler = (err: DatabaseError) => {
    console.error({
        message: err.message,
        code: err.code,
        detail: err.detail,
        constraint: err.constraint,
        table: err.table,
        schema: err.schema
    })

    switch (err.code) {
        case "23505": {
            const message = (err.constraint && UNIQUE_CONSTRAINT_MESSAGES[err.constraint]) || 
            "Resource already exists."
            return new AppError(message, 409)
        }

        case "23503": {
            const message = (err.constraint && FOREIGN_KEY_CONSTRAINT_MESSAGES[err.constraint]) || 
            "Related resource does not exist."
            return new AppError(message, 409)
        }

        case "23502": {
            const message = err.column ? `${err.column} is required.` : 
            "Required field is missing."
            return new AppError(message, 400)
        }

        case "23514": {
            const message = (err.constraint && CONSTRAINT_MESSAGES[err.constraint]) || "Data violates business rules."
            return new AppError(message, 400)
        }

        case "22P02": {
            return new AppError("Invalid input.", 400)
        }

        default:
            return new AppError("Database error.", 500, false)
    }
}

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent){
        return next(err)
    }
    
    if (err instanceof ZodError){
        err = validationErrorHandler(err)   
    }

    if (err instanceof DatabaseError){
        err = dbErrorHandler(err)
    }
    
    if (err instanceof AppError){
        if (!err.isOperational){
            console.error("[NON-OPERATIONAL ERROR]", err)
            err.message = env.NODE_ENV === "development" ? err.message : 
            "Something went wrong" // prevent leaking internal details
        }
        
        const errorResponse : ResponseFormat<null> = {
            success: false,
            message: err.message,
            data: null
        }   

        return res.status(err.statusCode).json(errorResponse)
    }

    console.error(err)
    
    const errorResponse : ResponseFormat<null> = {
        success: false,
        message: env.NODE_ENV === "development" ? err.message : "Something went wrong",
        data: null
    }


    return res.status(500).json(errorResponse)
}