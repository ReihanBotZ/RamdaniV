let buatall = 1
let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
    conn.judi = conn.judi ? conn.judi : {}
    if (m.chat in conn.judi) return m.reply ('Masih Ada Yang Judi Disini, Tunggu Sampai Selesai!!')
    else conn.judi[m.chat] = true
    try {
        let randomaku = `${Math.floor(Math.random() * 100)}`.trim()
        let randomkamu = `${Math.floor(Math.random() * 69)}`.trim() // Biar Susah Menang :v
        let Aku = (randomaku * 1)
        let Kamu = (randomkamu * 1)
        let count = args[0]
        count = count ? /all/i.test(count) ? Math.floor(global.DATABASE._data.users[m.sender].money / buatall) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
        count = Math.max(1, count)
        if (args.length < 1) return conn.reply(m.chat, usedPrefix + 'Silahkan Masukan Jumblah Money\n ' + usedPrefix + 'Contoh: judi 1000', m)
        if (global.DATABASE._data.users[m.sender].money >= count * 1) {
            global.DATABASE._data.users[m.sender].money -= count * 1
            await m.reply('*Jangan Judi Gak Bakal Menang!!, Kalau Gak Percaya Juga Gpp*') //Kwkwwkkwlwlw
            if (Aku > Kamu) {
                conn.reply(m.chat, `🤖Aku Roll :${Aku}\n👤Kamu Roll : ${Kamu}\n\nKamu *Kalah*, Kamu Kehilangan ${count} Money💵`.trim(), m)
            } else if (Aku < Kamu) {
                global.DATABASE._data.users[m.sender].money += count * 2
                conn.reply(m.chat, `🤖Aku Roll :${Aku}\n👤Kamu Roll : ${Kamu}\n\nKamu *Menang*, Kamu Mendapatkan ${count * 2} Money💵`.trim(), m)
            } else {
                global.DATABASE._data.users[m.sender].money += count * 1
                conn.reply(m.chat, `🤖Aku Roll :${Aku}\n👤Kamu Roll : ${Kamu}\n\nKamu *Seri*, Kamu Mendapatkan ${count * 1} Money💵`.trim(), m)
            }
        } else conn.reply(m.chat, `Uang Kamu Tidak Cukup Untuk Melakukan Judi Sebesar ${count} Money`.trim(), m)
    } catch (e) {
        console.log(e)
        m.reply('Error!!')
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'Judi.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    } finally {
        delete conn.judi[m.chat]
    }
}
    
handler.help = ['judi <jumlah>']
handler.tags = ['rpg']
handler.command = /^(judi)$/i

handler.fail = null

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
