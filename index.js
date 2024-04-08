const TelegramApi = require('node-telegram-bot-api');
const {gameButtons, yesOrNoButtoms} = require('./buttons')
const token = '6802628282:AAERAQ1tVM1tfPn84SNrADZlCGE_lORnpbo';

const bot = new TelegramApi(token, { polling: true });

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Початок' },
        { command: '/info', description: 'Інформація про цей бот' },
        { command: '/play', description: 'Почати гру' },
        { command: '/stop', description: 'Закінчити гру' },
    ])

    async function play(data, chatId) {
        const botChoice = getChoice();
        if (data === botChoice) {
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/f87/928/f8792879-6d47-3804-91fd-f5b585fb0c9e/12.webp');
            return bot.sendMessage(chatId, `Нічия! Я обрав ${botChoice}\nХочете спробувати ще раз?`, yesOrNoButtoms);
        } else if ((data === 'Камінь' && botChoice === 'Ножиці') ||
            (data === 'Ножиці' && botChoice === 'Папір') ||
            (data === 'Папір' && botChoice === 'Камінь')) {
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/f87/928/f8792879-6d47-3804-91fd-f5b585fb0c9e/11.webp');
            return bot.sendMessage(chatId, `Ви перемогли! Я обрав ${botChoice}\nХочете спробувати ще раз?`, yesOrNoButtoms);
        } else {
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/f87/928/f8792879-6d47-3804-91fd-f5b585fb0c9e/6.webp');
            return bot.sendMessage(chatId, `Я переміг! Я обрав ${botChoice}\nХочете спробувати ще раз?`, yesOrNoButtoms);
        }
    }
    
    function getRandomItem(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    function getChoice() {
        const choices = ['Камінь', 'Ножиці', 'Папір'];
        return getRandomItem(choices);
    }

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/f87/928/f8792879-6d47-3804-91fd-f5b585fb0c9e/192/19.webp');
            await bot.sendMessage(chatId, 'Привіт! Вітаю вас у грі "Камінь Ножиці Папір"!\nЯкщо готовий почати, то пиши команду /play, або просто "Почати гру".')
        } else if (text === '/play' || text === 'Почати гру' || text === 'почати гру' || text === 'ПОЧАТИ ГРУ') {
            getChoice();
            return bot.sendMessage(chatId, 'Добре! Що оберете?', gameButtons);
        } else if (text === '/info') {
            await bot.sendMessage(chatId, 'Це бот для гри "Камінь Ножиці Папір".');
        } else if (text === '/stop') {
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/f87/928/f8792879-6d47-3804-91fd-f5b585fb0c9e/9.webp');
            await bot.sendMessage(chatId, 'Добре, якщо що пишіть, буду радий ще пограти з вами!)');
        } else {
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/f87/928/f8792879-6d47-3804-91fd-f5b585fb0c9e/5.webp');
            await bot.sendMessage(chatId, 'Я вас не розумію, спробуйте ще раз!');
        }
    });

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === 'Так') {
            await bot.sendMessage(chatId, 'Добре! Що обере?', gameButtons);
        } else if (data === 'Ні') {
            await bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/f87/928/f8792879-6d47-3804-91fd-f5b585fb0c9e/9.webp');
            await bot.sendMessage(chatId, 'Добре, якщо що пишіть, буду радий ще пограти з вами!)');
        } else {
            await play(data, chatId);
        }
    });
};

start();