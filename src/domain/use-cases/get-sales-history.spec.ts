import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemorySalesRepository } from '../repositories/in-memory/in-memory-sales-repository';
import { SalesRepository } from '../repositories/sales-repository';
import { GetSalesHistoryUseCase } from './get-sales-history';
import { Sale } from '../entities/sale';

let salesRepository: SalesRepository
let sut: GetSalesHistoryUseCase

describe('Get Sales History', async () => {
  beforeEach(() => {
    salesRepository = new InMemorySalesRepository()
    sut = new GetSalesHistoryUseCase(salesRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to get a sales history', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const sale = Sale.create({
      productId: new UniqueEntityID('product-1'),
      quantity: 10,
      amount: 1000
    })

    await salesRepository.create(sale)

    const { sales } = await sut.execute({
      startDate: new Date(),
      endDate: new Date(),
      page: 1
    })
  
    expect(sales).toHaveLength(1)
    expect(sales).toEqual([
      expect.objectContaining({ quantity: 10, amount: 1000 })
    ])
  })

  it('should not be able to fetch sales history outside the period', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await salesRepository.create(
      Sale.create({
        productId: new UniqueEntityID('product-1'),
        quantity: 10,
        amount: 1000
      })
    )

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    await salesRepository.create(
      Sale.create({
        productId: new UniqueEntityID('product-1'),
        quantity: 5,
        amount: 500
      })
    )

    const { sales } = await sut.execute({
      startDate: new Date(2022, 0, 20, 8, 0, 0),
      endDate: new Date(2022, 0, 20, 8, 0, 0),
      page: 1
    })

    expect(sales).toHaveLength(1)
    expect(sales).toEqual([
      expect.objectContaining({ quantity: 10, amount: 1000 })
    ])
  })

  it('should be able to fetch paginated sale history', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    for (let i = 1; i <= 22; i++) {
      await salesRepository.create(
        Sale.create({
          productId: new UniqueEntityID('product-1'),
          quantity: 1,
          amount: 50
        }, new UniqueEntityID(`sale-${i}`),)
      )
    }

    const { sales } = await sut.execute({
      startDate: new Date(),
      endDate: new Date(),
      page: 2
    })

    expect(sales).toHaveLength(2)
    expect(sales).toEqual([
      expect.objectContaining({ _id: new UniqueEntityID('sale-21') }),
      expect.objectContaining({ _id: new UniqueEntityID('sale-22') }),
    ])
  })
})