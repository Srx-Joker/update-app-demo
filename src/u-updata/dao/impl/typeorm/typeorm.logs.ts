
import { Between, EntityManager } from 'typeorm';
import { LogDBInterface } from '../../db.interface';
import { ULogs } from './entitys/ULogs.entity';
import { ULogsType } from './entitys/ULogsType.entity';

import { TypeormBase } from './typeorm.base';



export class TypeormLogs extends TypeormBase implements LogDBInterface {
    constructor(private entityManager: EntityManager) {
        super(entityManager);
    }
    /**
     * 添加日志类型
     * @param type 日志类型
     * @param analysis 解析方式
     * @param remark 备注
     */
    async addLogType(type: string, analysis: string, remark: string): Promise<boolean> {
        let hasLogType = await this.checkLogType(type);

        if (hasLogType) {
            throw new Error('日志类型已经存在');
        }
        else {
            let logType = new ULogsType();
            logType.type = type;
            logType.analysis = analysis;
            logType.remark = remark;

            return new Promise((resolve, reject) => {
                this.entityManager.save(logType).then((data) => {
                    resolve(true);
                }
                ).catch((err) => {
                    reject(err);
                }
                )
            })
        }
    }

    /**
     * 删除日志类型
     * @param type 日志类型
     */
    deleteLogType(type: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.entityManager.delete(ULogsType, { type: type }).then((data) => {
                resolve(true);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    /**
     * 修改日志类型
     * @param type 日志类型
     * @param analysis 解析方式
     * @param remark 备注
     */
    updateLogType(type: string, analysis: string, remark: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.entityManager.update(ULogsType, { type: type }, { analysis: analysis, remark: remark }).then((data) => {
                resolve(true);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    /**
     * 检查日志类型是否存在
     * @param type 日志类型
     */
    checkLogType(type: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.entityManager.findOne(ULogsType, { where:{type} }).then((data) => {
                if (data) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch((err) => {
                reject(err);
            })
        })
    }
    /**
     * 获取日志类型
     * @param type 日志类型
     */
    getLogType(type: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.entityManager.findOne(ULogsType, { where:{type} }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    }
    /**
     * 添加日志
     * @param type 日志类型
     * @param value 日志内容
     * @param time 记录时间
     */
    async addLog(type: string, value: string, time: Date): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let log = new ULogs();
            log.type = type;
            log.value = value;
            log.time = time;

            this.entityManager.save(log).then((data) => {
                resolve(true);
            }).catch((err) => {
                reject(err);
            })
        })
    }
    /**
     * 按时间删除日志
     * @param startTime 开始时间
     * @param endTime 结束时间
     */
    deleteLogByTime(startTime: Date, endTime: Date): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.entityManager.delete(ULogs, { time: Between(startTime, endTime) }).then((data) => {
                resolve(true);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    /**
     * 按时间获取日志
     * @param startTime 开始时间
     * @param endTime 结束时间
     */
    getLogByTime(startTime: Date, endTime: Date): Promise<any> {
        return new Promise((resolve, reject) => {
            this.entityManager.find(ULogs, { where: { time: Between(startTime, endTime) } }).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    }
    
    getAllLog(): Promise<any[]> {
        throw new Error('想获取全部日志，你想清楚了吗？');
    }

    // 获取所有日志类型
    getAllLogType(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.entityManager.find(ULogsType).then((data) => {
                resolve(data);
            }
            ).catch((err) => {
                reject(err);
            })
        })
    }
}