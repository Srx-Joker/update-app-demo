import { EntityManager } from "typeorm";
import { TypeormAc } from "../dao/impl/typeorm/typeorm.ac";


export class AccessControlService extends TypeormAc{
    constructor(entityManager:EntityManager) {
        super(entityManager);
    }
}