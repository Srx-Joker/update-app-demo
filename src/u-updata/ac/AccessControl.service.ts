import { EntityManager } from "typeorm";
import { TypeormAc } from "../dao/impl/typeormImpl/typeorm.ac";


export class AccessControlService extends TypeormAc{
    constructor(entityManager:EntityManager) {
        super(entityManager);
    }
}