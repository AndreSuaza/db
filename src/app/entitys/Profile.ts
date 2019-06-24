// tslint:disable-next-line:class-name
import { Deck } from './Deck';
import { Card } from './Card';
export class Profile {
    nickname: string;
    currentBattle: string;
    namedeck: string;
    maindeck: Card[];
    sidedeck: Card[];
    hand: Card[];
    leader: Card;
    decks: Deck[];
}
