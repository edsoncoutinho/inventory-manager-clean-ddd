import { Sale } from '../../entities/sale'
import { SalesRepository } from '../sales-repository';
import dayjs from 'dayjs'

export class InMemorySalesRepository implements SalesRepository {
  public items: Sale[] = []

  async create(sale: Sale) {
    this.items.push(sale)
    return sale
  }

  async findByPeriod(startDate: Date, endDate: Date, page: number) {
    const startOfTheDate = dayjs(startDate).startOf('date')
    const endOfTheDate = dayjs(endDate).endOf('date')
  
    const salesOnPeriod = this.items.filter((sale) => {
      const saleDate = dayjs(sale.createdAt)
      return saleDate.isAfter(startOfTheDate) && saleDate.isBefore(endOfTheDate)
    }).slice((page - 1) * 20, page * 20)

    if (!salesOnPeriod) {
      return []
    }

    return salesOnPeriod
  }
}
