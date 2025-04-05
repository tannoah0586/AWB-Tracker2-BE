# Developing a AWB-Tracker2 Backend

# Link to Site
https://awb-tracker2.vercel.app/

# Timeframe
2 weeks

# MVP - Minimum Viable Product
* **User Authentication:**
    * Users can create accounts and log in securely.
* **Save AWBs:**
    * Users can save specific AWBs to their personal tracking list.
* **AWB Status Updates:**
    * The application retrieves and displays the latest status of saved AWBs.
    * Displays core shipment information, such as departure and arrival details, and proof of delivery status.
* **Email Notifications:**
    * Users receive automated email notifications when the Proof of Delivery (POD) status of their saved AWBs is updated or remains empty for a period of time.
* **User Saved AWB list:**
    * Users are able to view a list of all of their saved AWBs.
    * Users are able to delete AWBs from their saved list.
    * Users are able to edit the saved AWBs.
* **Basic AWB Search:**
    * Users are able to search for AWBs, using specific search parameters.
* **Data Persistence:**
    * Data is stored in a MongoDB database.

## Technical Stack

* **Backend:**
    * Node.js with Express.js
    * MongoDB for database
    * Nodemailer for email services.
    * Node-cron for scheduled email task.

## Future Enhancements (Post-MVP)

* Advanced search and filtering options.
* Real-time map visualization of shipment locations.
* Integration with multiple carrier APIs (or with OTM)
* User role management (admin, etc.).
* Detailed shipment history.
* File upload for POD documents.

## Reflections
* Pros: successful deploying of web applicaiton of a cron-mailer 'useful' app
* Cons: time mgmt 

## Backend API Planning/Testing (Postman Screenshots)

![sign-JWT](images/sign-jwt.png)
**Description:** Demonstrates the successful generation of a JSON Web Token (JWT) after user authentication.

![verify-JWT](images/verify-token.png)
**Description:** Shows the verification of a JWT, confirming its validity for authorized access to protected routes.

![sign-up-user](images/signup.png)
**Description:** Illustrates the successful creation of a new user account via the signup API endpoint.

![sign-in-user](images/sign-in.png)
**Description:** Displays the successful login of an existing user and the retrieval of an authentication token.

![get-all-users](images/get-users.png)
**Description:** Shows the retrieval of a list of all users from the database.

![authorized-userId](images/authorized-UserId.png)
**Description:** Demonstrates retrieving information for a specific user ID, ensuring authorization.

![list-all-records](images/list-all-server-records.png)
**Description:** Illustrates the retrieval of all records from the server's data source.

![filter-conditions](images/filter-conditions.png)
**Description:** Shows the application of filter conditions to the data retrieval endpoint.

![pagination-with-filter-conditions](images/Pagination-with-filtering.png)
**Description:** Demonstrates the implementation of pagination combined with filter conditions for data retrieval.

![AWBdetail](images/AWBDetail.png)
**Description:** Displays the details of a specific AWB (Air Waybill) record.

![saving-awb-with-userId-as-foreignKey](images/saving-awb-with-userId-as-FK.png)
**Description:** Shows the saving of an AWB record, using the user's ID as a foreign key for association.

![successful-nodemailer-execution](images/successful-nodemailer-execution.png)
**Description:** Demonstrates the successful execution of Nodemailer for sending email notifications.

![successful-cronjob-with-nodemailer-execution](images/screenshot-for-Cron-Job-and-nodemailer.jpeg)
**Description:** Demostrates the successful execution of cron and nodemailer for sending email notificaitons according to users.

![Get-request-show-User-savedAWBId](images/GET-saved-User-AWBs.png)
**Description:** Postman testing to show successful return to frontend for a backend request of get all of the user's protected AWBs.

![delete-request-user-savedAwbId](images/delete-savedawbid.png)
**Description:** Postman showing successful 204 successful deletetion of user's savedAwbId.

![employ-PAAS-Background-worker](images/employ-render-background-worker.png)
**Description:** showing logs of sucessful implementation of PAAS background worker to keep server running to execute cron jobs

![successful-cron-nodemailer-execution](images/successful-execution-of-cron-and-nodemailer.png)
**Description:** logs of properly execution of cron-nodemailer

**References:**

    https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/

    https://www.nodemailer.com/about/

    https://www.npmjs.com/package/node-cron

    https://render.com/docs/web-services#port-binding

    https://fontawesome.com/kits/new
