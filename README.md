# PROJECT-3-BACKEND

## Description
Task manager App, to be able to manage projects and be more organized.

## User Stories
- **homepage** - As a user I want to be able to access the user page.
- **signup** - As a user I want to sign up on the web page
- **login** - As a user I want to be able to log in
- **logout** - As a user I want to be able to log out
- **add project** - As a user I want to be able to add a new project.
- **edit project** - As a user I want to be able to edit the existing project.
- **delete project** - As a user I want to be able to delete the existing project.
- **add task** - As a user I want to be able to add a new task.
- **edit task** - As a user I want to be able to edit the existing task.
- **delete task** - As a user I want to be able to delete the existing task


## Server Routes (Back-end):
| **Method** | **Route**                     | **Description**                                              |                       
| ---------- | ----------------------------- | ------------------------------------------------------------ |
| `POST`     | `/api/auth/signup`            | Sends Sign Up info to the server and creates user in the DB. |                                                                             |
| `POST`     | `/api/auth/login`             | Sends user credential info to the DB and authenticates User. |                
| `POST`     | `/api/auth/logout`            | Destroys the user session.                                   | 
| `GET`      | `/api/auth/loggedin`          | Checks if the user is logged in.                             |
| `GET`      | `/api/projects`               | Projects list.                                               |
| `GET`      | `/api/projects/:id`           | Single project.                                              |
| `POST`     | `/api/projects`               | New project.                                                 |
| `PUT`      | `/api/projects/:id`           | Edit project.                                                |
| `DELETE`   | `/api/projects/:id`           | Deletes project.                                             |
| `POST`     | `/api/tasks`                  | New task.                                                    |
| `PUT`      | `/api/tasks/:id`              | Edit task.                                                   |
| `DELETE`   | `/api/tasks/:id`              | Delete task.                                                 |

## Models
User model

```
{
username: { type: String, required: true, unique: true },
password: { type: String, required: true, minlength: 3 },
email: { type: String, unique: true, lowercase: true, trim: true, required: true }
}
```

Project model

```
{
name: { type: String, required: true },
dueDate: { type: Date, default: Date.now() },
user: { type: Schema.Types.ObjectId, ref: 'User' }
}
```

Task model

```
{
name: { type: String, required: true },
done: { type: Boolean, default: false },
dueDate: { type: Date, default: Date.now() },
priority: { type: Boolean, default: false },
project: { type: Schema.Types.ObjectId, ref: 'Project' }
}
```

## Backlog
[See the Trello board.](https://trello.com/b/YN5H1ZH2/project-3)
## Links

### Git
The url to your repository and to your deployed project [Repository Link]() [Deploy Link]()
