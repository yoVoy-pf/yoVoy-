import { sequelize } from "../db";

const { User, Event, Favorites, Ticket } = sequelize.models

export const getAllFavorites = async(id:string | number) => {
    const favorites = await Event.findAll({
        attributes: ["id","background_image", "name",],
        include:{
            model:User,
            attributes: [],
            where: {
                id: id
            }
        }
    })

    return favorites
}

export const createFavorite = async(id:string | number, eventId:string) => {
    const favorite = await Favorites.create({userId: id, eventId})

    return favorite
}

export const getAllTickets = async(id: string | number) => {
    const tickets = await Ticket.findAll({
        attributes: ["paymentId","status","status_detail","paymentType","transaction_amount","quantity"],
        where:{
            userId: id
        },
        include:{
            model: Event,
            attributes: ["id","name"]
        }
    })

    return tickets
}

