
import { Product } from "../entities/product";
import { ProductsRepository } from "../repositories/products-repository";

interface createProductUseCaseRequest {
  name: string
  description: string
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
  color: string
  salePrice: number
  purchasePrice: number
  stock: number
  minimumStock: number
}

export class CreateProductUseCase {
  constructor(
    private productsRepository: ProductsRepository
  ) {}

  async execute({ 
    name, 
    description,
    size,
    color,
    salePrice,
    purchasePrice,
    stock,
    minimumStock
  }: createProductUseCaseRequest) {
    const product = Product.create({
      name,
      description,
      size,
      color,
      salePrice,
      purchasePrice,
      stock,
      minimumStock
    })

    await this.productsRepository.create(product)

    return { product }
  }
}