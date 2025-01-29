import { Quadrant } from "./quadrant";

export interface Grade {
    id: number;
    abbreviation: string;
    description: string;
    active: boolean;
    quadrant:Quadrant;
}