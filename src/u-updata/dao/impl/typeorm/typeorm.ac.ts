
import { EntityManager } from 'typeorm';
import { ACDBInterface } from '../../db.interface';
import { TypeormBase } from './typeorm.base';



export class TypeormAc extends TypeormBase implements ACDBInterface{
    constructor(entityManager: EntityManager) {
        super(entityManager);
    }
    checkUserNeedDownloadVersion(userId: string, version: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    addSpecialUser(userId: string, version: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    deleteSpecialUser(userId: string, version: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    getAllSpecialUser(): Promise<any[]> {
        throw new Error('Method not implemented.');
    }
    updateUserDownloadVersion(userId: string, version: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    recordUserDownloadLog(userId: string, version: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    createSpecialUserLogFormat(userId: string, version: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
}