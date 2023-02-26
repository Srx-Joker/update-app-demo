
import { EntityManager } from 'typeorm';
import { ACDBInterface } from '../../db.interface';
import { USpecialUser } from './entitys/USpecialUSer.entity';
import { TypeormBase } from './typeorm.base';



export class TypeormAc extends TypeormBase implements ACDBInterface{
    constructor(private entityManager: EntityManager) {
        super(entityManager);
    }

    /**
     * 检查用户是否需要下载指定版本
     * @param userId 用户ID
     * @param version 版本号
     */
    checkUserNeedDownloadVersion(userId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.entityManager.find(USpecialUser, {where: {u_id: userId}}).then((data) => {
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
     * 添加需要用户下载指定版本
     * @param userId 用户ID
     * @param version 版本号
     */
    async addSpecialUser(userId: number, version: string): Promise<boolean> {
        let hasUser =  await this.checkUserNeedDownloadVersion(userId);

        if (hasUser) {
            throw new Error('用户已经存在');
        }else{
            let user = new USpecialUser();
            user.u_id = userId;
            user.us_version = version;
    
            return new Promise((resolve, reject) => {
                this.entityManager.save(user).then((data) => {
                    resolve(true);
                }).catch((err) => {
                    reject(err);
                })
            })
        }
    }

    /**
     * 删除用户下载指定版本
     * @param userId 用户ID
     * @param version 版本号
     */
    async deleteSpecialUser(userId: number, version: string): Promise<boolean> {
        let hasUser = await this.checkUserNeedDownloadVersion(userId);
        if(hasUser){
            return new Promise((resolve, reject) => {
                this.entityManager.delete(USpecialUser, {u_id: userId}).then((data) => {
                    resolve(true);
                }).catch((err) => {
                    reject(err);
                })
            })
        }else{
            throw new Error('删除的用户不存在');
        }
    }

    
    /**
     * 获取所有特殊用户
     */
    getAllSpecialUser(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.entityManager.find(USpecialUser).then((data) => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    /**
     * 修改用户需要下载的版本
     * @param userId 用户ID
     * @param version 版本号
     */

    updateUserDownloadVersion(userId: number, version: string): Promise<boolean> {
        let hasUser = this.checkUserNeedDownloadVersion(Number(userId));

        if(hasUser){
            return new Promise((resolve, reject) => {
                this.entityManager.update(USpecialUser, {u_id: userId}, {us_version: version}).then((data) => {
                    resolve(true);
                }).catch((err) => {
                    reject(err);
                })
            })
        }else{
            throw new Error('修改的用户不存在');
        }


    }
}