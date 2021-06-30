import { Column, Entity, PrimaryColumn } from 'typeorm';

export const PK_DEMO_SIZE = 10;

@Entity({ name: 'demo' })
export class Demo {
  @PrimaryColumn({ name: 'cddemo', type: 'text', nullable: false })
  cdDemo!: string;

  @Column({ name: 'dedescricao', type: 'text', nullable: false })
  deDescricao!: string;
}
