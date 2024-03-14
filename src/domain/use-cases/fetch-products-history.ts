import { Product } from "../entities/product"
import { ProductsRepository } from "../repositories/products-repository"

interface FetchProductsHistoryUseCaseRequest {
  page: number
  color?: string
  size?: string
}

interface FetchProductsHistoryUseCaseResponse {
  products: Product[]
}

export class FetchProducsHistoryUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    page,
    color,
    size,
  }: FetchProductsHistoryUseCaseRequest): Promise<FetchProductsHistoryUseCaseResponse> {
    const products = await this.productsRepository.findManyByProperties(
      page,
      color,
      size,
    )

    return { products }
  }
}