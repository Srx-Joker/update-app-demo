import { UpdateApp , JsonFileStorage, Tools} from "update-app"
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
    
    // 项目中从数据库获取用户信息
    // --------------------------------------------------------------------
    private testUsers = [
        {
            id : "1001", // 实际项目中可以为UUID
            username: "admin",
            password: "admin"

        },
        {
            id : "1002", // 实际项目中可以为UUID
            username: "test",
            password: "test"

        },
        {
            id : "1003", // 实际项目中可以为UUID
            username: "test2",
            password: "test2"
        },
        {
            id : "1004", // 实际项目中可以为UUID
            username: "test4",
            password: "test4"
        },
        {
            id : "1005", // 实际项目中可以为UUID
            username: "test5",
            password: "test5"
        }
    ]

    // Beta测试用户
    private betaUsers = ["1001","1002"]

    // Beta版本
    private betaVersions = "0.0.5"

    // 是否回滚
    private isRollback = false

    // 回滚版本
    private rollbackVersion = "0.0.3"

    // 下载量统计
    private downloadCount = 0

    // --------------------------------------------------------------------

    // 重新读取配置文件
    public readConfig(){
        this.jsonFileStorage.readCoinfig();
    }

    // 版本更新检查
    public CheckUpdate(version: string):boolean {
        return Tools.compareVersion(version, this.jsonFileStorage.getLatestVersion()) == 1
    }


    BeginDownload(version: string, next: (version: string) => void, refuse: ()=>void, dist: any):void {

        let config = this.jsonFileStorage.getJson();

        if(config){
            // 模拟在数据库查找用户信息
            for(let i in this.testUsers){
                if(this.testUsers[i].id == dist.id){
                    console.log("总下崽数"+ ++this.downloadCount)
                    console.log("版本更新用户"+this.testUsers[i].username)
                    console.log(this.betaUsers.indexOf(dist.id) != -1)
                    if(this.betaUsers.indexOf(dist.id) != -1){
                        next(config.betaVersion)
                        return
                    }

                    if(config.isRollback){
                        next(config.rollbackVersion)
                        return
                    }

                    next(version)
                    return
                }
            }
            refuse()
        }        
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