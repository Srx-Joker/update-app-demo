import { Table } from "typeorm"
import { QueryRunner } from "typeorm/query-runner/QueryRunner"

export function createTable(queryRunner: QueryRunner): Promise<void> {
    return new Promise((resolve, reject) => {
        let tables = { "USpecialUser": false, "UFileVersions": false, "UConfig": false, "ULogsType": false, "UUploadUser": false }

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

        // UUploadUser
        queryRunner.hasTable("UUploadUser").then((hasTable) => {
            if (!hasTable) {
                queryRunner.createTable(
                    new Table({
                        name: "UUploadUser",
                        columns: [
                            {
                                name: "uu_id",
                                type: "int",
                                isGenerated: true,
                                isPrimary: true,
                            },
                            {
                                name: "u_id",
                                type: "int",
                                isUnique: true,
                            },
                        ]
                    }
                    )
                ).then(() => {
                    retfunc("UUploadUser");
                })
            } else {
                retfunc("UUploadUser");
            }
        })


        // USpecialUser
        queryRunner.hasTable("USpecialUser").then((hasTable) => {

            if (!hasTable) {
                queryRunner.createTable(
                    new Table({
                        name: "USpecialUser",
                        columns: [
                            {
                                name: "us_id",
                                type: "int",
                                isGenerated: true,
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

        // UConfig 
        queryRunner.hasTable("UConfig").then((hasTable) => {
            if (!hasTable) {
                queryRunner.createTable(
                    new Table({
                        name: "UConfig",
                        columns: [
                            {
                                name: "uc_id",
                                type: "int",
                                isGenerated: true,
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
        queryRunner.hasTable("ULogsType").then((hasTable) => {
            if (!hasTable) {
                queryRunner.createTable(
                    new Table({
                        name: "ULogsType",
                        columns: [
                            {
                                name: "ult_id",
                                type: "int",
                                isGenerated: true,
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

        // ULogs
        queryRunner.hasTable("ULogs").then((hasTable) => {
            if (!hasTable) {
                queryRunner.createTable(
                    new Table({
                        name: "ULogs",
                        columns: [
                            {
                                name: "ul_id",
                                type: "int",
                                isGenerated: true,
                                isPrimary: true,
                            },
                            {
                                name: "type",
                                type: "varchar",
                                length: "255",
                            },
                            {
                                name: "value",
                                type: "text",
                            },
                            {
                                name: "time",
                                type: "varchar",
                                length: "255",
                            }

                        ]
                    }
                    )
                ).then(() => {
                    retfunc("ULogs");
                })
            } else {
                retfunc("ULogs");
            }
        })
    })
}