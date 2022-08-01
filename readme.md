# Stakr

> _Trello Clone_

- 'Stakr' is a kanban-style, list making application for you and your team to collaborate easily on your ideas. Create workspaces, boards, columns, and cards to organize your plans in one neat environment!

# Technologies & Tools

|                                                                        React                                                                        |                                                                        Redux                                                                         |                                                                                   Flask                                                                                   | SQLAlchemy                                                                                                                                                                                  |                                                                              PostgreSQL                                                                              |                                                                         Figma                                                                          |
| :-------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------: |
| <a href="https://reactjs.org/"><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' width="75" height="75" /></a> | <a href='https://redux.js.org/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="75" height="75" /></a> | <a href='https://flask.palletsprojects.com/en/2.1.x/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" width="75" height="75"/></a> | <div align="center"><a href='https://www.sqlalchemy.org/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-plain.svg" width="75" height="75" /></a></div> | <a href='https://www.postgresql.org/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="75" height="75" /></a> | <a href='https://www.figma.com/'><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" width="75" height="75"  /></a> |

### [Live link to Stakr](https://stakr-app.herokuapp.com/)

### [Link to the Stakr Wiki](https://github.com/Dave89rr/Stakr/wiki)

### [Stakr's Features](https://github.com/Dave89rr/Stakr/wiki/Features)

### [The Database Schema](https://github.com/Dave89rr/Stakr/wiki/Database-Schema)

## Development

### Want to contribute?

To fix a bug or add a feature, follow these steps:

- Fork the repository

- Create a new branch with git checkout -b feature-branch-name

- Make appropriate changes to the files and push back to github

- Create a Pull Request

  - Use a clear and descriptive title for the issue to identify the suggestion.

  - Include any relevant issue numbers in the PR body, not the title.

  - Provide a comprehensive description of all changes made.

## Setting Up and Starting a Local Server:

- Clone [the project](https://github.com/Dave89rr/Stakr.git).
- Create a DB and a DB User with ownership of the DB.
- Create a .env file using the .env.example provided in the project.
- cd into the fronted directory by running `cd frontend/` in your terminal then run `npm install`
- Now in the root directory run `install --python "$PYENV_ROOT/versions/3.9.4/bin/python"` followed by `pipenv shell`.
- Next you will need to set up your backend in your root terminal run `flask db migrate` followed by `flask db upgrade` and finally `flask seed all`.
  - You can now run the command `flask run` and your backend will start up connected to an already seeded database.
- Now that your backend is up and running you can open a second terminal and run `cd frontend/` followed by running `npm start`
  - This will atomatically start the application on localhost:3000 unless you have something already running on that port.

## Bugs

We love squishing bugs! If you find one, let us know by opening an issue [here](https://github.com/Dave89rr/Stakr/issues). Be sure to be clear in the description of the bug (i.e. what was input into the field that caused the bug, or where you were/ what you were doing at the time you spotted the bug). Screenshots or recordings greatly help to narrow down what the problem could be!

## Stakr in action!
### Signup process
![2022-07-31-22-12-41](https://user-images.githubusercontent.com/100805072/182061161-87b79bb0-6309-4f3e-9ca0-7b772e04c66c.gif)

### Creating boards
![2022-07-31-22-14-39](https://user-images.githubusercontent.com/100805072/182061254-c0d8b3e2-23da-451d-87fc-298ebafa0409.gif)

### Creating stacks
![2022-07-31-22-15-54](https://user-images.githubusercontent.com/100805072/182061279-82d89134-c0ec-479f-9bad-0b2a122c7a39.gif)

### Creating cards
![2022-07-31-22-16-39](https://user-images.githubusercontent.com/100805072/182061330-7eed74b0-902e-4544-93de-bd2b50620347.gif)

### Creating another workspace
![2022-07-31-22-17-24](https://user-images.githubusercontent.com/100805072/182061377-713e5c0d-6f80-42c5-9d94-bd10e02ebef8.gif)

### Editing a card
![2022-07-31-22-21-14](https://user-images.githubusercontent.com/100805072/182061413-87c69488-10f7-4845-b62f-248d0c17c450.gif)

## Created By

[Brandon Flores](https://github.com/brandonflores647), [David Rivera](https://github.com/Dave89rr), and [Justin Stockton](https://github.com/Justin-Stockton)
