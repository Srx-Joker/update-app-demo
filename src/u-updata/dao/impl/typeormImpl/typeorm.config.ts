
import { EntityManager } from 'typeorm';
import { ConfigDBInterface } from '../../db.interface';
import { UConfig } from './entitys/UConfig.entity';
import { TypeormBase } from './typeorm.base';



export class TypeormConfig extends TypeormBase implements ConfigDBInterface {
    constructor(private entityManager: EntityManager) {
        super(entityManager);
    }

    /**
     * 添加配置项
     * @param configItem 配置项
     * @param value 值
     * @param remark 备注
     */
    async addConfigItem(configItem: string, value: string, remark: string): Promise<boolean> {
        let hasConfig = await this.checkConfigItem(configItem);

        if (hasConfig) {
            throw new Error('配置项已经存在');
        } else {
            let config = new UConfig();
            config.configItem = configItem;
            config.value = value;
            config.remark = remark;

            return new Promise((resolve, reject) => {
                this.entityManager.save(config).then((data) => {
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
     * 删除配置项
     * @param configItem 配置项
     */
    deleteConfigItem(configItem: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.entityManager.delete(UConfig, { configItem: configItem }).then((data) => {
                resolve(true);
            }).catch((err) => {
                reject(err);
            })
        })
    }
    /**
     * 检查配置项是否存在
     * @param configItem 配置项
     */
    checkConfigItem(configItem: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.entityManager.find(UConfig, { where: { configItem: configItem } }).then((data) => {
                if (data.length > 0) {
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
     * 修改配置项
     * @param configItem 配置项
     * @param value 值
     * @param remark 备注
     */
    updateConfigItem(configItem: string, value: string, remark: string): Promise<boolean> {
        let hasConfig = this.checkConfigItem(configItem);

        if (hasConfig) {
            return new Promise((resolve, reject) => {
                this.entityManager.update(UConfig, { configItem: configItem }, { value: value, remark: remark }).then((data) => {
                    resolve(true);
                }).catch((err) => {
                    reject(err);
                })
            })
        } else {
            throw new Error('配置项不存在');
        }
    }
    /**
     * 获取配置项
     * @param configItem 配置项
     */
    getConfigItem(configItem: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.entityManager.findOne(UConfig, { where: { configItem: configItem } }).then((data) => {
                if (data) {
                    resolve(data);
                } else {
                    resolve(null);
                }
            }).catch((err) => {
                reject(err);
            })
        })
    }

    /**
     * 初始化配置项
     */
    async initConfigItem(items: { [key: string]: string; }): Promise<boolean> {
        try {
            for (let key in items) {
                let hasConfig = await this.checkConfigItem(key);
                if (!hasConfig) {
                    this.addConfigItem(key, items[key], '');
                }
                else {
                    this.updateConfigItem(key, items[key], '');
                }
            }
            return true;
        } catch (error) {
            throw error;
        }
    }


}