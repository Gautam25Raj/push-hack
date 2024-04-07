# Push Meets

<img src="https://github.com/Gautam25Raj/push-hack/assets/63155224/7fcf1215-a5e8-431b-988e-041cae51acea" alt="Data Sync Logo" width="80" height="80">

Push Meets is a cutting-edge web application built around the push protocol, offering seamless wallet-to-wallet video calls and real-time communication features. With Push Meets, users can effortlessly connect with their wallets, initiate video calls, create instant meetings, schedule future meetings, manage contacts, and engage in real-time chat conversations, all within a secure and user-friendly environment.

## Features

### Wallet-to-Wallet Video Calls

- **Secure Connectivity**: Users can connect with their wallets securely to initiate wallet-to-wallet video calls.
- **High-Quality Video**: Enjoy high-quality video calls for crystal-clear communication and collaboration.
- **Push SDK Integration**: Leveraging the Push SDK ensures reliable and efficient video call functionality.
  ![image](https://github.com/Gautam25Raj/push-hack/assets/63155224/da93d819-66dc-41be-83b3-6be1100a8acd)

### Instant Meetings

- **On-the-Fly Collaboration**: Create instant meetings for immediate collaboration needs, enabling users to connect instantly.
- **Flexible Scheduling**: Users have the flexibility to schedule meetings for the current time or at a later date and time.
- **Effortless Setup**: Initiate meetings with ease, whether for impromptu discussions or planned sessions.
  ![image](https://github.com/Gautam25Raj/push-hack/assets/63155224/7d147250-91e1-4bc3-8b7b-ec9aed9f08b4)

### Contact Management

- **Add and Manage Contacts**: Users can add and manage contacts within the application, facilitating streamlined communication.
- **Accept Requests**: Accept incoming contact requests to expand your network and enhance collaboration opportunities.
  ![image](https://github.com/Gautam25Raj/push-hack/assets/63155224/b035616a-f667-4fa9-a0a7-5e9276796559)

### Real-Time Chat

- **Seamless Communication**: Engage in real-time chat conversations during video calls, allowing for additional context and collaboration.
- **Push SDK Integration**: Real-time chat functionality is seamlessly integrated using the Push SDK, ensuring smooth communication.
  ![image](https://github.com/Gautam25Raj/push-hack/assets/63155224/610d3939-188f-477b-9702-b0bea5a312a9)

## Getting Started

To get started with Push Meets, follow these steps:

1. **Clone the Repository**: Clone the Push Meets repository to your local machine:

    ```bash
    git clone https://github.com/Gautam25Raj/push-hack
    ```

2. **Install Dependencies**: Navigate to the project directory and install dependencies using npm or yarn:

    ```bash
    npm install
    cd server
    npm install
    ```

3. **Configure Environment Variables**: Set up environment variables required for the application. Refer to the provided `env` example below for details.

4. **Start the Development Server**: Start the development server by running the following command:

    ```bash
    cd server
    npm start
    ```

5. **Access Push Meets**: Once the server is running, access Push Meets in your web browser at the specified localhost URL.

## Project Structure

### Client: frontend

- **app**: Contains Next.js folder routes for the frontend.
- **components**: Houses frontend components used in the application.
- **hooks**: Stores custom React hooks utilized throughout the frontend.
- **providers**: Holds custom provider components such as `AuthProvider`, `ReduxProvider`, etc.
- **public/assets**: Contains images and other static assets used in the frontend.
- **redux**: Houses Redux store configuration and slices for state management.
- **tailwind.config.js**: Configuration file for Tailwind CSS.

### Server: backend

- **config**: Contains database configuration files.
- **controllers**: Houses backend route controllers for handling requests.
- **middleware**: Stores backend middleware functions.
- **models**: Contains MongoDB models for data schema definition.
- **routes**: Houses all backend route definitions.
- **utils**: Contains utility functions used in the backend code.
- **server.js**: Entry point for the backend server.
- **test.js**: Contains tests for backend functionality.

## Usage Examples

### Onboarding to Push Meets

#### Connect Wallet

To connect your wallet to Push Meets, follow these steps:

1. Navigate to the Push Meets website.
2. Click on the "Connect Wallet" button.
   ![image](https://github.com/Gautam25Raj/push-hack/assets/63155224/74b81426-f362-4d20-bf24-45e406822fcf)

#### Initialize Push (Sign Message)

To initialize Push and sign a message for authentication, follow these steps:

1. After connecting your wallet, click on the "Initialize Push" option.
   ![image](https://github.com/Gautam25Raj/push-hack/assets/63155224/8766faeb-b670-42de-bede-28d2481e1c20)

2. Sign the message using your wallet's authentication method.
3. Push Meets will verify the signed message and authenticate your wallet.

### Creating a Meeting

To create a meeting on Push Meets, follow these steps:

1. ![image](https://github.com/Gautam25Raj/push-hack/assets/63155224/2d74ab86-59e3-468b-8cb6-16750557bef1)
2. Select the contacts you want to invite to the meeting.
   ![image](https://github.com/Gautam25Raj/push-hack/assets/63155224/53b6d64f-f253-49cf-9e7e-16ac9dec003a)

3. Fill out the meeting form with the desired date and time.
4. Click on the "Create Meeting" button to finalize the process.

### Creating an Instant Meeting

To create an instant meeting on Push Meets, follow these steps:

1. Enter the recipient's wallet address.
2. Toggle the option to create an instant meeting.
  ![image](https://github.com/Gautam25Raj/push-hack/assets/63155224/575ba4ce-a417-4966-be6a-b39755b2cfe1)
3. Click on the "Create Meeting" button to initiate the instant meeting.

### Editing or Deleting a Meeting

To edit or delete a meeting on Push Meets, follow these steps:

1. Navigate to the meeting you want to edit or delete.
   ![image](https://github.com/Gautam25Raj/push-hack/assets/63155224/45ad806b-dde3-4d14-8be1-d3ddba190a4d)

2. Click on the three-dot menu icon associated with the meeting.
   ![image](https://github.com/Gautam25Raj/push-hack/assets/63155224/f37025e9-ea0f-46db-8baf-e198a2f038d6)

3. Select the appropriate option to edit or delete the meeting.
  ![image](https://github.com/Gautam25Raj/push-hack/assets/63155224/8d556725-c94f-4f7a-8adb-fb08efc2bc42)
   
4. Follow the on-screen prompts to make changes or confirm deletion.

By following these usage examples, users can seamlessly navigate Push Meets and leverage its features for efficient collaboration and communication.

## Environment-Variables

### Frontend (Client)

- **NEXT_PUBLIC_BACKEND_URL**: The URL of the backend server used by the frontend. Ensure it points to the correct route on the backend.

## Contributing

We welcome contributions from the community! If you'd like to contribute to Push Meets, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

Special thanks to the creators of the Push SDK for enabling real-time communication features in Push Meets.

