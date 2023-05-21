import {AreaSchema} from "../models";

export class AreaResponse {
    areaId: string;
    name: string;
    description: string;

    constructor(areaId: string, name: string, description: string) {
        this.areaId = areaId;
        this.name = name;
        this.description = description;
    }

    static fromSchema(areaSchema: AreaSchema): AreaResponse {
        return new AreaResponse(
            areaSchema.areaId,
            areaSchema.name,
            areaSchema.description
        );
    }
}
