import { InvitationStatus } from "../../enums/initation_status";
import { Delegate } from "../delegate/delegate";
import { ElectionType } from "../elections/election-type";

export interface Quadrant {
  id: number;
  acronym: string;
  description: string;
  quadrantOrder: number;
  electionTypes:ElectionType[]
}

export interface QuadrantDto {
  id: number;
  description: string;
  acronym: string;
  quadrantOrder: number;
  tables: TableDto[];
}

export interface TableDto {
  id: number;
  tableNumber: number;
  invitations: InvitationDto[];
}

export interface InvitationDto {
  id: number;
  chairNumber: number;
  status: InvitationStatus;
  delegate:Delegate
}
