import { Column, Entity, PrimaryColumn } from 'typeorm';

export const PK_DEMO_SIZE = 10;

export enum Status {
  ATIVO = 'A',
  INATIVO = 'I',
}

@Entity({ name: 'demo' })
export class Demo {
  @PrimaryColumn({ name: 'cddemo', type: 'text', nullable: false })
  cdDemo!: string;

  @Column({ name: 'dedescricao', type: 'text', nullable: false })
  deDescricao!: string;

  @Column({
    name: 'fstatus',
    type: 'text',
    nullable: false,
    enum: Status,
    default: Status.INATIVO,
  })
  flStatus!: Status;
}
