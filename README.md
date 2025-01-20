# User Management System (UMS) - Full-Stack-Project

# Backend

Welcome to the **User Management System (UMS)** backend! This project provides a simple RESTful API to manage user data. It includes CRUD functionalities and validation with **Spring Boot** and an **H2 in-memory database**. The goal is to manage users and provide backend services for the frontend.

---

## 🏛 High-Level Architecture

### 1. **Frontend and Backend Separation**
- The backend provides a set of REST APIs for user management that can be consumed by a **frontend application** (yet to be built).

### 2. **Backend Components**
- **Java**: The application is built using Java 21 for development.
- **Spring Boot**: The application is built using Spring Boot 3.4.1.
- **Maven**: The application is built using Maven 4.0.0.
- **Spring Data JPA**: Used for data persistence and database interactions.
- **H2 Database**: A lightweight, in-memory database for development.
- **CORS**: Configured to allow cross-origin requests from the frontend.

---

## 📋 Setup Instructions

### 🛠 **Backend Setup (Spring Boot)**

#### 🧑‍💻 **Prerequisites**
- **Java 21** (or compatible)
- **Maven**
- **IDE** (e.g., IntelliJ IDEA, Eclipse)

#### Steps to Set Up the Backend

1. **Clone the repository**:
    ```bash
    git clone https://github.com/kubrabicak/ums.git
    cd ums
    ```

2. **Build the project**:
    ```bash
    mvn clean install
    ```

3. **Run the project**:
   Run the Spring Boot application:
    ```bash
    mvn spring-boot:run
    ```

4. **Access the H2 console**:
   To inspect the database, open the H2 console at:
    ```
    http://localhost:8080/h2-console
    ```
    - **JDBC URL**: `jdbc:h2:mem:ums-db`
    - **Username**: `sa`
    - **Password**: `password`

---

## 🧑‍💻 Example API Usage

### Get All Users
**GET** `/api/users`

#### Response OK

### Create User
**POST** `/api/users`

#### Valid Request:
 ```
{
    "fullName": "Harry Potter",
    "displayName": "Harry P.",
    "email": "harry@ptter.com",
    "details": "Harry Potter And The Goblet Of Fire."
}
 ```
#### Response OK

#### Invalid Request (Full name is empty and email is not valid):
 ```
{
    "fullName": "",
    "displayName": "Harry P.",
    "email": "harry",
    "details": "Harry Potter And The Goblet Of Fire."
}
 ```
#### Response:
 ```
{
    "error": "VALIDATION_ERROR",
    "message": "Full name must not be empty, Email must be valid"
}
 ```

### Update User
**PUT** `/api/users/{id}`

#### Valid Request:
 ```
 {
    "fullName": "John Wick Updated",
    "displayName": "John W. Updated",
    "email": "updated.john@wick.com",
    "details": "Updated description."
 }
 ```
#### Response OK

#### Invalid Request (email is not valid):
 ```
{
    "fullName": "John Wick Updated",
    "displayName": "John W. Updated",
    "email": "updated",
    "details": "Updated description."
 }
 ```
#### Response:
 ```
{
    "error": "VALIDATION_ERROR",
    "message": "Email must be valid"
}
 ```

### Delete User
**DELETE** `/api/users/{id}`

#### Response OK

---

## 📦 Packages & Libraries Used

- **Spring Boot**: The foundation of the backend RESTful API.
- **Spring Data JPA**: For database interactions and data persistence.
- **H2 Database**: Lightweight, in-memory database for testing.
- **Lombok**: Reduces boilerplate code (e.g., getters/setters).
- **Spring/Jakarta Validation**: For user input validation.
- **Spring Web**: For building and exposing REST APIs.
- **Hibernate**: For building and exposing REST APIs.

---

## ⚙️ Development Insights

## 🧠 Thought Process

- **API Design**:
    - The backend was needed to deliver essential user management functionalities while maintaining modularity for scalability and maintainability.
    - Each layer of the application (Controller, Service, Repository) follows the **Separation of Concerns** principle for better organization and future extensibility.

- **Validation**:
    - Utilized Jakarta Validation annotations (`@NotEmpty`, `@Email`) on the `User` entity to enforce input validation, ensuring only valid data is persisted.

- **Database**:
    - Used **H2 in-memory database** for development and testing. It eliminates external dependencies and simplifies testing, especially with tools like `@DataJpaTest`.

- **Cookie Management**:
    - Implemented a feature to calculate the total number of users in the database and store it in a cookie named `RABO_USERS`. This cookie is:
        - **Frontend-Accessible**: Set with `HttpOnly=false` to allow Angular to read it.
        - **Temporary**: Expiry set to 1 day (`Max-Age = 24 * 60 * 60`).
        - Added as part of the response from the get `/users` API endpoint.

- **JSON File**:
    - Used a `users.json` file and placed it under `resources` to load initial data during application startup, ensuring the database is populated automatically without manual intervention.

- **REST API**:
    - Designed RESTful endpoints for user-related operations, adhering to REST principles for predictability and consistency. Used `ResponseEntity` to return both data and HTTP status codes.

