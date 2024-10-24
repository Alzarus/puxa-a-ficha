DO
$do$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'puxa_a_ficha_prod') THEN
      CREATE DATABASE puxa_a_ficha_prod;
   END IF;
END
$do$;
