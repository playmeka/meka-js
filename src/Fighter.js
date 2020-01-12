import { observable, action, computed } from "mobx";
import shuffle from "lodash/shuffle";
import ObjectWithPosition, {
  Position,
  randomPosition
} from "./ObjectWithPosition";
import uuid from "uuid/v1";
import { Action } from "./Game";

export default class Fighter extends ObjectWithPosition {
  class = "Fighter";
  attackDamage = 5;

  @observable hp = 20;

  constructor(team, props = {}) {
    super(props);
    this.id = `${uuid()}@Fighter`;
    this.team = team;
  }

  toJSON() {
    return {
      id: this.id,
      class: this.class,
      hp: this.hp,
      team: { id: this.team.id },
      position: { x: this.x, y: this.y }
    };
  }

  get game() {
    return this.team.game;
  }

  @action move(position) {
    this.position.x = position.x;
    this.position.y = position.y;
  }

  @action takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) this.die();
  }

  die() {
    this.game.killFighter(this);
  }
}
