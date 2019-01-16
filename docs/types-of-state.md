# Types of state

## Global state 
The global state is shared across the whole application and can be seen as a cached version of the database. All domain objects (eg. Users) should be stored here. Storing domain objects in a global store allows distant components to be kept in sync without knowing anything about each other. This results in a loose coupling between distant parts of the UI. 

### Example 
Given the following container components:
- <Navigation /> - which shows the name of the signed in user
- <UserList /> - which shows the names of all users in the system
- <UserSettings /> - which is used to change the name of the signed in user
Each of the containers receive the user from a global state. Whenever somebody submits changes to the name of the user the newly changed name is automatically distributed to the other components without knowing anything about each other. 

### What belongs in global state
- A domain object (eg. User)
- Data which needs to be shared between distant UI parts (eg. global Toasts/Notifications)

## UI state
UI state is mostly irrelevant to the core functionality of the app. Form states and visual enhancements of the application should store information in the component itself. Therfore it uses Reacts internal setState API. Some visual enhancements (eg. Toasts/Notifications) need to be shared accross different container components. In that case it is fine to promote UI state to the global state.

### What belongs in UI state
- the open/closed state of an accordion
- form state (values, errors, isSubmitting,...)
- ...

## URL state
URL state or the browsers URL is the entry point to web applications. The URL defines which collection of UI elements needs to be rendered. Reloading the page should not result in a context switch (eg. editing the user profile > reload > display user profile). This allows users to bookmark URLs and share them with others.

### What belongs in URL state
- The current location
- In query params the following should be stored:
    - the current page of a paginated list
    - filters of a list (eg. display all activated users)
    - ....
