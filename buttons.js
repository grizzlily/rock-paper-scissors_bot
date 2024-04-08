module.exports = {
    gameButtons: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Камінь', callback_data: 'Камінь' }],
                [{ text: 'Ножиці', callback_data: 'Ножиці' }],
                [{ text: 'Папір', callback_data: 'Папір' }],
            ]
        })
    },
    yesOrNoButtoms: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Так', callback_data: 'Так' }],
                [{ text: 'Ні', callback_data: 'Ні' }],
            ]
        })
    }
}