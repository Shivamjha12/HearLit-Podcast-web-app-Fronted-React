# Podcast Web App

Welcome to the Podcast Web App! This web application allows users to explore, listen to, and manage their favorite podcasts. Users can create an account, login using a JWT token, search for podcasts, add them to their bucket list, like podcasts, create and edit their own podcasts, and check their podcasts in their console.

 Currently hosted on -> https://hear-lit-podcast-web-app-fronted-react.vercel.app/
## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **Account Creation:** Users can create their own accounts to access the features of the web app.
2. **JWT Token Authentication:** Login functionality is implemented using JWT token authentication for secure access to the website.
3. **Podcast Search:** Users can search for podcasts on the website by using keywords or specific filters.
4. **Bucket List:** Users can add their favorite podcasts to a bucket list for easy access and management.
5. **Podcast Like:** Users can like podcasts they enjoy, allowing them to keep track of their favorite shows.
6. **Create and Edit Podcasts:** Users have the ability to create and edit their own podcasts, adding content and making changes as desired.
7. **Console Podcast Check:** Users can check their podcasts in their console, allowing for easy monitoring and debugging.

## Getting Started

To get started with the Podcast Web App, follow the instructions below.

### Prerequisites

- Node.js (version >= 12.0.0)
- npm (version >= 6.0.0)
- MongoDB (version >= 3.0.0)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/podcast-web-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd podcast-web-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables to the `.env` file:

   ```plaintext
   JWT_SECRET=your-secret-key
   MONGODB_URI=mongodb://localhost:27017/podcast-web-app
   ```

   Replace `your-secret-key` with a secure secret key for JWT token generation and `mongodb://localhost:27017/podcast-web-app` with the connection string to your MongoDB database.

## Usage

1. Start the application:

   ```bash
   npm start
   ```

2. Open your web browser and navigate to `http://localhost:3000` to access the Podcast Web App.

3. Follow the user interface to create an account, login, search for podcasts, add them to your bucket list, like podcasts, create and edit your own podcasts, and check your podcasts in the console.

## Contributing

We welcome contributions from the community! If you find any issues or want to enhance the Podcast Web App, please submit a pull request. Make sure to follow the existing code style and include relevant tests.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to modify and distribute it as per your needs.
