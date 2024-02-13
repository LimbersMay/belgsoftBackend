import {Response} from "express";

export const handleHttp = (res: Response, error: string, errorRaw?: unknown, status?: number) => {
    console.log(errorRaw);
    return res.status(status ?? 400 ).json({error});
}
