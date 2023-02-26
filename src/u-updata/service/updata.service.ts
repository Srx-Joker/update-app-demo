import { UpdateApp , JsonFileStorage, Tools, TypeormFileStorage} from "update-app-server"
import { join } from "path";
import { DataSource, EntityManager } from "typeorm";
import { createTable } from "../dao/impl/typeorm/createtable.function";

export class UpdateService extends UpdateApp{

    private typeormFileStorage: TypeormFileStorage

    constructor( private dataSource:DataSource ) {

        let queryRunner = dataSource.createQueryRunner();

        let packPath = "../package/packs";
        createTable(queryRunner);

        let typeormFileStorage = new TypeormFileStorage(join(__dirname, packPath),dataSource)
        super(typeormFileStorage)

        this.typeormFileStorage = typeormFileStorage
    }
    

    // 版本更新检查
    public CheckUpdate(version: string):boolean {
        return false;
    }


    BeginDownload(version: string, next: (version: string) => void, refuse: ()=>void, dist: any):void {

    }

    BegineUpload(version: string, next: (version: string) => void, refuse: Function, dist: any): void {
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