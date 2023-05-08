import {Response} from "express";

export const handleHttp = (res: Response, error: string, errorRaw?: unknown) => {
    console.log(errorRaw);
    return res.status(500).json({error});
}
