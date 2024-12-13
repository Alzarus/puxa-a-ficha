DO
$do$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'to_de_olho_prod') THEN
      CREATE DATABASE to_de_olho_prod;
   END IF;
END
$do$;
