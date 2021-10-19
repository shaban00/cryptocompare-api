CREATE TABLE prices (
	query text NOT NULL,
	"data" text NOT NULL,
	created_at timestamp NOT NULL,
	updated_at timestamp NOT NULL,
	CONSTRAINT prices_pk PRIMARY KEY (query)
);