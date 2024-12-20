import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Category } from './categories.entity'

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'double precision' })
  price: number

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar' })
  slug: string

  @Column({ type: 'varchar' })
  description: string

  @Column({ type: 'uuid', nullable: true })
  category_id: string

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column({ type: 'varchar' })
  cover: string

  @Column({ type: 'int' })
  discount: number

  @Column({ type: 'json', nullable: true })
  variants: Record<string, any>

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date
}
