CREATE TABLE public.users (
	id serial NOT NULL,
	email varchar(32) NOT NULL,
	fullname varchar(128) NOT NULL,
	"password" varchar(256) NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	is_deleted bool NOT NULL DEFAULT false,
	deleted_at timestamptz NULL,
	CONSTRAINT users_email UNIQUE (email),
	CONSTRAINT users_pk PRIMARY KEY (id)
);

CREATE TABLE public.income_expense_type (
	id serial NOT NULL,
	description varchar(64) NOT NULL,
	user_id int4 NOT NULL,
	is_deleted bool NOT NULL DEFAULT false,
	deleted_at timestamptz NULL,
	CONSTRAINT income_expense_type_description_user_id_un UNIQUE (description, user_id),
	CONSTRAINT income_expense_type_pk PRIMARY KEY (id),
	CONSTRAINT income_expense_type_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE public.income_expense (
	id serial NOT NULL,
	value float8 NOT NULL,
	is_deleted bool NOT NULL DEFAULT false,
	description varchar(64) NOT NULL,
	deleted_at timestamptz NULL,
	income_expense_type_id int4 NOT NULL,
	user_id int4 NOT NULL,
	is_income bool NOT NULL,
	CONSTRAINT income_expense_pk PRIMARY KEY (id),
	CONSTRAINT income_expense_income_expense_type_id_fkey FOREIGN KEY (income_expense_type_id) REFERENCES public.income_expense_type(id),
	CONSTRAINT income_expense_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
