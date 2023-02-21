interface ACDBInterface {
    // 检查用户是否需要下载指定版本
    checkUserNeedDownloadVersion(userId: string, version: string): Promise<boolean>;

    // 添加特殊版本用户
    addSpecialUser(userId: string, version: string): Promise<boolean>;

    // 删除特殊版本用户
    deleteSpecialUser(userId: string, version: string): Promise<boolean>;

    // 获取所有特殊版本用户
    getAllSpecialUser(): Promise<any[]>;

    // 修改用户下载版本
    updateUserDownloadVersion(userId: string, version: string): Promise<boolean>;

    // 记录用户下载日志
    recordUserDownloadLog(userId: string, version: string): Promise<boolean>;
    
    // 创建特殊用户日志格式
    createSpecialUserLogFormat(userId: string, version: string): Promise<any>;   
}

interface LogDBInterface {

}


export { ACDBInterface }