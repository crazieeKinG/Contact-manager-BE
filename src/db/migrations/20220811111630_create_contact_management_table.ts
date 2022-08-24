import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("contact_management", (table) => {
        table.increments();
        table.string("name").notNullable();
        table.bigInteger("phone").notNullable();
        table.integer("user_id");
        table.boolean("favourite").defaultTo(false);
        table.string("photo_url").notNullable();
        table.foreign("user_id").references("id").inTable("user_account");
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("contact_management");
}
