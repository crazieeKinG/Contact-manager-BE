export interface Contact {
    id: number;
    name: string;
    phone: number;
    userId: number;
    photoUrl: string;
    favourite: boolean;
}

export type ContactToInsert = Omit<Contact, "id">;