- **Error Handling**:
    - A global exception handler ensures consistent error responses. It captures common issues like validation failures (`@Valid` errors) and internal server errors, returning meaningful error messages with appropriate HTTP status codes.

---

## 🛠 Future Improvements

- **Pagination**: Add pagination support for large datasets when retrieving users.
- **Authentication & Authorization**: Implement JWT-based authentication and authorization.
- **Error Handling**: Improve error responses by adding error codes for different scenarios.
- **Data Loading in Production**: Transition to using a solution for data loading in production environments. Instead of loading data at every startup, use a database migration tool such as Liquibase to manage schema changes and initial data population in a controlled and versioned manner. This ensures data integrity and avoids accidental overwrites during application restarts.
---

## ⚡ Challenges Faced & Solutions

### 🔧 Challenges

1. **Data Loader**
    - The challenge was to implement a service that could reliably load user data from a JSON file (`users.json`) into the database during application startup. The service needed to handle cases such as:
        - The file being missing or empty.
        - Data parsing errors.
    - Additionally, the database needed to be repopulated on each application start. This required ensuring that the application always started with a consistent state.

2. **Unit Test for Data Loader**
    - The primary difficulty in unit testing the `UserDataLoaderService` was mocking the `users.json` file. By default, the service always read data from the actual JSON file located in the classpath. This made it impossible to test scenarios with mock data effectively, as the service ignored the setup in the test and consistently used the file contents.
    - Specifically, the test case to verify the behavior when the file contained mock users failed repeatedly because the service would still load the actual data from the JSON file. As a result, assertions such as verifying specific mock data being saved to the repository did not pass.

---

### 🛠 Solutions

1. **Data Loader**
    - The `UserDataLoaderService` was designed with in mind, ensuring it could handle a variety of scenarios:
        - **File Validation**: The service checks for the existence of the `users.json` file in the classpath. If the file is missing, it logs a warning and skips the data loading process.
        - **Data Parsing**: Using the `Jackson ObjectMapper`, the JSON data is parsed into a list of `User` objects. This approach ensures flexibility and compatibility with different data structures.
        - **Error Handling**: Any exceptions (e.g., missing file, parsing errors) are caught and logged to avoid crashing the application during startup.
        - **Database Persistence**: Successfully parsed user data is saved to the database via `userRepository.saveAll()`.
        - **Database Repopulation**: `@PostConstruct` Marks the method to be called automatically once the UserDataLoaderService bean is created and all its dependencies are injected.
          This ensures the user data is loaded into the database before the application fully starts serving requests.
      

2. **Unit Test for Data Loader**
    - To resolve the testing issue, a **spy** was used on the `UserDataLoaderService`. Unlike plain mocking, which could not intercept the behavior of internal methods, a spy allowed partial mocking of the class. This approach enabled precise control over the method responsible for reading data from the JSON file (`readUsersFromJson()`), while keeping the rest of the service logic intact.
    - Key aspects of the solution:
        - **Mocking Internal Behavior**: The `readUsersFromJson()` method was mocked to return controlled mock data instead of reading from the actual file. This ensured that tests could simulate different file contents without relying on the physical `users.json` file.
        - **Edge Case Testing**: The spy allowed the creation of tests for scenarios like missing files (mocking an empty list) or valid data (mocking a list of `User` objects), validating the service's behavior in each case.
        - **Reliable Assertions**: By controlling the behavior of the data-reading method, the tests could reliably verify interactions with the repository, such as ensuring `saveAll()` was called with the expected mock data.

    - This approach resolved the issue effectively, enabling the creation of robust and reliable tests for the `UserDataLoaderService` without compromising the class's internal structure or functionality.

---

## 💡 Conclusion

This backend solution provides user management capabilities and lays a solid foundation for further enhancements. It’s designed to be easy to extend and integrate with a frontend. With proper validation, error handling, and clean architecture, this project serves as a scalable base for any user-centric application.

# Frontend (Angular 17)

This project is a Angular 17 application for managing user data. It interfaces with a RESTful backend API to perform CRUD operations, including user creation, update, deletion, and search functionality. It leverages Angular's latest features, such as standalone components, signals, and built-in control flow blocks.

---

## 📋 High-Level Architecture

The application is structured around modern Angular principles:

- **Standalone Components**: Enhancing modularity and reusability.
- **Services**: Centralized API interaction and error handling.
- **Pipes**: Custom utilities for UI transformations (e.g., `TitleCasePipe`, `UserFilterPipe`).
- **Directives**: Custom logic encapsulation (e.g., `HighlightRowDirective`).
- **Interceptor**: A centralized HTTP error handling mechanism.
- **Material Design**: Utilizes Angular Material for a clean and responsive UI.

---

## 🚀 Project Setup

### Backend Setup

1. Clone the repository.
2. Follow the [backend setup guide] to configure and start the API server.
3. Ensure the API is running on `http://localhost:8080`.

### Frontend Setup

1. Go to angular directory and install dependencies:
```bash
      npm install
```
2. Start the development server:
```bash
      ng serve
```
or
```bash
      npm start
```
3. Open the app in your browser at http://localhost:4200.


## ⚙️ Development Insights

