export class DownloadPool extends Map<string,any> {
    constructor() {
        super();
    }
    public get<T>(key:string):T{
        return super.get(key);
    }
    public set<T>(key:string,value:T):this{
        return super.set(key,value);
    }
    public has(key:string):boolean{
        return super.has(key);
    }
    public delete(key:string):boolean{
        return super.delete(key);
    }
    public clear():void{
        return super.clear();
    }
    public keys():IterableIterator<string>{
        return super.keys();
    }
    public values<T>():IterableIterator<T>{
        return super.values();
    }
    public entries():IterableIterator<[string,any]>{
        return super.entries();
    }
    public forEach(callbackfn:(value:any,key:string,map:Map<string,any>)=>void,thisArg?:any):void{
        return super.forEach(callbackfn,thisArg);
    }

}