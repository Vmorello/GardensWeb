// import Image from "next/future/image";
import back_button from "/public/common/back_button.png";
// icons
import alter from "/public/icons/alter.png";
import camp from "/public/icons/camp.png";
import cave from "/public/icons/cave.png";
import dock from "/public/icons/dock.png";
import dungeon from "/public/icons/dungeon.png";
import forge from "/public/icons/forge.png";
import fort from "/public/icons/fort.png";
import graveyard from "/public/icons/graveyard.png";
import house from "/public/icons/house.png";
import mine from "/public/icons/mine.png";
import ruines from "/public/icons/ruines.png";
import sheild from "/public/icons/sheild.png";
import stable from "/public/icons/stable.png";
import tavern from "/public/icons/tavern.png";
import temple from "/public/icons/temple.png";
import town1 from "/public/icons/town1.png";
import town2 from "/public/icons/town2.png";
import village from "/public/icons/village.png";
// plants
import generic from "/public/plants/~generic.png";
import basil from "/public/plants/basil.png";
import beet from "/public/plants/beet.png";
import coriander from "/public/plants/coriander.png";
import garlic from "/public/plants/garlic.png";
import green_onion from "/public/plants/green_onion.png";
import lettuce from "/public/plants/lettuce.png";
import spinach from "/public/plants/spinach.png";
import bean from "/public/plants/beans.png";
import cherry_tomato from "/public/plants/cherry_tomato.png";
import cucumber from "/public/plants/cucumber.png";
import kale from "/public/plants/kale.png";
import tomato from "/public/plants/tomato.png";
import zucchini from "/public/plants/zucchini.png";

type StaticImageData = { src: string; height: number; width: number; blurDataURL?: string; }

const dict:{ [key: string]: StaticImageData } = {
  "back_button":back_button,
  //icons
  "alter": alter,
  "camp": camp,
  "cave": cave,
  "dock": dock,
  "dungeon": dungeon,
  "forge": forge,
  "fort": fort,
  "graveyard": graveyard,
  "house": house,
  "mine": mine,
  "ruines": ruines,
  "sheild": sheild,
  "stable": stable,
  "tavern": tavern,
  "temple": temple,
  "town1": town1,
  "town2": town2,
  "village": village,
  //plants
  "generic": generic,
  "basil": basil,
  "beet": beet,
  "coriander": coriander,
  "garlic": garlic,
  "green_onion": green_onion,
  "lettuce": lettuce,
  "spinach": spinach,
  "bean": bean,
  "cherry_tomato": cherry_tomato,
  "tomato": tomato,
  "cucumber": cucumber,
  "kale": kale,
  "zucchini": zucchini,
};

export function get_image(input_value:string) {
  const image = dict[input_value];

  return image.src;
}
