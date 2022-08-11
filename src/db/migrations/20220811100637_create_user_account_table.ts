import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("user_account", (table) => {
        table.increments();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("user_account");
}
