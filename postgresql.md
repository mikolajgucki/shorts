<!-- #pg #postgres #postgresql -->

# Connection info

```sql
-- List connections
SELECT ssl, client_addr, cipher, application_name
FROM pg_stat_ssl
JOIN pg_stat_activity
ON pg_stat_ssl.pid = pg_backend_pid()
;
```

# Extensions

```sql
-- List all installed extensions
SELECT * FROM pg_extension;

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS {extension};

-- Disable extensions
DROP EXTENSION {extension};
```

Extensions:
- `postgis`
- `postgis_topology`
- `postgis_raster`
- `pg_trgm` (trigram)

## PostGIS

```sql
-- Enable/disable
CREATE EXTENSION IF NOT EXISTS postgis;
DROP EXTENSION postgis;

-- Get PostGIS version
SELECT PostGIS_Version();
```

## Trigram

```sql
-- Enable/disable
CREATE EXTENSION IF NOT EXISTS pg_trgm;
DROP EXTENSION pg_trgm;

-- Similarity
SELECT similarity('NodeJS','node.js');

-- Text search (searching for "dogs" matches "dog")
SELECT *
FROM documents
WHERE to_tsvector('english', content) @@ to_tsquery('dog');
```

## `vector` extension ([GitHub](https://github.com/pgvector/pgvector))

```sh
# Run the following in the Docker image postgres:16-alpine
apk add --no-cache clang19
apk add --no-cache --virtual .build-deps build-base git ca-certificates llvm19 postgresql16-dev
git clone --branch v0.7.4 --depth 1 https://github.com/pgvector/pgvector /tmp/pgvector
make -C /tmp/pgvector
make -C /tmp/pgvector install
apk del .build-deps
```

```sql
-- Enable/disable
CREATE EXTENSION IF NOT EXISTS vector;
DROP EXTENSION vector;
```

```sql
-- Create table with a vector
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536)
);

-- Insert row
INSERT INTO documents (content, embedding)
VALUES (
  'This is an example text.',
  '[0.0123, 0.0432, ...]'::vector
);

-- Query (<#> is cosine distance, <-> is Euclidean distance)
SELECT id, content
FROM documents
ORDER BY embedding <#> '[0.0123, 0.0432, ...]'::vector
LIMIT 5;

-- HNSW index (Postgres 16+)
CREATE INDEX ON documents
USING hnsw (embedding vector_cosine_ops);

-- IVFFlat index
CREATE INDEX ON documents
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

# Docker

```sh
# Run a container
docker run --env POSTGRES_PASSWORD=postgres -p 5432:5432 -d --name pg-test postgres:16-alpine
docker run --env POSTGRES_PASSWORD=postgres -p 5432:5432 -d --name pg-test jobref-postgres
```