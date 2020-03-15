# plant-api
Node, Express, Objection, PostgresSQL

# Setting up development tools such as precommit hooks:
1. run `sh ./conf/bootstrap` from the root directory

# Installing PostGres for Mac
`brew install postgres`

# Grabbing Dump

Ask admin of DB (John Huynh) to get a sql dump for the DB, or if the database server is up, then one can run the `./db/refresh` script to grab it from the remote server.

The dump should be named `dump` and be placed in the `db folder at the root level.

If you want to have a GUI to access your database, use pgAdmin.

# Bootstrapping/Refreshing DB from bash script

1. Run `./db/refresh` from the root directory

# saga-api
