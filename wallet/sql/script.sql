CREATE TABLE IF NOT EXISTS users (
    id SERIAL NOT NULL,
    email VARCHAR(32) NOT NULL,
    fullname VARCHAR(128) NOT NULL,
    password VARCHAR(256) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ NULL,
    CONSTRAINT users_pk PRIMARY KEY (id),
    CONSTRAINT users_email UNIQUE (email)
);

CREATE TABLE public.income_expense_type (
	id serial NOT NULL,
	description varchar(64) NOT NULL,
	user_id int4 NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at TIMESTAMPTZ NULL,
	CONSTRAINT income_expense_type_description_key UNIQUE (description, user_id),
	CONSTRAINT income_expense_type_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
