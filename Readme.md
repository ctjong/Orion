# Orion API

[![npm](https://img.shields.io/npm/dt/orion-api.svg)](https://www.npmjs.com/package/orion-api) [![npm](https://img.shields.io/npm/v/orion-api.svg)](https://www.npmjs.com/package/orion-api) [![David](https://img.shields.io/david/ctjong/orion.svg)](https://www.npmjs.com/package/orion-api)

Orion is an extension of [Express](https://github.com/expressjs/express) which allows you to build a fully functional REST API in just a few steps! It sets up all the CRUD data endpoints, file uploads, authentication endpoints, and error handling for you. All you need to do is just create a configuration and instantiate the application!

## Supported components

The library allows you to use the following services based on your preferences:
- Database: **SQL Server** / **MySQL**
- File storage: **Azure Blob Storage** / **Amazon S3** / **Local Server**
- Authentication: **Facebook token** / **Orion JSON Web Token (JWT)**
- Monitoring: **Azure Application Insights**

## Example usage

```js
var orion = require('orion-api');

var config = 
    {
        database:
        {
            engine: "mssql",
            connectionString: _DATABASE_CONNECTION_STRING_
        },
        entities:
        {
            "blogpost":
            {
                "fields":
                {
                    "title": { type: "string", isEditable: true, createReq: 2, foreignKey: null },
                    "content": { type: "richtext", isEditable: true, createReq: 2, foreignKey: null }
                },
                "allowedRoles":
                {
                    "read": ["guest"],
                    "create": ["guest"],
                    "update": ["guest"],
                    "delete": ["guest"]
                }
            }
        }
    };

var app = new orion(config);
app.setupApiEndpoints();
app.start();
```

## Documentation

- [Home](https://ctjong.github.io/orion)
- [Create Your First Orion Application](#create-your-first-orion-application)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Authentication](#authentication)
- [User Roles](#user-roles)
- [Condition Syntax](#condition-syntax)
- [API Reference](#api-reference)
- [Contributing](https://github.com/ctjong/orion/tree/master/CONTRIBUTING.md)
- [License](https://github.com/ctjong/orion/tree/master/LICENSE)


## Links

[Contributing](https://github.com/ctjong/orion/tree/master/CONTRIBUTING.md)

[License](https://github.com/ctjong/orion/tree/master/LICENSE)