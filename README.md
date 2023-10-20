# Activity

> **Warning** Buildoo website will be back soon because of the expected paid plan of Heroku!

Activity is an application written on ASP.NET Core and React. Here i have built a multi-project ASP.NET Core solution that is built using Clean Architecture and the CQRS and Mediator pattern.

Fullstack application with ASP.NET Core API and React with Typescript
=======
Fullstack application with only one role - User

## Used technologies:

-   HTML
-   CSS
-   TypeScript
-   React
-   Mobx
-   ASP.NET Core API
-   SQL Server
-   Postgre SQL server
-   Cloudinary
-   SendGrid
-   SignalR
-   Jest

## Project Structure

This is the structure of my project:

   - client application
      - public
      - src
          -  components
          -  contexts
          -  hooks
          -  pages
          -  Redux
          -  services
          -  App.js
          -  index.js

  - backend separated:
      - API
      - Application
      - Domain
      - Infrastructure
      - Persistence

## How to start the project

> **Note**
Before run the project, you have to configure .env files in API root folder:

You have to add:
- in backend folder:
    - Your database connection string
    - Cloudinary Username and Password
    - 

3. Open:

    - client-app folder and install node modules with the command: npm install
    - open API folder and run the command: dotnet watch run

    When node modules are downloaded start the project:

    - client-app : npm start
    - API : npm start

    The application will be running in:
      - development - `http://localhost:3000`
      - production - `http://localhost:5000`
