'use strict';

const  { Client, MessageEmbed, Message, MessageAttachment, MessageReaction } = require('discord.js');
const client = new Client();
const config = require('./config.json');
const lexicon = require('wow-lexicon');

const wowLanguages = ['darnassian', 'draconic', 'draenei', 'dwarven', 'eredun',
 'gnomish', 'gutterspeak', 'kalimag', 'orcish', 'taurahe', 'thalassian', 'zandali'];

client.on('ready', ()=>{
    console.log(`${client.user.tag} Bot is online!`);
});

// Commands List
client.on('message', message => {
    
    // only allow commands that start with '!'
    if(message.content.charAt(0) === '!'){

        //split the prefix off from the arguments (e.g. !languages becomes languages)
        let args = message.content.substring(config.prefix.length).split(" ");

        //make all args lowercase in case anyone types in capitals
        args = args.map(arg => arg.toLowerCase());
        
        if (args[0] === 'wlbcommands' && args.length === 1){
            const embed = new MessageEmbed()
            .setTitle('Commands:')
            .setColor(0xFF5900)
            .setDescription(
                `!languages
                 !phrases1 (change number for a new page)
                 !wlbpoll -poll title- ( eg. !wlbpoll Pineapple on pizza? )
                `
            );
            message.channel.send(embed);
        }
    }
   
})

// Orcish to Common Phrases
client.on('message', message => {

    if(message.content.charAt(0) === '!'){

        //split the prefix off from the arguments (e.g. !languages becomes languages)
        let args = message.content.substring(config.prefix.length).split(" ");

        //make all args lowercase in case anyone types in capitals
        args = args.map(arg => arg.toLowerCase());
        
        if(args.length === 1){

            switch(args[0]){
                case 'phrases1':
                    const embed1 = new MessageEmbed()
                    .setTitle('Orcish to Common Phrases:')
                    .setColor(0xff0000)
                    .setDescription(
                        `
                        ƒ 1 ‡ ‡ 3 = sorry
        
                        ž 1 ž = lol
                        
                        € 3 2 = bye
                        
                        Š 1 1 € = noob
                        
                        „ Ÿ „ Ÿ = haha
                        
                        ž 1 ä 2 3 1 p = love you
                        
                        3 1 p ƒ 17 ž ž = you smell
                        `
                    );
                    message.channel.send(embed1);
                    break;
                case 'phrases2':
                    const embed2 = new MessageEmbed()
                    .setTitle('Orcish to Common Phrases:')
                    .setColor(0xff0000)
                    .setDescription(
                        `
                        a c ‚ c ÇÈ ‚ f 30 = g o t o re t a il
                        c ƒ ◃ c c € f = o k z o o m a
                        üö ‚ I c ◃ ‚ = ge t l o z t
                        11 d d c = ha l l o
                        `
                    );
                    message.channel.send(embed2);
                    break;
            }
        }

    }

});

// WoW Languages Translator
client.on('message', message => {

    if(message.content.charAt(0) === '!'){

        //split the prefix off from the arguments (e.g. !languages becomes languages)
        let args = message.content.substring(config.prefix.length).split(" ");

        //make all args lowercase in case anyone types in capitals
        args = args.map(arg => arg.toLowerCase());

        let langs = [];

        if(args[0] === 'languages' && args.length === 1){

            for(var i = 0; i < wowLanguages.length; i++){
                // capitalize the first letter of each language and add it to langs array
                // if last item in array, don't add comma and space
                if(i != wowLanguages.length - 1){
                    langs += wowLanguages[i].charAt(0).toUpperCase() + wowLanguages[i].slice(1) + ',' + ' ';
                }
                else{
                    langs += wowLanguages[i].charAt(0).toUpperCase() + wowLanguages[i].slice(1);
                }
            }
            const embed = new MessageEmbed()
            .setTitle('Available Languages:')
            .setColor(0x00ff00)
            .setDescription(
                `${langs}

                To use the translator, type !language message (for example, !orcish hello)`
                );
            
            message.channel.send(embed);
        }


        //loop through language array and match the command to the language
        for(var i = 0; i < wowLanguages.length; i++){
            if(args[0] === wowLanguages[i]){
                message.reply(
                    lexicon.translate(wowLanguages[i], args[0])
                );
                // message.channel.sendMessage(
                //     lexicon.translate(wowLanguages[i], args[0])
                // );
            }
        }

    }

});

// Poll Functionality
client.on('message', message => {

    if(message.content.charAt(0) === '!'){

        //split the prefix off from the arguments (e.g. !languages becomes languages)
        let args = message.content.substring(config.prefix.length).split(" ");

        if (args[0] === 'wlbpoll'){
            const embed = new MessageEmbed()
            .setColor(0xFFC300)
            .setTitle("Initiate Poll")
            .setDescription("!poll to initiate a simple yes or no poll");

            if(!args[1]){
                message.channel.send(embed);
            }

            let msgArgs = args.slice(1).join(" ");

            message.channel.send(`📋 ** ${msgArgs} **`)
            .then(messageReaction => {
                messageReaction.react("👍");
                messageReaction.react("👎");
            })
            .catch(console.error);
        }
    }
});

client.login(config.token);