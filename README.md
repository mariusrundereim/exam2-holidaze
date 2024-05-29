# Holidaze Exam

![Tux, the Linux mascot](/assets/images/tux.png)

## Brief

A newly launched accommodation booking site called Holidaze has approached you to develop a brand new front end for their application. While they have a list of required features, the design and user experience has not been specified. Working with the official API documentation, plan, design and build a modern front end accommodation booking application.

There are two aspects to this brief: the customer-facing side of the website where users can book holidays at a venue, and an admin-facing side of the website where users can register and manage venues and bookings at those venues

## User Stories

1. A user may view a list of **Venues**
2. A user may search for a specific **Venue**
3. A user may view a specific **Venue** page by **id**
4. A user may view a calendar with available dates for a **Venue**
5. A user with a **stud.noroff.no** email may register as a customer
6. A registered customer may create a booking at a **Venue**
7. A registered customer may view their upcoming bookings
8. A user with a **stud.noroff.no** email may register as a **Venue** manager
9. A registered **Venue** manager may create a **Venue**
10. A registered **Venue** manager may update a **Venue** they manage
11. A registered **Venue** manager may delete a **Venue** they manage
12. A registered **Venue** manager may view bookings for a **Venue** they manage
13. A registered user may login
14. A registered user may update their avatar
15. A registered user may logout

## API Documentation

- [Noroff API](https://docs.noroff.dev/docs/v2)
- [Swagger](https://v2.api.noroff.dev/docs/static/index.html)

## Stack

- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Mantine](https://mantine.dev/)

## Install

Get started with this project, clone the repository and install the dependencies.

Then, you can run the application in development mode:

```bash
https://github.com/mariusrundereim/exam2-holidaze.git
```

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run test
```

or open automatically 😎

```bash
npm run dev --open
```

## Important for new users

### Whitelist

- For new users have to add `holidaze` in the ends of your venue title. (since I am using Redux Middleware whitelist on owners.)

### 2-side application

- Venue manager can only create a venue.
- Customer can only book on a venue.

## Extra features

- Home: Venues filtered dynamically for next national day (Norway, Sweden, Denmark, Finland)
- Home: Venues filter customer with small budget
- Home: Venues filter customer with family size and picky teenagers who require internet connection
- Home: Venues filter customer travel with pets
- Create venue: Autoselect country by selecting city
- Format the date and currency to Norwegian

## See Live

Check out the application on Netlify

[Holidaze](https://holidaze-exam2.netlify.app/)
