/*DROP DATABASE IF EXISTS startrek;*/


/*CREATE DATABASE startrek;

\c startrek;

CREATE TABLE starships (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  registry VARCHAR,
  affiliation VARCHAR,
  launched INTEGER,
  class VARCHAR,
  captain VARCHAR
);

INSERT INTO starships (name, registry, affiliation, launched, class, captain)
  VALUES ('USS Enterprise', 'NCC-1701', 'United Federation of Planets Starfleet', 2258, 'Constitution', 'James T. Kirk');


CREATE TABLE teste.starships (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  registry VARCHAR,
  affiliation VARCHAR,
  launched INTEGER,
  class VARCHAR,
  captain VARCHAR
);


INSERT INTO teste.starships (name, registry, affiliation, launched, class, captain)
  VALUES ('USS Enterprise', 'NCC-1701', 'United Federation of Planets Starfleet', 2258, 'Constitution', 'James T. Kirk');

*/

/*HEROKU*/

CREATE ROLE startrek;
ALTER ROLE startrek WITH LOGIN PASSWORD '123' NOSUPERUSER NOCREATEDB NOCREATEROLE;
CREATE DATABASE starships OWNER startrek;
REVOKE ALL ON DATABASE starships FROM PUBLIC;
GRANT CONNECT ON DATABASE starships TO startrek;
GRANT ALL ON DATABASE starships TO startrek;
GRANT ALL ON starships_id_seq TO startrek;
