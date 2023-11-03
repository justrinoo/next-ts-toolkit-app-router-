import mysql from 'serverless-mysql';

export const connection = mysql({
    config: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'super-indo-test',
    },
});
