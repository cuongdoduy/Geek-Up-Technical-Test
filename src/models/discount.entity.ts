import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Discount')
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'int' })
  value: number;

  @Column({ type: 'enum', enum: ['Percent', 'Amount'] })
  type: 'Percent' | 'Amount';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
