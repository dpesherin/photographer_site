import pkg from 'sqlite3';
const {Database} = pkg;

export class SqliteRepository
{
    constructor(){
        this._db = new Database("databese.db")
    }

    findOne(sqlStatement, params = []){
        return new Promise((resolve, reject)=>{
            this._db.get(sqlStatement, params, (err, res)=>{
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    findMany(sqlStatement){
        return new Promise((resolve, reject)=>{
            this._db.all(sqlStatement, (err, res)=>{
                if(err){
                    reject(err)
                }
                resolve(res)
            })
        })
    }

    insert(sqlStatement, params = []) {
        return new Promise((resolve, reject) => {
            this._db.run(sqlStatement, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        lastID: this.lastID,
                        changes: this.changes
                    });
                }
            });
        });
    }

    del(sqlStatement){
        return new Promise((resolve, reject)=>{
            
        })
    }
}