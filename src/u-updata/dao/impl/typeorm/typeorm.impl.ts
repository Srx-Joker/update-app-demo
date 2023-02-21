import { EntityManager, Table } from "typeorm";
import { QueryRunner } from "typeorm/query-runner/QueryRunner";
import { DBInterface } from "../../db.interface";
import { createTable } from "./createtable.function";

export class TypeOrmImpl implements DBInterface{
    
    private QueryRunner: QueryRunner;

    constructor(private entityManager: EntityManager) {
        // 获取QueryRunner
        this.QueryRunner =  entityManager.queryRunner;
        
        // 创建表
        createTable(this.QueryRunner);
    }


}