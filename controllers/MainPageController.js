import { SqliteRepository } from "../repository/SqliteRepository.js"

export class MainPageController
{
    async getPageContent(){

        const sqlRepo = new SqliteRepository()
        const msg = {
            status: "ok",
            data: {
                bio: "",
                bio_photo: {
                    path: "",
                    alt: ""
                },
                banner_photo: {
                    path: "",
                    alt: ""
                },
                phone: "",
                telegram: "",
                personal_blog: "",
                mail: ""
            }
        }
        let bio = await sqlRepo.findOne("SELECT * FROM site_settings WHERE NAME='bio'")
        msg.data.bio = bio.VALUE
        let bio_photo = await sqlRepo.findOne("SELECT * FROM site_settings WHERE NAME='bio_photo'")
        msg.data.bio_photo.path = bio_photo.VALUE
        msg.data.bio_photo.alt = bio_photo.DESC
        let banner_photo = await sqlRepo.findOne("SELECT * FROM site_settings WHERE NAME='banner_photo'")
        msg.data.banner_photo.path = banner_photo.VALUE
        msg.data.banner_photo.alt = banner_photo.DESC
        let phone = await sqlRepo.findOne("SELECT * FROM site_settings WHERE NAME='phone'")
        msg.data.phone = phone.VALUE
        let telegram = await sqlRepo.findOne("SELECT * FROM site_settings WHERE NAME='telegram'")
        msg.data.telegram = telegram.VALUE
        let personal_blog = await sqlRepo.findOne("SELECT * FROM site_settings WHERE NAME='personal_blog'")
        msg.data.personal_blog = personal_blog.VALUE
        let mail = await sqlRepo.findOne("SELECT * FROM site_settings WHERE NAME='mail'")
        msg.data.mail = mail.VALUE
        return msg
    }

    async getInfoCards(){
        const sqlRepo = new SqliteRepository()
        let infoCards = await sqlRepo.findMany("SELECT * FROM info_cards");
        console.log(infoCards)
        return infoCards
    }
}