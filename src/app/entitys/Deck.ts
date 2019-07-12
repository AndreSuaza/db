// tslint:disable-next-line:class-name
import { Card } from './Card';
export class Deck {
    maindeck: Card[];
    sidedeck?: Card[];
    leader: Card[];
    name: string;
}
