import { Sale } from "../entities/sale";

export interface SalesRepository {
  create: (sale: Sale) => Promise<Sale>
  findByPeriod: (startDate: Date, endDate: Date, page: number) => Promise<Sale[]>
}