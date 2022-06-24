import { sequelize } from "../db";
import { Model } from "sequelize";
const { Request, User } = sequelize.models

enum list{
    POST_organization = "createOrganization",
    POST_location = "createLocation",
    DELETE_event = "destroyEvent",
    PUT_event = "updateEvent"
}

export const createRequest = async (userId: number, description: string, type: string, method: string, body: any) => {
    const request  = await Request.create({userId, description, type, method, body: JSON.stringify(body)})
    
}

const executeRequest = (request: Model<any,any>) => {
    const type = request.getDataValue("type")
    const method = request.getDataValue("method")
    let body = request.getDataValue("body")
    let function_type = list[`${method}_${type}` as keyof typeof list]
    body = JSON.parse(body)
    
    require(`../utils/${type}.ts`)[function_type](body)
}

export const updateRequest = async (id:string | number, status: string) => {
    let request = await Request.findByPk(id)
    if(request){

        request.update({status})
        
        if(status === "accepted") executeRequest(request)
    }
}

export const findRequest = async (id: string | number) => {
    let request = await Request.findByPk(id, {
        include: {
            model: User,
            attributes: ["id","name","email"]
        }
    })

    return request
}