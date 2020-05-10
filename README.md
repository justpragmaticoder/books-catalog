## Running the app

```bash
To run the app do the following:

 1. Check docker is installed on your system (https://docs.docker.com/docker-for-mac/install/, https://docs.docker.com/engine/install/ubuntu/)
 2. Build and run docker containers
    $ docker-compose up
 3. Use localhost:5000(has redirect) or localhost:5000/playground for playing with graphql
```

## Annotations
 - The GraphQL query complexity has been solved with the help of graphql-depth-limit (https://github.com/stems/graphql-depth-limit);
 - The N+1 SQL issue has been solved with the help of Dataloader (https://github.com/graphql/dataloader);
 - Unit/e2e tests should be added;

