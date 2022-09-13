import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("contact_management", (table) => {
        table.string("phone_type").notNullable().defaultTo("mobile");
        table.string("email").defaultTo("");
        table.string("address").defaultTo("");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("contact_management", (table) => {
        table.dropColumn("phone_type");
        table.dropColumn("email");
        table.dropColumn("address");
    });
}
