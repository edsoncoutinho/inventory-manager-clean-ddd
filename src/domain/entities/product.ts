import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

interface ProductProps {
  name: string
  description: string
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
  color: string
  salePrice: number
  purchasePrice: number
  stock: number
  minimumStock: number
  createdAt: Date
  updatedAt?: Date
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get size() {
    return this.props.size
  }

  get color() {
    return this.props.color
  }

  get salePrice() {
    return this.props.salePrice
  }

  get purchasePrice() {
    return this.props.purchasePrice
  }

  get stock() {
    return this.props.stock
  }

  get minimumStock() {
    return this.props.minimumStock
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isLowStock() {
    return this.props.stock < this.props.minimumStock
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set addStock(value: number) {
    this.props.stock += value
    this.touch()
  }

  set removeStock(value: number) {
    this.props.stock -= value
    this.touch()
  }

  static create(props: Optional<ProductProps, 'createdAt'>, id?: UniqueEntityID) {
    return new Product({
      ...props,
      createdAt: new Date(),
    }, id)
  }
}