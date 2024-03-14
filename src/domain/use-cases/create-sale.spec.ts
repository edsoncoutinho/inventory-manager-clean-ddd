import { Product } from "../entities/product"
import { InMemoryProductsRepository } from "../repositories/in-memory/in-memory-products-repository"
import { InMemorySalesRepository } from "../repositories/in-memory/in-memory-sales-repository"
import { CreateSaleUseCase } from "./create-sale"

let productsRepository: InMemoryProductsRepository
let salesRepository: InMemorySalesRepository
let sut: CreateSaleUseCase

describe('Create Sale Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    salesRepository = new InMemorySalesRepository()
    sut = new CreateSaleUseCase(productsRepository, salesRepository)
  })

  it('should be able to create a new sale', async () => {
    const product = await productsRepository.create(
      Product.create({
        name: 'Product 1',
        description: 'Product description',
        size: 'M',
        color: 'Red',
        salePrice: 100,
        purchasePrice: 50,
        stock: 50,
        minimumStock: 30
      })
    )

    const { sale } = await sut.execute({
      productId: product.id.toString(),
      quantity: 10
    })

    expect(sale.quantity).toEqual(10)
    expect(sale.amount).toEqual(1000)
    expect(product.stock).toEqual(40)
  })

})