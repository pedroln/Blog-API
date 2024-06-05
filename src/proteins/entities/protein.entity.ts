import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Protein {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 200 })
    name: string;

    @Column({ type: 'varchar', length: 200 })
    description: string;

    @Column({ type: 'varchar', length: 3000 })
    imageActive: string;

    @Column({ type: 'varchar', length: 3000 })
    imageInactive: string;

    @Column({ type: 'int' })
    price: number;

}
