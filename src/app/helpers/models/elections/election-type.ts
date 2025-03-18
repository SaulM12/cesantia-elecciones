import { Quadrant } from "../organization/quadrant";

export interface ElectionType {
    id: number;
    name: string;
    description:string;
    articles:string;
    enabled: boolean;
    quadrant: Quadrant;
  }