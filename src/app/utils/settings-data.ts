import { Good } from "../models/good";

export class SettingsData {
    static sortOptions: { value: string, sortFn?: any }[] = [
        {
          value: 'price asc',
          sortFn: (a: Good, b: Good) => a.price - b.price
        },
        {
          value: 'price desc',
          sortFn: (a: Good, b: Good) => b.price - a.price
        },
        {
          value: 'label asc',
          sortFn: (a: Good, b: Good) => a.name.localeCompare(b.name)
        },
        {
          value: 'label desc',
          sortFn: (a: Good, b: Good) => b.name.localeCompare(a.name)
        }
      ];
}