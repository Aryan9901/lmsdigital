# LMS DIGITAL PORTFOLIO

## Table of Contents

- [Screenshots](#Snapshots)
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Schema Diagram](#schema-diagram)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)

A Digital Portfolio Using MERN with ADMIN PANEL.

[Watch Demo](https://youtu.be/N8G1eA73mV8)

## Snapshots
#### home page
![UI-community](https://github.com/Aryan9901/lmsdigital/blob/master/resources/homepage.png?raw=true)
#### home hero page
![UI-community](https://github.com/Aryan9901/lmsdigital/blob/master/resources/homehero.png?raw=true)
#### about page
![UI-community](https://github.com/Aryan9901/lmsdigital/blob/master/resources/about.png?raw=true)
#### contact page
![UI-community](https://github.com/Aryan9901/lmsdigital/blob/master/resources/contactpage.png?raw=true)
#### services page
![UI-community](https://github.com/Aryan9901/lmsdigital/blob/master/resources/servicespage.png?raw=true)
#### View user's admin panel
![UI-community](https://github.com/Aryan9901/lmsdigital/blob/master/resources/ADMINPANEL.png?raw=true)
#### View contacts admin panel
![UI-community](https://github.com/Aryan9901/lmsdigital/blob/master/resources/ADMINCONTACTS.png?raw=trueD)
#### view, add new or edit services admin panel
![UI-community](https://github.com/Aryan9901/lmsdigital/blob/master/resources/SERVICEADMIN.png?raw=true)

## Project Overview

The Project is a General Digital Profile of Me built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It incorporates two major features: a content management system using Admin Panel and context-based authentication and authorization.  These features are accompanied by common functionalities found in Digital Profile applications, such as User login and logout, contacting the admins, and exploring the profile, while the admin can see contacts messages on the admin panel, add new services, update services or delete them, Admin can also modify user privileges and many more.

### Content Management System

The Admins have privileges to maintain the users of the website. the admins will have the following privileges:

- Read or change user data: Admins can change the user's role and also see their contact details while also securing their password using bcryptjs.
- read contact messages sent by users on the admin panel of the website.
- Admins can view, update existing services, or add new services.

Only users who are admin can only access the admin panels and admins have privileges to change other user privileges.

### Authorization and Authentication

The application implements authentication and authorization using JSONWEBTOKEN.

In case of a suspicious login attempt, users are promptly notified via email and are required to confirm their identity to protect against unauthorized access.

### User Roles

There are two distinct user roles within the system:

1. Admin: The admin role manages the overall system, including moderator management, community management, content moderation, monitoring user activity, and more.
2. General Users: General users have the ability to send messages to admins, view services, admin details. etc



## Features

- [x] User authentication and authorization (JWT)
- [x] User profile creation and management
- [x] Content moderation
- [x] Admin dashboard
- [x] Contact ADMINS

## Technologies

- React.js
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt.js
- React Context API

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- MongoDB or MongoDB Atlas account

### Installation

1. Clone the repository

```bash
gh repo clone Aryan9901/lmsdigital
```
2. Go to the project directory and install dependencies for both the client and server

```bash
cd client
npm install
```

```bash
cd server
npm install
```

3. Create a `.env` file in both the `client` and `server` directories and add the environment variables as shown in the `.env.example` files.
4. Start the server

```bash
cd server
npm start
```

5. Start the client

```bash
cd client
npm run dev
```


#### `.env` Variables

For email service of context-based authentication, the following variables are required:

```bash
MONGODB_URI=
JWT_SECRET_KEY=
FRONTEND_URL=
HOSTNAME=
```

## Usage

### Admin

The admin dashboard can be accessed at the `/admin` route. The admin account can be used to manage users and perform other admin-related tasks.

#### Demo
https://youtu.be/Tmncayg7FeU

## License

