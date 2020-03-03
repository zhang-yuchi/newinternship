export const replaceNull = (obj)=>{
    let keys = Object.keys(obj)
    keys.map(item=>{
        if(!obj[item]){
            obj[item] = "暂无"
        }
    })
    return obj
}