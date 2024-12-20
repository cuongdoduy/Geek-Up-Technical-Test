DO $$
BEGIN
  IF NOT EXISTS (
    SELECT
    FROM
      pg_database
    WHERE
      datname = 'ecommerce'
  )
  THEN
    CREATE DATABASE "ecommerce";
  END IF;
END
$$;


CREATE TYPE "discount_type" AS ENUM (
  'Percent',
  'Amount'
);

CREATE TYPE "housing_type" AS ENUM (
  'Company',
  'PersonalHouse'
);

CREATE TABLE "Customer" (
  "id" UUID PRIMARY KEY,
  "username" VARCHAR,
  "email" VARCHAR,
  "password" VARCHAR,
  "role" VARCHAR
);

CREATE TABLE "Product" (
  "id" UUID PRIMARY KEY,
  "price" DOUBLE PRECISION,
  "name" VARCHAR,
  "description" VARCHAR,
  "category_id" UUID,
  "cover" VARCHAR,
  "discount" INT,
  "variants" JSON
);

CREATE TABLE "Comment" (
  "id" UUID PRIMARY KEY,
  "customer_id" UUID,
  "product_id" UUID,
  "content" VARCHAR,
  "image" VARCHAR,
  "star" INT,
  "created_at" TIMESTAMP,
  "deleted_at" TIMESTAMP
);

CREATE TABLE "Order" (
  "id" UUID PRIMARY KEY,
  "customer_id" UUID,
  "full_name" VARCHAR,
  "province" VARCHAR,
  "district" VARCHAR,
  "commune" VARCHAR,
  "address" VARCHAR,
  "phone_number" VARCHAR,
  "email_address" VARCHAR,
  "housing_type" housing_type,
  "created_at" TIMESTAMP,
  "deleted_at" TIMESTAMP,
  "total" INT
);

CREATE TABLE "Discount" (
  "id" UUID PRIMARY KEY,
  "code" VARCHAR,
  "value" INT,
  "type" discount_type,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);

CREATE TABLE "OrderDiscount" (
  "id" UUID PRIMARY KEY,
  "order_id" UUID,
  "discount_id" UUID,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP
);

CREATE TABLE "Transaction" (
  "id" UUID PRIMARY KEY,
  "order_id" UUID,
  "status" INT,
  "amount" INT,
  "provider" VARCHAR,
  "created_at" TIMESTAMP,
  "deleted_at" TIMESTAMP
);

CREATE TABLE "Order_item" (
  "id" UUID PRIMARY KEY,
  "order_id" UUID,
  "quantity" INT,
  "color" VARCHAR,
  "size" VARCHAR,
  "product_id" UUID,
  "created_at" TIMESTAMP,
  "deleted_at" TIMESTAMP
);

CREATE TABLE "categories" (
  "id" UUID PRIMARY KEY,
  "name" VARCHAR,
  "description" VARCHAR,
  "created_at" TIMESTAMP,
  "deleted_at" TIMESTAMP
);

CREATE TABLE "product_images" (
  "id" UUID PRIMARY KEY,
  "product_id" UUID,
  "image_url" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP,
  "deleted_at" TIMESTAMP
);

ALTER TABLE "product_images" ADD FOREIGN KEY ("product_id") REFERENCES "Product" ("id");
ALTER TABLE "Order_item" ADD FOREIGN KEY ("product_id") REFERENCES "Product" ("id");
ALTER TABLE "Product" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
ALTER TABLE "Comment" ADD FOREIGN KEY ("product_id") REFERENCES "Product" ("id");
ALTER TABLE "Comment" ADD FOREIGN KEY ("customer_id") REFERENCES "Customer" ("id");
ALTER TABLE "Order" ADD FOREIGN KEY ("customer_id") REFERENCES "Customer" ("id");
ALTER TABLE "Transaction" ADD FOREIGN KEY ("order_id") REFERENCES "Order" ("id");
ALTER TABLE "Order_item" ADD FOREIGN KEY ("order_id") REFERENCES "Order" ("id");
ALTER TABLE "OrderDiscount" ADD FOREIGN KEY ("order_id") REFERENCES "Order" ("id");
ALTER TABLE "OrderDiscount" ADD FOREIGN KEY ("discount_id") REFERENCES "Discount" ("id");

