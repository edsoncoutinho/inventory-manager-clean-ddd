import { Product } from "../entities/product"
import { InMemoryProductsRepository } from "../repositories/in-memory/in-memory-products-repository"
import { FetchProducsHistoryUseCase } from "./fetch-products-history"

let productsRepository: InMemoryProductsRepository
let sut: FetchProducsHistoryUseCase

describe('Fetch Products History Use Case', () => {
  beforeEach(async () => {
    productsRepository = new InMemoryProductsRepository()
    sut = new FetchProducsHistoryUseCase(productsRepository)
  })

  it('should be able to fetch products history by color', async () => {
    await productsRepository.create(
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

    await productsRepository.create(
      Product.create({
        name: 'Product 2',
        description: 'Product description',
        size: 'L',
        color: 'Red',
        salePrice: 200,
        purchasePrice: 100,
        stock: 20,
        minimumStock: 5
      })
    )

    const { products } = await sut.execute({
      page: 1,
      color: 'Red',
    })

    expect(products).toHaveLength(2)
    expect(products).toEqual([
      expect.objectContaining({ name: 'Product 1' }),
      expect.objectContaining({ name: 'Product 2' }),
    ])
  })

  it('should be able to fetch products history by size', async () => {
    await productsRepository.create(
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

    await productsRepository.create(
      Product.create({
        name: 'Product 2',
        description: 'Product description',
        size: 'L',
        color: 'Red',
        salePrice: 200,
        purchasePrice: 100,
        stock: 20,
        minimumStock: 5
      })
    )

    const { products } = await sut.execute({
      page: 1,
      size: 'L',
    })

    expect(products).toHaveLength(1)
    expect(products).toEqual([
      expect.objectContaining({ name: 'Product 2' }),
    ])
  })

  it('should be able to fetch paginated products history', async () => {
    for (let i = 1; i <= 22; i++) {
      await productsRepository.create(
        Product.create({
          name: `Product ${i}`,
          description: 'Product description',
          size: 'L',
          color: 'Red',
          salePrice: 200,
          purchasePrice: 100,
          stock: 20,
          minimumStock: 5
        })
      )
    }

    const { products } = await sut.execute({
      page: 2,
    })

    expect(products).toHaveLength(2)
    expect(products).toEqual([
      expect.objectContaining({ name: 'Product 21' }),
      expect.objectContaining({ name: 'Product 22' }),
    ])
  })
})
