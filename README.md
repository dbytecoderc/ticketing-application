## Description

The **Ticketing-application** is an application that facilitates the process of creating tickets. The project was built with typescript using the **[Nest](https://github.com/nestjs/nest)** framework.

- Key Application features

1. Favorite Management
   - Creation of Events
   - Editing of different events
   - Deleting an event
   - Retrieving an event
   - Retrieving all events

## Technology Stack

- Typescript
- NestJs
- Postgres

### Setting Up For Local Development

- Make sure nodejs is installed using the command:

  ```
  node -v
  ```

- If you don't have nodejs installed follow this **[link](https://nodejs.org/en/)** to install nodejs

* Clone the repository:

  ```
  git clone https://github.com/dbytecoderc/ticketing-application.git
  ```

* Navigate into the project directory and install the dependencies:

  ```
  cd ticketing-application

  npm install
  ```

* Setup environment variables using the .env.example file as a guide:

- Start the application using the command:

  ```
  npm run start:dev
  ```

### Test the application with the following graphql queries

- To register a user on the platform use:

  ```
  mutation{
    register(data: {
      email: "oparahdc@gmail.com", password: "password", name: "DC"}){
      message{
        message
        status
      }
      user{
        id
        email
        name
        isActive
      }
      token
    }
  }
  ```

- To authenticate a user use:

  ```
  mutation{
    login(data: {email: "oparahdc@gmail.com", password: "password"}){
      message{
        message
        status
      }
      user{
        id
        isActive
      }
      token
    }
  }
  ```

### The following graphql queries would need Bearer token header attched to the request to work

- To create an event use:

  ```
  mutation{
    createEvent(data: {event_title: "New event", start_time: "2020-12-19T06:01:17.171Z", end_time: "2020-12-19T06:01:17.171Z"}){
      message{
        message,
        status
      }
      event{
        event_title
      }
    }
  }
  ```

- To retrieve all events use:

  ```
  query{
    allEvents{
      event_title
      start_time
      end_time
      isActive
    }
  }
  ```

- To retrieve a single event use:

  ```
  query{
    event(id: "d4573f7a-737a-49e9-ad25-895bdc99fcaa"){
      id
      event_title
      start_time
      end_time
    }
  }
  ```

- To update a single event use:

  ```
  mutation{
    updateEvent(data: {
      id: "f69c6a31-72c4-445f-ba9d-f1548f0a5e6b", event_title: "updated title", start_time: "2020-12-19T06:01:17.171Z", end_time: "2020-12-19T06:01:17.171Z"}){
      event_title
    }
  }
  ```

- To delete a single event use:

  ```
  mutation{
    deleteEvent(id: "f69c6a31-72c4-445f-ba9d-f1548f0a5e6b"){
      message
    }
  }
  ```

### DB schema

![Entity relationship diagram](https://github.com/dbytecoderc/ticketing-application/blob/develop/ticketing%20app.png)
