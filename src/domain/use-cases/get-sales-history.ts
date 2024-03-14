import { SalesRepository } from "../repositories/sales-repository";

interface GetSalesHistoryUseCaseRequest {
  startDate: Date
  endDate: Date
  page: number
}

export class GetSalesHistoryUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute({ startDate, endDate, page }: GetSalesHistoryUseCaseRequest) {
    const sales = await this.salesRepository.findByPeriod(startDate, endDate, page)

    return { sales }
  }
}