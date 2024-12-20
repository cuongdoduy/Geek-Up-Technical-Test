import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Customer } from './customers.entity'

@Entity('Order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', nullable: true })
  customer_id: string

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer

  @Column({ type: 'varchar' })
  fullName: string

  @Column({ type: 'varchar' })
  province: string

  @Column({ type: 'varchar' })
  district: string

  @Column({ type: 'varchar' })
  commune: string

  @Column({ type: 'varchar' })
  address: string

  @Column({ type: 'varchar' })
  phoneNumber: string

  @Column({ type: 'varchar' })
  emailAddress: string

  @Column({ type: 'enum', enum: ['Company', 'PersonalHouse'] })
  housingType: 'Company' | 'PersonalHouse'

  @Column({ type: 'timestamp' })
  createdAt: Date

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date

  @Column({ type: 'int' })
  total: number
}