## Thought Process 

### Goals
- Build a user-friendly interface.
- Utilize Angular 17's latest features to enhance maintainability and performance.
- Prioritize modular design to allow for easier future scalability.

### Key Decisions and Implementations

1. **Notification System**
    - **Goal**: Provide real-time feedback for important errors received from the backend.
    - **Implementation**:
        - A centralized `ErrorHandlingService` was created to handle error notifications.
        - Notifications are dynamically rendered in the DOM with a close button and auto-dismiss functionality (implemented via Angular `Renderer2`).
        - Notifications can be tested by attempting to add or update a user with an invalid email syntax.

2. **Custom Directive**
    - **Goal**: Highlight rows in the user table when users are added or updated.
    - **Implementation**:
        - The `HighlightRowDirective` dynamically applies a CSS class to rows based on input conditions.
        - Used for marking recently added or updated rows, with a timeout to remove the highlight after 3 seconds.

3. **Custom Pipe**
    - **Goal**: Enhance user data presentation and implement search functionality.
    - **Implementation**:
        - **`TitleCasePipe`**: Formats user full names to title case.
        - **`UserFilterPipe`**: Filters the user list by matching the `fullName` or `email` properties with the search term (case-insensitive).

4. **Angular Signals**
    - **Goal**: Maintain a reactive user list that dynamically updates on CRUD operations.
    - **Implementation**:
        - Used Angular's `signal` feature in `UserListComponent` to manage and update the user list in real-time.
        - This ensures the UI reacts immediately to user addition, modification, or deletion.

5. **Standalone Components**
    - **Goal**: Simplify the architecture and promote reusability.
    - **Implementation**:
        - All components (e.g., `AppComponent`, `UserListComponent`, `UserAddComponent`) are standalone and explicitly declare their imports, reducing dependencies.
        - Also applied to pipes and directives, promoting modular design.

6. **Error Handling**
    - **Goal**: Provide meaningful feedback for errors like validation issues or server failures.
    - **Implementation**:
        - An HTTP interceptor (`httpErrorInterceptor`) was created to handle HTTP errors globally.
        - Displays user-friendly error messages for various HTTP status codes (e.g., 400, 401, 404).

7. **Table View**
    - **Goal**: Present the user list in a clean and interactive format.
    - **Implementation**:
        - Used Angular Material's `MatTableModule` to create a responsive table displaying user data.
        - Configured with sortable columns and an action column for modifying users.

8. **User Details View**
   - **Goal**: Allow users to view detailed information in a focused layout.
   - **Implementation**:
      - A `MatDialog` component (`UserDetailsComponent`) displays user details in a modal.
      - Opens when a user entry in the table is clicked.

9. **Data Modification**
   - **Goal**: Enable the addition, editing, and deletion of users.
   - **Implementation**:
      - **Adding Users**: The `UserAddComponent` dialog collects user details via a reactive form and sends the data to the backend.
      - **Editing Users**: The `UserUpdateComponent` dialog allows modifying existing user details.
      - **Deleting Users**: Implemented via a delete button in the action column that sends a DELETE request to the backend.

10. **Search Functionality**
  - **Goal**: Allow filtering users by name or email for easier navigation.
  - **Implementation**:
    - A search bar in `UserListComponent` is bound to a two-way data binding variable (`searchTerm`).
    - The user list is filtered using the `UserFilterPipe`, ensuring real-time updates.

11. **Required Fields**
- **Goal**: In the "Add" and "Update" user forms, required fields must be filled before saving the form.
- **Implementation**:
   - The form for adding and updating a user has the following required fields: Full Name, Display Name, and Email.
   - The `required` attribute and Angular's built-in validation (`ngModel`) ensure that the Display Name field cannot be left empty before the form is saved.

---

## 📦 Use of Additional Packages and Libraries
- **Angular Material**: For UI components like tables, dialogs, and buttons.
- **RxJS**: For handling asynchronous operations with observables.
- **Angular CDK**: For accessibility and custom behaviors.
- **FormsModule & ReactiveFormsModule**: For form handling and validation.
- **Karma**: For unit testing.

---

## 🔧 Challenges Faced & Solutions

### 1. Dynamic User List Updates
- **Challenge**: Keeping the user list reactive to CRUD operations.
- **Solution**: Implemented Angular signals for real-time state updates.

### 2. Highlighting Row Updates
- **Challenge**: Highlighting recently added or updated rows in the table.
- **Solution**: Developed a custom directive (`HighlightRowDirective`) to apply styles dynamically.

### 3. Error Handling
- **Challenge**: Providing meaningful feedback for various error scenarios.
- **Solution**: Created an HTTP interceptor to centralize error handling and display notifications using the `ErrorHandlingService`.

---

## 🔮 Potential Future Improvements
1. **Pagination**: Implement server-side pagination for the user list.
2. **Role-based Access Control**: Add user roles to restrict certain operations.
3. **Unit Testing**: Increase test coverage for services and components.
4. **Reusable Forms**: The "Add User" and "Update User" forms currently share a lot of similarities in structure and behavior. To improve maintainability, we can refactor both forms into a single shared HTML template.

