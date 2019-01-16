# Side effects

React Redux is promoting a functional way of building UIs. In a purly functional language state can't be modified and everything which changes the state is considered a side-effect. This includes printing some text on a screen, reading a file from a file system or storing a value in tp a database. Redux solves side-effects by dispatching actions. For every global state change an action needs to be dispatched, but not every dispatched action changes the state. In order to reuse actions accross different parts of the application `action creators` can be extracted. Using `redux-thunk` action creators can dispatch other actions. This is best illustrated in the following example:

```js
// action creator
export const fetchUsers = () => async (dispatch) => {
    try {
        const users = await fetch('http://example.com/users');
        return dispatch({
            type: 'user_fetch_success',
            payload: users,
        });
    } catch (error) {
        return dispatch({
            type: 'user_fetch_error',
            payload: error
        });
    }
}

export const updateUser = ({ id }) => { /* ADD IMPLEMENTATION HERE */ }
export const destroyUser = ({ id }) => { /* ADD IMPLEMENTATION HERE */ }
// other actions....

```

The above action creator fetches users from a remote API. On success the action `user_fetch_success` is dispatched including all users from the API. In case of an error an action with the type `user_fetch_error` will be dispatched. Dispatching actions itself doesn't change the global state. It only tells that an event had happened. If anybody wants to do anything with this event they're free to do so. Changing the global state can be done in a reducer. I won't cover them here but refere to the official documentation (https://redux.js.org/basics/reducers).

## When/How are side effects triggered

There are multiple ways to trigger a side effect:
- when a user interacts with the application
    - user submits a sign-in form
    - ...
- when something happens in the application
    - when a container component is loaded
    - when values/state changes
- others (eg. websocket sending an event, ....)

### When something changes in the application

Loading the right data for the right container at the right time from the backend is a challenging task. Having no data-dependencies between container components makes it possible to freely arrange them. A data dependency is any kind of state in the global redux store which was loaded by one container A and is reused by another container B. That means that container B can't render any data without container A beeing loaded before B. Having every container specify which data it requires enables completly independent components which can be arranged anywhere in the application. To make data loading needs of a container easier there is a HOC called 'hasSideEffect'. This HOC serves 2 different purposes:
- Load data when the container is rendered initially
- Load data when certain props change 

Given the following scenario.

We have a user profile page with a navigation at the top, which looks might look like this:

http://application.com/users/:userId

```
          < Sepp >

+----------------------------+ +---------+
| First:     Sepp            | | Delete  |
| Last:      Huber           | +---------+
| Disabled:  false           | | Disable |
+----------------------------+ +---------+
```
As we want to reuse the UserNavigation `< Sepp >` in other parts of the application we extract the following two components:
- UserPage.js
- UserNavigation.js
- UserDetails.js

```js
// Page.js
import UserNavigation from './UserNavigation';
import UserDetail from './UserDetail';

/**
 * UserNavigation and UserDetail are synced via the userId prop.
 * It doesn't matter if the components are rendered next to each
 * other as long as the userId is passed correctly to the containers.
 * userId is coming from somewhere else doesn't matter. They're
 * completely independent.
 */ 

const UserPage = () => (
    <Route 
        path="/users/:userId"
        component={({ userId }) => (
            <div>
                <UserNavigation userId={ userId } />
                <UserDetail userId={ userId } />
            </div>
        )}
    />
);

export default UserPage;
```

```js
// UserNavigation.js
import { connect } from 'redux';
import { hasSideEffect } from '@trigo/whatever'; // name to be defined =)
import { fetchUsers } from './user-actions';
import Organism from './organism'; // the UI for this container

const mapStateToProps = (state, props) => {
    const users = state.users;
    const currentUser = state.users.find((user) => user.id === props.userId);
    const nextUser = users[users.indexOf(currentUser) + 1];
    const prevUser = users[users.indexOf(currentUser) - 1];
    return {
        nextUser, 
        currentUser,
        prevUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    sideEffect: () => dispatch(fetchUsers()),
};

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
    hasSideEffect(), // this automatically executes the sideEffect function from mapDispatchToProps
)(Organism);
```

```js
// UserDetails.js
import { connect } from 'redux';
import { hasSideEffect } from '@trigo/whatever'; // name to be defined =)
import { destroyuser, updateUser, fetchUsers } from './user-actions';
import Organism from './organism'; // the UI for this container

const mapStateToProps = (state, props) => {
    return {
        user: state.users.find((user) => user.id === props.userId),
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onDelete: () => dispatch(destroyUser({ id: props.userId})),
        onUpdateStatus: ({ enabled }) => dispatch(updateUser({ id: props.userId }, { enabled })),
        sideEffect: () => dispatch(fetchUsers({ id: props.userId })), 
    };
}

export default pipe(
    connect(mapStateToProps, mapDispatchToProps),
    hasSideEffect({ props: ['userId'] }), // on initial load AND when the userId differers sideEffect is executed
)(Organism);
```

### Links/Resources
- https://blog.isquaredsoftware.com/2016/10/idiomatic-redux-why-use-action-creators/