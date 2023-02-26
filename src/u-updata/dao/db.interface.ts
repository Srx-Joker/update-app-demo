interface ACDBInterface {
    /**
     * 检查用户是否需要下载指定版本
     * @param userId 用户ID
     * @param version 版本号
     */
    checkUserNeedDownloadVersion(userId: number): Promise<boolean>;

    /**
     * 添加需要用户下载指定版本
     * @param userId 用户ID
     * @param version 版本号
     */
    addSpecialUser(userId: number, version: string): Promise<boolean>;

    /**
     * 删除用户下载指定版本
     * @param userId 用户ID
     * @param version 版本号
     */
    deleteSpecialUser(userId: number, version: string): Promise<boolean>;

    /**
     * 获取所有特殊用户
     */
    getAllSpecialUser(): Promise<any[]>;

    /**
     * 修改用户需要下载的版本
     * @param userId 用户ID
     * @param version 版本号
     */
    updateUserDownloadVersion(userId: number, version: string): Promise<boolean>;  
}

interface LogDBInterface {

}

interface ConfigDBInterface {
    // 添加配置项
    addConfigItem(key: string, value: string,remark:string): Promise<boolean>;

    // 删除配置项
    deleteConfigItem(key: string): Promise<boolean>;

    // 修改配置项
    updateConfigItem(key: string, value: string,remark:string): Promise<boolean>;

    // 获取配置项
    getConfigItem(key: string): Promise<any>;

    // 初始化配置项
    initConfigItem(): Promise<boolean>;

}


export { ACDBInterface }