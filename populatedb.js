#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require('async');
const Hall = require('./models/hall');
const Cuisine = require('./models/cuisine');
const Table = require('./models/table');


const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://vex:vex@cluster0.sojgl.mongodb.net/restaurant_db?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const halls = [];
const cuisines = [];
const tables = [];


function cuisinesCreate(italian, japanese, russian, cb) {
    let cuisinesdetail = {
        italian: italian,
        japanese: japanese,
        russian: russian
    }

    const cuisine = new Cuisine(cuisinesdetail);
    console.log(cuisine);
    cuisine.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Cuisine: ' + cuisine);
        cuisines.push(cuisine)
        cb(null, cuisine)
    });
}

function hallCreate(name, cuisine,picture_src,description, cb) {
    let halldetail = {name: name, cuisines: cuisine, picture_src:picture_src, description: description}

    const hall = new Hall(halldetail);

    hall.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Hall: ' + hall);
        halls.push(hall)
        cb(null, hall)
    });
}

function tableCreate(number,position ,hall, maxPersons, status, cb) {
    const table = new Table({number: number, position: position, hall: hall, MaxPersons: maxPersons, status: status});
    table.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Table: ' + table);
        tables.push(table)
        cb(null, table);
    });
}


function createCuisines(cb) {
    async.parallel([
            function (callback) {
                cuisinesCreate(true,false, false, callback);
            },
            function (callback) {
                cuisinesCreate(false,true, false, callback);
            },
            function (callback) {
                cuisinesCreate(false,true, true, callback);
            },
            function (callback) {
                cuisinesCreate(true,true, true, callback);
            }
        ],
        // optional callback
        cb);
}


function createHalls(cb) {
    async.parallel([
            function (callback) {
                hallCreate('Зеленый', cuisines[0],'/images/green.jpg',' традиционная кухня Италии, распространённая и популярная во всём мире, благодаря таким блюдам, как пицца и спагетти. Она очень разнообразна и региональна, в каждом регионе есть свои традиционные блюда.\n' +
                    '\n' +
                    'В основе итальянской кухни лежат исторически сложившиеся многовековые традиции с культурными влияниями римлян, греков, лангобардов, арабов, и прочих народов, когда-либо населявших Италию или оказывавших влияние на формирование её культуры.',  callback);
            },
            function (callback) {
                hallCreate('Желтый',  cuisines[1],'/images/yellow.jpg',' Отличается предпочтением натуральных, минимально обработанных продуктов, широким применением морепродуктов, сезонностью, характерными блюдами, специфическими правилами оформления блюд, сервировкой, застольным этикетом. Блюда японской кухни, как правило, являются ключевой достопримечательностью для туристов из других стран.\n' +
                    '\n' +
                    'Классический формат неформального приёма пищи — рис, суп и несколько гарниров: рыба (обычно жареная на гриле или варёная), соления и овощи. Все эти блюда подаются в небольших мисках, откуда их едят палочками. Наиболее популярные приправы — соевый соус и васаби. Из напитков в Японии предпочитают зелёный чай, пиво и саке.',  callback);
            },
            function (callback) {
                hallCreate('Красный',  cuisines[2],'/images/red.jpg','Меню Красного зала — это, прежде всего, традиционная русская еда, а так же особые деликатесы — сочные стейки из мраморной говядины, средиземноморские устрицы, испанский хамон, камчатский краб.\n' +
                    '\n' +
                    'Мы регулярно проводим гастрономические ужины с лучшими винами. Стоит обратить особое внимание на винную карту ресторана — в ней представлено 90 наименований, которые тщательно отобраны профессиональным сомелье на основании предпочтений и запросов наших гостей.',  callback);
            },
            function (callback) {
                hallCreate('Белый',  cuisines[3],'/images/white.jpg','Зал смешанной кухни с хорошим соотношением цена-качество.',  callback)
            }
        ],
        // optional callback
        cb);
}


function createTable(cb) {
    async.parallel([
            function (callback) {
                tableCreate(1, 'центр', halls[0], 6,'Свободен', callback)
            },
            function (callback) {
                tableCreate(2, 'центр', halls[0], 3,'Свободен', callback)
            },
            function (callback) {
                tableCreate(3, 'центр', halls[0], 6,'Свободен', callback)
            },
            function (callback) {
                tableCreate(4, 'Возле окна', halls[0], 2,'Свободен', callback)
            },
            function (callback) {
                tableCreate(1, 'центр', halls[1], 6,'Свободен', callback)
            },
            function (callback) {
                tableCreate(2, 'Возле окна', halls[1], 2,'Свободен', callback)
            },
            function (callback) {
                tableCreate(3, 'Возле окна', halls[1], 2,'Свободен', callback)
            },
            function (callback) {
                tableCreate(4, 'Веранда', halls[1], 8,'Свободен', callback)
            },
            function (callback) {
                tableCreate(1, 'центр', halls[2], 6,'Свободен', callback)
            },
            function (callback) {
                tableCreate(2, 'Возле окна', halls[2], 3,'Свободен', callback)
            },
            function (callback) {
                tableCreate(3, 'Возле окна', halls[2], 6,'Забронирован', callback)
            },
            function (callback) {
                tableCreate(4, 'центр', halls[2], 6,'Забронирован', callback)
            },
            function (callback) {
                tableCreate(1, 'центр', halls[3], 6,'Забронирован', callback)
            },
            function (callback) {
                tableCreate(2, 'Возле окна', halls[3], 2,'Забронирован', callback)
            },
            function (callback) {
                tableCreate(3, 'центр', halls[3], 6,'Свободен', callback)
            },
            function (callback) {
                tableCreate(4, 'Веранда', halls[3], 3,'Забронирован', callback)
            }

        ],
        // Optional callback
        cb);
}
async.series([
        createCuisines,
        createHalls,
        createTable
    ],
// Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        } else {
            console.log('BOOKInstances: ' + cuisines);

        }
        // All done, disconnect from database
        mongoose.connection.close();
    });




