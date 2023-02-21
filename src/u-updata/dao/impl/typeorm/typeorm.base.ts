import { EntityManager, Table } from "typeorm";
import { QueryRunner } from "typeorm/query-runner/QueryRunner";
import { ACDBInterface } from "../../db.interface";
import { createTable } from "./createtable.function";

export class TypeormBase{
    
    private QueryRunner: QueryRunner;

    private static checkTable = false;

    constructor(entityManager: EntityManager) {
        // 获取QueryRunner
        this.QueryRunner =  entityManager.queryRunner;
        
        // 创建表
        createTable(this.QueryRunner);
    }


}