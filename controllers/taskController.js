const { model } = require('mongoose')
const { resolveContent } = require('nodemailer/lib/shared')
const Task = require('../models/Task')
module.exports = {
    get: (params)=>{},


    //create a new task
    post: (params) =>{
        return new Promise((resolve, reject)=>{
            Task.create(params).then((data)=> resolve(data))
            .catch((error) => reject(error));
        })
    },


    //FIND something that has param1 , change it to param2
    put: (param1, param2)=>{

    },

    delete: (param)=>{

    },
}

