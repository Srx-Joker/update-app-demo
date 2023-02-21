import { Table } from "typeorm"
import { QueryRunner } from "typeorm/query-runner/QueryRunner"

export function createTable(QueryRunner: QueryRunner) {

    // USpecialUser
    this.QueryRunner.hasTable("USpecialUser").then((hasTable) => {

        if (!hasTable) {
            this.QueryRunner.createTable(
                new Table({
                    name: "USpecialUser",
                    columns: [
                        {
                            name: "us_id",
                            type: "int",
                            isPrimary: true,
                        },
                        {
                            name: "u_id",
                            type: "int",
                            isUnique: true,
                        },
                        {
                            name: "us_version",
                            type: "varchar",
                            length: "255",
                        }

                    ]
                }
                )
            )
        }
    })

    // UFileVersions 
    this.QueryRunner.hasTable("UFileVersions").then((hasTable) => {

        if (!hasTable) {
            this.QueryRunner.createTable(
                new Table({
                    name: "UFileVersions",
                    columns: [
                        {
                            name: "uf_id",
                            type: "int",
                            isPrimary: true,
                        },
                        {
                            name: "version",
                            type: "varchar",
                            length: "255",
                            isUnique: true,
                        },
                        {
                            name: "file_name",
                            type: "varchar",
                            length: "255",
                        }

                    ]
                }
                )
            )
        }
    }
    )

    // UConfig 
    this.QueryRunner.hasTable("UConfig").then((hasTable) => {
        if (!hasTable) {
            this.QueryRunner.createTable(
                new Table({
                    name: "UConfig",
                    columns: [
                        {
                            name: "uc_id",
                            type: "int",
                            isPrimary: true,
                        },
                        {
                            name: "configItem",
                            type: "varchar",
                            length: "255",
                        },
                        {
                            name: "value",
                            type: "varchar",
                            length: "255",
                        },
                        {
                            name: "remark",
                            type: "varchar",
                            length: "255",
                        }

                    ]
                }
                )
            )
        }
    }
    )

    // ULogsType
    this.QueryRunner.hasTable("ULogsType").then((hasTable) => {
        if (!hasTable) {
            this.QueryRunner.createTable(
                new Table({
                    name: "ULogsType",
                    columns: [
                        {
                            name: "ul_id",
                            type: "int",
                            isPrimary: true,
                        },
                        {
                            name: "type",
                            type: "varchar",
                            length: "255",
                        },
                        {
                            name: "analysis",
                            type: "varchar",
                            length: "255",
                        },
                        {
                            name: "remark",
                            type: "varchar",
                            length: "255",
                        }

                    ]
                }
                )
            )
        }
    }
    )






}