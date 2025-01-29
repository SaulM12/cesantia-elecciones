import { InvitationStatus } from "../../enums/initation_status";
import { Delegate } from "../delegate/delegate";
import { TableEntity } from "../organization/table-entity";

export interface Invitation {
    id: number;
    chairNumber: number;
    tableEntity: TableEntity;
    delegate?: Delegate;
    status: InvitationStatus;
    scanned: boolean;
  }