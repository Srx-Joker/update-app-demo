import { UpdateApp , TypeormFileStorage, BaseFileStore ,Tools} from "update-app-server"
import { join } from "path";
import { DataSource, EntityManager } from "typeorm";
import { createTable } from "../dao/impl/typeormImpl/createtable.function";
import { AccessControlService } from "../ac/AccessControl.service";
import { LogService } from "../log/log.service";
import { ACDBInterface } from "../dao/db.interface";

export class UpdateService extends UpdateApp{

    public fileStorage: BaseFileStore;
    public accessControl: ACDBInterface;

    // 日志可能不用这个
    private logService:LogService

    constructor( private dataSource:DataSource, private packPath:string ) {

        let queryRunner = dataSource.createQueryRunner();

        // 初始化文件存储
        // let packPath = "./package/packs";
        let typeormFileStorage = new TypeormFileStorage(join(process.cwd(), packPath),dataSource)

        super(typeormFileStorage)

        // 文件存储对象
        this.fileStorage = typeormFileStorage

        // 初始化访问控制器
        this.accessControl = new AccessControlService(queryRunner.manager)
    }
    

    // 版本更新检查
    public async CheckUpdate(version: string,id:number):Promise<boolean> {
        if(!version) return false;
        
        // 获取最新版本
        let newVersion:string = ""

        // 检查是否有特殊版本
        let isVersion = await this.accessControl.checkUserNeedDownloadVersion(id)
        if (isVersion) {
            newVersion = await this.accessControl.getUserDownloadVersion(id)
        }else{
            newVersion = await this.fileStorage.getLatestVersion();
        }
        // 比较版本
        let state:number = Tools.compareVersion(version, newVersion)
        return state == 0;
    }

    async BeginDownload(version: string, next: (version: string) => void, refuse: ()=>void, dist: any):Promise<void> {
        let isVersion = await this.accessControl.checkUserNeedDownloadVersion(dist.id)
        if (isVersion) {
            let newVersion = await this.accessControl.getUserDownloadVersion(dist.id)
            next(newVersion)
        }else{
            next(version)
        }
    }

    async BegineUpload(version: string, next: (version: string) => void, refuse: Function, dist: any): Promise<void> {
        // 检查用户是否有上传权限
        let access = await this.accessControl.checkUserIsUploadUser(dist.id)
        console.log("上传权限：",access)

        if (access) {
            next(version)
        }else{
            refuse()
        }
        console.log("上传版本：",version)
    }

    AfterDownload(file: string | Buffer,dist):void { 
        dist.res.download(file);
        console.log("下载完成")
    }
    RefuseDownload(version: string,dist):void {
        console.log("下载失败-拒绝下载")
    }
    
    AfterUpload(version: string,dist):void {
        console.log("上传完成")
    }
    RefuseUpload(dist): void {
        console.log("上传失败-拒绝上传")
    }
}