module.exports = {
    apps: [
        {
            name: "lms-assignment-api-3000",
            script: "./src/server.js",
            env: {
                PORT: 3000,
                NODE_ENV: "development"
            }
        },
        {
            name: "lms-assignment-api-4000",
            script: "./src/server.js",
            env: {
                PORT: 4000,
                NODE_ENV: "development"
            }
        }
    ]
};