```
 +-------------------+           +-------------------+
 |                   |           |                   |
 |       Store       <----(8)----+      Reducer      |
 |                   |           |                   |
 +-------------------+           +---------^---------+
           |                               |
          (1)                             (7)
           |                               |
 +---------v---------+           +-------------------+
 |                   |           |                   |
 |     Container     +----(5)---->   Action Creator  <-----+
 |                   |           |                   |     |
 +-------+---^-------+           +-------------------+     |
         |   |                             |               |
        (2) (3)                            +------(6)------+
         |   |
 +-------v---+-------+
 |                   |
 |     Organism      |
 |                   |
 +---------^---------+
           |
          (4)
           |
 +---------+---------+
 |                   |+
 |  Core Components  ||+
 |                   |||
 +--------------------||
  +-------------------||
   +-------------------+

Legend:
1) Provides State and rerenders on state change
2) Provides prepared state/callbacks
3) Triggers callbacks on user actions
4) Contains one or many core components
5) Dispatch actions-creator
6) Might dispatch other actions-creators
7) Provides data
8) Provides new state
```