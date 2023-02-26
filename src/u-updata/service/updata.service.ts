import { UpdateApp , TypeormFileStorage} from "update-app-server"
import { join } from "path";
import { DataSource, EntityManager } from "typeorm";
import { createTable } from "../dao/impl/typeormImpl/createtable.function";
import { AccessControlService } from "../ac/AccessControl.service";
import { LogService } from "../log/log.service";

export class UpdateService extends UpdateApp{

    public typeormFileStorage: TypeormFileStorage
    public accessControl: AccessControlService

    // 日志可能不用这个
    private logService:LogService

    constructor( private dataSource:DataSource) {

        let queryRunner = dataSource.createQueryRunner();

        // 初始化文件存储
        let packPath = "./package/packs";
        let typeormFileStorage = new TypeormFileStorage(join(process.cwd(), packPath),dataSource)

        super(typeormFileStorage)

        // 文件存储对象
        this.typeormFileStorage = typeormFileStorage

        // 初始化访问控制器
        this.accessControl = new AccessControlService(queryRunner.manager)
    }
    

    // 版本更新检查
    public CheckUpdate(version: string):boolean {
        return false;
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

    BegineUpload(version: string, next: (version: string) => void, refuse: Function, dist: any): void {
        // 检查用户是否有上传权限
        let access = this.accessControl.checkUserIsUploadUser(dist.id)

        if (access) {
            next(version)
        }else{
            refuse()
        }
        console.log("上传版本：",version)
        next(version)
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