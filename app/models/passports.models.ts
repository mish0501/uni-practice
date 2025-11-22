import type { PaginatedData } from './paginated-data/paginated-data.model'

export type Passport = {
  id: number
  name: string
  model: string
  serialPrefix: string
  fromSerialNumber: number
  toSerialNumber: number
  warrantyMonths: number
}

export type PassportsIndexResponse = PaginatedData<Passport>
export type PassportDetailsResponse = Passport
