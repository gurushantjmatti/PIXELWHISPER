authentication flow:

1. High-Level Overview
The process relies on creating a signed token (JWT) when a user registers or logs in. This token, which contains the user's unique ID, is sent to the client and stored as an HTTP cookie. For any subsequent request to a protected part of the API, the client's browser automatically sends this cookie back. A special middleware on the server then intercepts the request, validates the token, and if it's valid, identifies the user and allows the request to proceed.

2. User Registration
This is the entry point for a new user.

Route: A POST request to /api/auth/register.
File: d:\PixelWhisper\src\routes\auth.routes.js directs this request to the registerController.
Logic: The registerController in d:\PixelWhisper\src\controllers\auth.controller.js handles the business logic:
It takes the username and password from the request body.
It checks if a user with that username already exists to prevent duplicates.
It securely hashes the password using bcrypt.hash(). This is a crucial security step to avoid storing plain-text passwords.
A new user is created in the database.
A JWT is generated using jwt.sign(). The token's payload contains the new user's database ID ({ id: user._id }).
This token is set as a cookie named token in the response (res.cookie('token', token)).
A 201 Created response is sent back with the user's details.
3. User Login
For returning users, the flow is similar.

Route: A POST request to /api/auth/login.
File: d:\PixelWhisper\src\routes\auth.routes.js directs this to the loginController.
Logic: The loginController in d:\PixelWhisper\src\controllers\auth.controller.js performs these actions:
It finds the user by the provided username.
It compares the provided password with the stored hash using bcrypt.compare().
If the credentials are valid, it generates a new JWT and sets it in the token cookie, just like in the registration process.
A 200 OK response is sent back.
4. Protecting Routes
This is where the authentication becomes useful. Routes that require a user to be logged in are protected by a middleware.

Example: The route to create a post, POST /api/posts, uses authMiddleware as seen in d:\PixelWhisper\src\routes\post.routes.js.
File: The logic is in d:\PixelWhisper\src\middlewares\auth.middleware.js.
Logic: Before the createPostController can run, the authmiddleware does the following:
It reads the token from the request's cookies (req.cookies.token).
If no token exists, it sends a 401 Unauthorized error.
It uses jwt.verify() to check if the token is valid and hasn't been tampered with, using the JWT_SECRET from your environment variables.
If valid, it extracts the user ID from the token's payload.
It fetches the user's full profile from the database.
It attaches the user object to the request (req.user = user), making it available to the next function in the chain (the controller).
It calls next() to pass control to the createPostController.
5. User Logout
Route: A GET request to /api/auth/logout.
File: d:\PixelWhisper\src\routes\auth.routes.js.
Logic: This is a simple but effective implementation. It tells the browser to clear the token cookie, which effectively logs the user out from the client's perspective.
