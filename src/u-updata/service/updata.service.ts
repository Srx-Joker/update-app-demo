import { UpdateApp , JsonFileStorage, Tools} from "update-app-server"
import { join } from "path";

export class UpdateService extends UpdateApp{

    private jsonFileStorage: JsonFileStorage

    constructor() {
        // this.update = new UpdateApp(new JsonFileStorage(this.jsonFile ,this.packPath))
        let jsonFile = "../package/version.json";
        let packPath = "../package/packs";

        let jsonFileStorage = new JsonFileStorage(join(__dirname,jsonFile) ,join(__dirname,packPath))
        super(jsonFileStorage)

        this.jsonFileStorage = jsonFileStorage
    }

    // 重新读取配置文件
    public readConfig(){
        this.jsonFileStorage.readCoinfig();
    }

    // 版本更新检查
    public CheckUpdate(version: string):boolean {
        // 用户使用版本更新 存缓存 然后定时写入数据库
        return Tools.compareVersion(version, this.jsonFileStorage.getLatestVersion()) == 1
    }
    

    BeginDownload(version: string, next: (version: string) => void, refuse: ()=>void, dist: any):void {
        // 特殊版本用户

        // 回滚版本

        // 下载负载

        // 下载队列

    }

    BegineUpload(version: string, next: (version: string) => void, refuse: Function, dist: any): void {
        // 版本号检查

        // 上传权限检查

    }

    AfterDownload(file: string | Buffer,dist):void { 
        // 用户使用版本更新

        // 下载量统计
    }
    RefuseDownload(version: string,dist):void {
        // 日志记录

    }
    
    AfterUpload(version: string,dist):void {
        // 日志记录
    }
    RefuseUpload(dist): void {
        // 日志记录
    }
}