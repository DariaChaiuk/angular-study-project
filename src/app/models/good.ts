import { NativeDateAdapter } from "@angular/material/core";

export interface Good {
    images: string[];
    name: string;
    price: number;
    description: string;
    colors: string[];
    isNewCollection: boolean;
    dateOfAdding: Date;
    dateOfUpdating?: Date;
    age: string;
    collection: string;
    id?:string;
}