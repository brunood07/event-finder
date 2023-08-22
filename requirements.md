# Requirements

## Functional Requirements
- [x] - Should be able to register
- [] - Should be able to authenticate
- [] - Should be possible to get profile information of a authenticated user
- [] - Should be possible to get the number of reservations of a authenticated user
- [] - Should be able to a user to get his reservation history
- [] - Should be able to search for nearby events 
- [] - Should be able to search for a event by name
- [] - Should be able to reserve a spot in a event
- [] - Should be able to accept a reservation made by a user
- [] - Should be able to get event information
- [] - Should be able to get the number of spots of a event
- [] - Should be able to get the remain spots of a event
- [] - Should be able to register events

## Domain Requirements
- [x] - The user password should be encrypted
- [x] - The application data should be persisted on a PostgreSQL database
- [x] - The user document should be validated by the national pattern
- [x] - The user email should be validated
- [] - All list of data should be paginated by 10 items per page
- [] - The user should be identified by a JWT (Json Web Token)

## Non-Functional Requirements
- [x] - User should not be able to register with a already registered email
- [x] - User should not be able to register with a already registered document
- [] - User should not be able to reserve 2 spots in same event
- [] - User should not be able to make a reservation if he is not at least 5km nearby of the event
- [] - Reservation could not be accepted with less than 24 hours before the event
- [] - Reservation could only be accepted by the user who created the event
- [] - The event can be registered by any registered user
