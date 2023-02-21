import { Table } from "typeorm"
import { QueryRunner } from "typeorm/query-runner/QueryRunner"

export function createTable(QueryRunner: QueryRunner): Promise<void> {
    return new Promise((resolve, reject) => {
        let tables = { "USpecialUser": false, "UFileVersions": false, "UConfig": false, "ULogsType": false }

        let retfunc = (table: string) => {
            tables[table] = true;

            let all = true;

            for (let i in tables) {
                if (tables[i] == false) {
                    all = false;
                    break;
                }
            }

            if (all) {
                resolve();
            }
        }


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
                ).then(() => {
                    retfunc("USpecialUser");
                })

            } else {
                retfunc("USpecialUser");
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
                ).then(() => {
                    retfunc("UFileVersions");
                })
            } else {
                retfunc("UFileVersions");
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
                ).then(() => {
                    retfunc("UConfig");
                })
            } else {
                retfunc("UConfig");
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
                ).then(() => {
                    retfunc("ULogsType");
                })
            } else {
                retfunc("ULogsType");
            }
        }

        )


    })
}