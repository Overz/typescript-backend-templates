import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'demo' })
export class Demo {
  @PrimaryColumn({ name: 'cddemo', type: 'integer', generated: 'increment' })
  cdDemo!: number;

  @Column({ name: 'nmnome', type: 'text', nullable: false })
  nmNome!: string;

  @Column({ name: 'dedescricao', type: 'text', nullable: true })
  deDescricao!: string;
}
