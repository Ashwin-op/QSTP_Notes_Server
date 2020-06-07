# Simple Notes Server

A Restful CRUD API for a simple Note Taking application using Node.js, Express and MongoDB. This API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). It has predictable resource-oriented URLs, accepts [form-encoded](https://en.wikipedia.org/wiki/POST_(HTTP)#Use_for_submitting_web_forms) request bodies, returns [JSON-encoded](http://www.json.org/) responses, and uses standard HTTP response codes, authentication, and verbs.

## Features

- Create a new user
- Login
- CRUD operation for notes
- Uses authentication

## Technologies Used

- Node
- Express
- MongoDB
- Body-parser
- Bcrpyt
- Jwt

## Usage

> **Note**: This documentation is based on how to access the API through Postman.

### Base URL

http://simple-notes-server.herokuapp.com/

### User Services

All the services have the default header `Content-Type: x-www-form-urlencoded` and each request should be sent through the body with this option (in Postman).

#### Register

```http
POST /api/users/register
```

Registers a new user with the `name`, `email` and `password`.

##### Parameters

| Parameter | Data Type | Description                                                  | Required |
| --------- | --------- | ------------------------------------------------------------ | -------- |
| name      | string    | Name of the user                                             | Yes      |
| email     | string    | Email of the user (used for login)                           | Yes      |
| password  | string    | Password of the user (Will be hashed before being saved in the DB) | Yes      |

###### Example Query (using HTTP)

```http
POST /api/users/login HTTP/1.1
Host: simple-notes-server.herokuapp.com
Content-Type: application/x-www-form-urlencoded

name=<name>&email=<email>&password=<password>
```

###### Example Response (In JSON)

```json
{
    "status": "Success",
    "message": "User <name> registered!",
    "data": null
}
```

#### Login

```http
POST /api/users/login
```

Logins an existing user with the `name`, `email` and `password`.

##### Parameters

| Parameter | Data Type | Description                     | Required |
| --------- | --------- | ------------------------------- | -------- |
| email     | string    | Email of the registered user    | Yes      |
| password  | string    | Password of the registered user | Yes      |

###### Example Query (using HTTP)

```http
POST /api/users/login HTTP/1.1
Host: simple-notes-server.herokuapp.com
Content-Type: application/x-www-form-urlencoded

email=<email>&password=<password>
```

###### Example Response (In JSON)

```json
{
    "status": "Success",
    "message": "Welcome back <name>",
    "data": {
        "user": {
            "_id": "<unique_id>",
            "name": "<name>",
            "email": "<email>",
            "password": "<hashed_password>",
            "__v": 0
        },
        "token": "<token>"
    }
}
```

Save the token for later use.

### Note Services

All the services have the default headers `Content-Type: x-www-form-urlencoded` and `x-access-token: <token>`. The `token` will be generated when you log in. Also each request should be sent through the body with the above options (in Postman).

#### Create a new note

```http
POST /api/notes/new
```

Create a new note with a `heading` and `content`.

##### Parameters

| Parameter | Data Type | Description                    | Required |
| --------- | --------- | ------------------------------ | -------- |
| heading   | string    | The heading of your note       | Yes      |
| content   | string    | The content to be in your note | Yes      |

###### Example Query (using HTTP)

```http
POST /api/notes/new HTTP/1.1
Host: simple-notes-server.herokuapp.com
x-access-token: <token>
Content-Type: application/x-www-form-urlencoded

heading=<heading>&content=<content>
```

###### Example Response (In JSON)

```json
{
    "status": "Success",
    "message": "Note created!",
    "data": null
}
```

#### Search all notes

```http
GET /api/notes/all
```

Returns all the previously created notes.

##### Parameters

None required.

###### Example Query (using HTTP)

```http
GET /api/notes/all HTTP/1.1
Host: simple-notes-server.herokuapp.com
x-access-token: <token>
```

###### Example Response (In JSON)

```json
{
    "status": "Success",
    "message": "List found!",
    "data": {
        "notes": [
            {
                "id": "<unique_id>",
                "heading": "<heading>",
                "content": "<content>"
            },
            ...
        ]
    }
}
```

#### Search a note by ID

```http
GET /api/notes/:id
```

Returns a note with the given `id`.

##### Parameters

None required.

###### Example Query (using HTTP)

```http
GET /api/notes/:id HTTP/1.1
Host: simple-notes-server.herokuapp.com
x-access-token: <token>
```

###### Example Response (In JSON)

```json
{
    "status": "Success",
    "message": "Note found!",
    "data": {
        "notes": {
            "_id": "<unique_id>",
            "heading": "<heading>",
            "content": "<content>",
            "createdAt": "<date>", // Automatically created
            "updatedAt": "<date>", // Automatically created
            "__v": 0
        }
    }
}
```

#### Update an existing note with an ID

```http
PUT /api/notes/:id
```

Update the `content` of a note with a given `id`.

##### Parameters

| Parameter | Data Type | Description                            | Required |
| --------- | --------- | -------------------------------------- | -------- |
| content   | string    | The updated content to be in your note | Yes      |

###### Example Query (using HTTP)

```http
PUT /api/notes/:id HTTP/1.1
Host: simple-notes-server.herokuapp.com
x-access-token: <token>
Content-Type: application/x-www-form-urlencoded

content=<updated_content>
```

###### Example Response (In JSON)

```json
{
    "status": "Success",
    "message": "Note updated!",
    "data": null
}
```

#### Delete an existing note with an ID

```http
DELETE /api/notes/:id
```

Deletes a note with a given `id`.

##### Parameters

None required.

###### Example Query (using HTTP)

```http
DELETE /api/notes/:id HTTP/1.1
Host: simple-notes-server.herokuapp.com
x-access-token: <token>
```

###### Example Response (In JSON)

```json
{
    "status": "Success",
    "message": "Note deleted!",
    "data": null
}
```

## Database

MongoDB is used to store the notes.

### Users Schema

#### Name

- Type: `string`
- Required: true

#### Email

- Type: `string`
- Required: true

#### Password

- Type: `string`
- Required: true

### Notes Schema

#### Heading

- Type: `string`
- Required: true

#### Content

- Type: `string`
- Required: true