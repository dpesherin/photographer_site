import pkg from 'sqlite3';
const {Database} = pkg;

export class SqliteRepository
{
    constructor(){
        this._db = new Database("databese.db")
    }

    findOne(sqlStatement){
        return new Promise((resolve, reject)=>{
            this._db.serialize(()=>{
                this._db.each(sqlStatement, (err, res)=>{
                    if(err){
                        reject(err)
                    }
                    resolve(res)
                })
            })
        })
    }

    findMany(sqlStatement){
        return new Promise((resolve, reject)=>{
            this._db.serialize(()=>{
                this._db.all(sqlStatement, (err, res)=>{
                    if(err){
                        reject(err)
                    }
                    resolve(res)
                })
            })
        })
    }

    insert(sqlStatement){
        return new Promise((res, rej)=>{
            
        })
    }

    del(sqlStatement){
        return new Promise((res, rej)=>{
            
        })
    }
}