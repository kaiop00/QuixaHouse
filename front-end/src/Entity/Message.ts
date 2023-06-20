import type { Status } from "./Status"

export interface Message {
    id: number,
    content: string
    status: Status
  }