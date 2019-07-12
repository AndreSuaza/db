import { Component, OnInit } from '@angular/core';
import { LoadProfileService } from '../../services/load-profile.service';
import { AuthService } from '../../services/auth.service';
import { Card } from '../../entitys/Card';
import { Deck } from '../../entitys/Deck';
import { Profile } from '../../entitys/Profile';

@Component({
  selector: 'app-load-deck',
  templateUrl: './load-deck.component.html',
  styleUrls: ['./load-deck.component.scss']
})
export class LoadDeckComponent implements OnInit {

  maindeck: Card[];
  leader: Card[];

  constructor(private loadProfileService: LoadProfileService,
              private authService: AuthService) {
                this.tempProfile();
                this.tempDeck();
                this.tempSetCurrentDeck();
              }

  ngOnInit() {
  }

  tempProfile() {
    const profile: Profile = {
      nickname: '',
      currentBattle: '',
      namedeck: '',
      state: 0
    };
    this.loadProfileService.setProfile(this.authService.user.uid, profile);
  }

  tempDeck() {
    this.leader = [
      { id: 'BT6-105',
        index: 0 ,
        origin: 0,
        name: 'Son Goku',
        img: 'https://www.dbs-decks.com/img/BT6/BT6-105.png',
        // tslint:disable-next-line:max-line-length
        text: 'Permanent If there is a skill-less Battle Card in your Drop Area, you can activate this card\'s Awaken skill when your life is at 6 or less. Activate Main Once per turn Choose 1 {Four-Star Ball} from your hand and reveal it : Draw 1 card and this card gets +5000 power for the duration of the turn. Awaken When your life is at 4 or less : You may draw 1 card, then choose up to 1 of your energy, switch it to Active Mode, and flip this card over.'
      },
      {
        id: 'BT6-105',
        index: 0,
        origin: 0,
        name: 'Bonds of Friendship Son Goku',
        img: 'https://www.dbs-decks.com/img/BT6/BT6-105_b.png',
        // tslint:disable-next-line:max-line-length
        text: 'Activate Main Once per turn Choose 1 {Four-Star Ball} from your hand and reveal it : Draw 2 cards, then choose 1 card from your hand and place it in your Drop Area. Auto Once per turn When you combo with a skill-less card, that card gets +5000 combo power for the duration of the turn.'
      }
    ];

    this.maindeck = [
      {id: 'P-031', name: 'Baby, Dawn of Vengeance', img: 'https://www.dbs-decks.com/img/P/P-031'},
{id: 'P-161', name: 'Hercule, World Tournament King', img: 'https://www.dbs-decks.com/img/P/P-161'},
{id: 'P-003_PR', name: 'Super Saiyan 3 Son Goku', img: 'https://www.dbs-decks.com/img/P/P-003_PR'},
{id: 'P-075', name: 'Black Masked Saiyan, Splintering Mind', img: 'https://www.dbs-decks.com/img/P/P-075'},
{id: 'P-057_PR', name: 'Desperate Odds Kefla', img: 'https://www.dbs-decks.com/img/P/P-057_PR'},
{id: 'P-151', name: 'Mr. Buu, the Mischievous', img: 'https://www.dbs-decks.com/img/P/P-151'},
{id: 'P-008_PR', name: 'Clan of Terror Mecha Frieza', img: 'https://www.dbs-decks.com/img/P/P-008_PR'},
{id: 'P-033_PR02', name: 'Endless Evolution Broly', img: 'https://www.dbs-decks.com/img/P/P-033_PR02'},
{id: 'P-115', name: 'Son Goku, Path to Greatness', img: 'https://www.dbs-decks.com/img/P/P-115'},
{id: 'P-123', name: 'Vegeta, Reluctant Reinforcements', img: 'https://www.dbs-decks.com/img/P/P-123'},
{id: 'P-148', name: 'Vegeta Jr., Heroic Successor', img: 'https://www.dbs-decks.com/img/P/P-148'},
{id: 'P-018_PR', name: 'Occupation of Evil Frieza', img: 'https://www.dbs-decks.com/img/P/P-018_PR'},
{id: 'P-067', name: 'Bardock, Fully Unleashed', img: 'https://www.dbs-decks.com/img/P/P-067'},
{id: 'P-159', name: 'Mutaito, Skill of a Sage', img: 'https://www.dbs-decks.com/img/P/P-159'},
{id: 'P-079', name: 'Hypertraining SS Son Goku', img: 'https://www.dbs-decks.com/img/P/P-079'},
{id: 'P-056', name: 'Supreme Kai of Time, Light\'s Guide', img: 'https://www.dbs-decks.com/img/P/P-056'},
{id: 'P-013', name: 'Hit, Conqueror of Time', img: 'https://www.dbs-decks.com/img/P/P-013'},
{id: 'P-036_PR', name: 'Scientist Fu', img: 'https://www.dbs-decks.com/img/P/P-036_PR'},
{id: 'P-156', name: 'Son Goku, Savage Great Ape', img: 'https://www.dbs-decks.com/img/P/P-156'}
    ];

    const deck: Deck = {
      name: 'vainilla',
      leader: this.leader,
      maindeck: this.maindeck
    };

    this.loadProfileService.setDeck(this.authService.user.uid, deck);
  }

  tempSetCurrentDeck() {
    this.loadProfileService.setDefouldDeck('vainilla');
  }
}
