
# Types of components
Having different types of components helps to structure applications better and makes it easier to reuse components in other applications as well. There are 3 main categories of components:

- Core Components, Atoms or Design System
- Organism Components
- Container Component

## Core Components
Are the smallest building blocks of the UI. They define the basic look and feel and shouldn't have any domain knowledge of the application they're used in. It should be possible to reuse core components in other applications as well. A collection of core components is a design system. (example of a design system https://material-ui.com/) 

### Examples
- A button
- An input field
- A heading
- A paragraph
- ...

## Organism Components
An organism is a composition of one or many core components which have knowledge of the application domain. Organisms are used to form concrete interfaces for an application. They don't contain any business logic (eg. execute the actual HTTP request on a form submittion). They only receive data and provide callbacks. They can't be used in other applications.

### Examples
- A user registration form
- A list of users registred
- ...

## Container Components
Container components glue business logic and UI together, that means they are aware of Redux. They provide data (via mapStateToProps) and actions (via mapDispatchToProps). They are not bound to any interface. For every container component there is at least one organism. When building a react-web and react-native app containers might be reused in both projects.

### Examples
- A user registration form connected to the backend
- ....
