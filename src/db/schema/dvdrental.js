import {
  date,
  integer,
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core'

export const storeSchema = pgTable('store', {
  store_id: serial('store_id'),
  manager_staff_id: integer('manager_staff_id'),
  address_id: integer('address_id'),
  last_update: date('last_update'),
})

export const customerSchema = pgTable('customer', {
  customer_id: serial('customer_id'),
  store_id: integer('store_id'),
  nombre: varchar('nombre', 50),
  apellido: varchar('apellido', 50),
  email: varchar('email', 100),
  address_id: integer('address_id'),
  activebool: boolean('activebool'),
  create_date: timestamp('create_date', { default: 'now()' }),
  last_update: timestamp('last_update', { default: 'now()' }),
  activo: boolean('activo'),
})

export const staffSchema = pgTable('staff', {
  staff_id: serial('staff_id'),
  nombre: varchar('nombre', 50),
  apellido: varchar('apellido', 50),
  address_id: integer('address_id'),
  email: varchar('email', 100),
  store_id: integer('store_id'),
  activo: boolean('activo'),
  usuario: varchar('usuario', 50),
  password: varchar('password', 255), // Update the length as needed
  last_update: timestamp('last_update', { default: 'now()' }),
})
