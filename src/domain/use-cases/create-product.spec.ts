import { InMemoryProductsRepository } from "../repositories/in-memory/in-memory-products-repository"
import { ProductsRepository } from "../repositories/products-repository"
import { CreateProductUseCase } from "./create-product"

let productsRepository: ProductsRepository
let sut: CreateProductUseCase

describe('Create Product Use Case ', async () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(productsRepository)
  })

  it('should be able to create a new product', async () => {
    const { product } = await sut.execute({
      name: 'Product 1',
      description: 'Product description',
      size: 'M',
      color: 'Red',
      salePrice: 100,
      purchasePrice: 50,
      stock: 10,
      minimumStock: 5
    })

    expect(product.name).toEqual('Product 1')
    expect(product.stock).toEqual(10)
    expect(product.minimumStock).toEqual(5)
  })
})