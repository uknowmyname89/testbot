require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api')
const {opt} = require('./options')
const sequelize = require('./db');
const UserModel = require('./models');

const token = '5042656097:AAEem7gBsoDcBJA6lPVBiptdqwEjbHB8AdM';

const bot = new TelegramApi(token, {polling: true})

const start = async () => {

    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log('Подключение к бд сломалось', e)
    }


    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id+'';
        try {
            
            if (text.toLowerCase().indexOf('пук') !== -1) {
                let user = await UserModel.findOne({
                    where: { 
                        chatId: chatId
                    }
                });
                if(!user) {
                    user = await UserModel.create({chatId});
                }
                
                await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/017/d6b/017d6b47-23c3-4067-8a4d-dd047b69f1b0/192/8.webp');

                user.puks += 1;
                await bot.sendMessage(chatId, `Это ${user.puks} пук`, opt);
                await user.save();
            } else {
                return bot.sendMessage(chatId, `Пукай`);
            }
        } catch (e) {
            return bot.sendMessage(chatId, 'Произошла какая то ошибочка!)');
        }

    })

    bot.on('callback_query', async msg => {
        const chatId = msg.message.chat.id;
        return bot.sendMessage(chatId, `Ясно`);
    })
}

start()
