## MyBaseNextJs

Welcome to <link>MyBaseNextJs</link> APP, a <link>Next.js</link> app you can use as a simple template..

### Contact Information

- **Name**: <link>Eduardo Galindez Cintron</link>
- **Email**: <link>eduardo.galindez.cintron@gmail.com</link>

### Installation

Ensure you are using Node.js 22 (the repository includes an `.nvmrc` file you can use with `nvm use`).

To install the necessary dependencies, run the following command in your terminal(make sure to have npm installed on your device):

npm install

### Running the App

To run the Next.js app, use the following command:

npm run dev
This will start the development server and you can view the app in your browser at http://localhost:3000.
(make sure you are in the correct directory when running npm commands)

### Tech Stack

The tech stack for MyBaseNextJs includes the following libraries and frameworks:

- React
- Next.js
- TypeScript
- Tailwind CSS
- @heroicons/react
- xml2js
- csv-parse
- js-yaml

### Pages

MyBaseNextJs consists of the following pages:

- **Login**: Provides a mock authentication flow used to gate access to the rest of the app. Submit any email address and password to trigger the mocked API call, which stores a session in the in-memory `AuthProvider`. The page displays validation feedback for missing fields and automatically redirects authenticated users to the dashboard.
- **Dashboard**: This page contains four components:
  - Client and Promotion Feedback Information
  - Store Insights on Best Store and Best Product
  - Promotion Feedback Total
  - Table of All Transfers
- **Import Data**: This page allows the user to re-import the data to our tables using the default files provided in the server. It also includes a function to delete all data.

### APIs

MyBaseNextJs provides the following APIs that can be accessed using the 'api/' URL on the same domain:

### People Endpoints

- GET /api/person/all: Retrieve all <link>people</link>
- GET /api/person/:id: Retrieve a specific <link>person</link>
- POST /api/person/create: Create a new <link>person</link>
- PUT /api/person/:id: Update a specific <link>person</link>
- DELETE /api/person/:id: Delete a specific <link>person</link>

### Transactions Endpoints

- GET /api/transaction/all: Retrieve all <link>transactions</link>
- GET /api/transaction/:id: Retrieve a specific <link>transaction</link>
- POST /api/transaction/create: Create a new <link>transaction</link>
- PUT /api/transaction/:id: Update a specific <link>transaction</link>
- DELETE /api/transaction/:id: Delete a specific <link>transaction</link>

### Promotions Endpoints

- GET /api/promotion/all: Retrieve all <link>promotions</link>
- GET /api/promotion/:id: Retrieve a specific <link>promotion</link>
- POST /api/promotion/create: Create a new <link>promotion</link>
- PUT /api/promotion/:id: Update a specific <link>promotion</link>
- DELETE /api/promotion/:id: Delete a specific <link>promotion</link>

### Transfers Endpoints

- GET /api/transfer/all: Retrieve all <link>transfers</link>
- GET /api/transfer/:id: Retrieve a specific <link>transfer</link>
- POST /api/transfer/create: Create a new <link>transfer</link>
- PUT /api/transfer/:id: Update a specific <link>transfer</link>
- DELETE /api/transfer/:id: Delete a specific <link>transfer</link>

### Import Endpoints

- GET /api/import/all: Import data files on the server
- DELETE /api/import/all: Delete all data

### Insights Endpoints

- GET /api/insights/promotion: Get count of all yes and no responses for <link>promotions</link>
- GET /api/insights/store: Get the best selling store with revenue and best selling item with revenue
- GET /api/insights/transfer: Get all <link>transfers</link> with names instead of IDs
- GET /api/insights/userpromotion: Get all users with the list of <link>promotions</link> they have received and their responses

### Approach for Implementation

The implementation of <link>MyBaseNextJs</link> reflects a deliberate approach aimed at showcasing versatility, simplicity, and adaptability. Key decisions and methodologies include:

- **Choice of Next.js**: <link>Next.js</link> was chosen to demonstrate the ability to quickly learn and apply new languages. It was taken as a personal challenge to exclusively utilize <link>Next.js</link>, showcasing proficiency and dedication to mastery.

- **Tailwind CSS for Styling**: All CSS is created with <link>Tailwind CSS</link>, and no external component libraries were used. This decision allows for easy integration with client preferences and enables a tailored, cohesive visual presentation.

- **Data Storage**: A file is used to store data instead of a database. All data is normalized and stored in a JSON file, facilitating seamless import to the database of the client's choosing. This approach offers flexibility and ease of data management.

- **TypeScript for Type Definition**: <link>TypeScript</link> was employed for type definition, with the intention of aiding in data seeding and migration. This choice enhances code quality and provides comprehensive type safety.

- **Simplified Theme**: The theme was intentionally kept simple to enable easy customization, ensuring that clients can effortlessly tailor the app to their specific branding and design preferences.

- **Data Import and Deletion Functionality**: An import and delete function for all data was created for testing and to demonstrate the speed and efficacy of data analysis. This functionality underscores the app's agility and efficiency in handling data operations.

### Next Steps

- **Database Integration**: Consider using an actual database, such as SQL, to reduce the amount of code in the application. Utilizing SQL can streamline ID joins and data transformations, allowing for more efficient and maintainable code.

- **Refactor Endpoints**: Refactor endpoints to delegate data transformations and joins to SQL, enhancing the application's performance and readability.

- **Expand Data Conversion**: Expand the file reader XML conversion to accommodate other data types (currently limited to transforming transactions), enhancing the application's flexibility and usability.

- **Security Enhancement**: Implement back-end security, including authorization features and a login page, to control access and protect sensitive data within the application.

- **User Interface Improvements**: Apply a color scheme in accordance with the company's branding and consider adding a light-dark mode for improved user experience.

- **Data Visualization**: Consider using graph libraries as a way to visualize data, especially on the dashboard page. The components were designed to be simple and easy to understand, making it easy to integrate any graphic or table libraries for data visualization.
- **Mobile View Optimization**: Enhance the app's responsiveness to ensure an optimal user experience on mobile devices. This includes adapting the layout, font sizes, and interactive elements to provide a seamless and visually appealing experience for users accessing the app on smartphones and tablets.

In conclusion, these are personal recommended next steps for enhancing the application. They are not meant as strict guidelines, as the application is customizable enough to provide easy integration with your preferred system.

You can access the website by navigating to the following address in your web browser's address bar: [base-next-js-lemon.vercel.app/dashboard](https://base-next-js-lemon.vercel.app/dashboard).

### README Creation

The README was created with the help of AI to ensure a standardized, comprehensive, and user-friendly format, providing clear instructions and information for users and developers.

### License

This project is licensed under the terms of the <link>MIT license</link>.
