var developmentDatabase = {
    postgres: {
    host: 'ec2-54-228-250-82.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'dhpbthiu1ofi9',
    user: 'mhytsjnxjdlmcz',
    password: 'e1d8a00734a76239e16123e48a49d8faca49f07f9be696468da08c297ca4ed68'
    }
    }
    
    var connectionString = "postgres://mhytsjnxjdlmcz:e1d8a00734a76239e16123e48a49d8faca49f07f9be696468da08c297ca4ed68@ec2-54-228-250-82.eu-west-1.compute.amazonaws.com:5432/dhpbthiu1ofi9";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }