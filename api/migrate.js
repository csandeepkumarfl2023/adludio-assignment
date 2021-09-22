const path = require('path');
const Promise = require('bluebird');
const Umzug = require('umzug');

const db = require("./seq");
const sequelize = db.sequelize;

const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize: sequelize,
    },

    migrations: {
        params: [
            sequelize.getQueryInterface(), // queryInterface
            sequelize.constructor, // DataTypes
            function () {
                throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
            }
        ],
        path: './migrations',
        pattern: /\.js$/
    },

    logging: function () {
        console.log.apply(null, arguments);
    },
});

function logUmzugEvent(eventName) {
    return function (name, migration) {
        console.log(`${name} ${eventName}`);
    }
}
umzug.on('migrating', logUmzugEvent('migrating'));
umzug.on('migrated', logUmzugEvent('migrated'));
umzug.on('reverting', logUmzugEvent('reverting'));
umzug.on('reverted', logUmzugEvent('reverted'));

function cmdStatus() {
    let result = {};

    return umzug.executed()
        .then(executed => {
            result.executed = executed;
            return umzug.pending();
        }).then(pending => {
            result.pending = pending;
            return result;
        }).then(({
            executed,
            pending
        }) => {

            executed = executed.map(m => {
                m.name = path.basename(m.file, '.js');
                return m;
            });
            pending = pending.map(m => {
                m.name = path.basename(m.file, '.js');
                return m;
            });

            const current = executed.length > 0 ? executed[0].file : '<NO_MIGRATIONS>';
            const status = {
                current: current,
                executed: executed.map(m => m.file),
                pending: pending.map(m => m.file),
            }



            return {
                executed,
                pending
            };
        })
}

function cmdMigrate() {
    return umzug.up();
}

function cmdMigrateFile() {
    if (!process.argv[3]) {
        console.log('please provide a migration file.');
        return;
    }
    return umzug.up(process.argv[3])
}

function cmdResetFile() {
    if (!process.argv[3]) {
        console.log('please provide a reset file.');
        return;
    }
    return umzug.down(process.argv[3])
}

function cmdMigrateNext() {
    return cmdStatus()
        .then(({
            executed,
            pending
        }) => {
            if (pending.length === 0) {
                return Promise.reject(new Error('No pending migrations'));
            }
            const next = pending[0].name;
            return umzug.up({
                to: next
            });
        })
}

function cmdReset() {
    return umzug.down({
        to: 0
    });
}

function cmdResetPrev() {
    return cmdStatus()
        .then(({
            executed,
            pending
        }) => {
            if (executed.length === 0) {
                return Promise.reject(new Error('Already at initial state'));
            }
            const prev = executed[executed.length - 1].name;
            return umzug.down({
                to: prev
            });
        })
}


if (!process.argv[2]) {
    console.log('please provide a command : status, up, migrate.');
    return;
}
const cmd = process.argv[2].trim();
let executedCmd;

console.log(`${cmd.toUpperCase()} BEGIN`);
switch (cmd) {
    case 'status':
        executedCmd = cmdStatus();
        break;

    case 'up':
    case 'migrate':
        executedCmd = cmdMigrate();
        break;

    case 'next':
    case 'migrate-next':
        executedCmd = cmdMigrateNext();
        break;

    case 'down':
    case 'reset':
        executedCmd = cmdReset();
        break;

    case 'prev':
    case 'reset-prev':
        executedCmd = cmdResetPrev();
        break;

    case 'migrate-file':
        executedCmd = cmdMigrateFile();
        break;

    case 'reset-file':
        executedCmd = cmdResetFile();
        break;


    default:
        console.log(`invalid cmd: ${cmd}`);
        process.exit(1);
}

executedCmd
    .then((result) => {
        const doneStr = `${cmd.toUpperCase()} DONE`;
        console.log(doneStr);
        console.log("=".repeat(doneStr.length));
    })
    .catch(err => {
        const errorStr = `${cmd.toUpperCase()} ERROR`;
        console.log(errorStr);
        console.log("=".repeat(errorStr.length));
        console.log(err);
        console.log("=".repeat(errorStr.length));
    })
    .then(() => {
        if (cmd !== 'status' && cmd !== 'reset-hard') {
            return cmdStatus()
        }
        return Promise.resolve();
    })
    .then(() => process.exit(0))