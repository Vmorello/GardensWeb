import generic from "/public/images/~generic.png";
import basil from "/public/images/basil.png";
import beet from "/public/images/beet.png";
import coriander from "/public/images/coriander.png";
import garlic from "/public/images/garlic.png";
import green_onion from "/public/images/green_onion.png";
import lettuce from "/public/images/lettuce.png";
import spinach from "/public/images/spinach.png";
import beans from "/public/images/beans.png";
import cherry_tomato from "/public/images/cherry_tomato.png";
import cucumber from "/public/images/cucumber.png";
import kale from "/public/images/kale.png";
import tomato from "/public/images/tomato.png";
import zucchini from "/public/images/zucchini.png";
//import dark from '/images/darkness.png';

// convert string input to aboved mapped imported image
const dict = {
  generic: generic,
  basil: basil,
  beet: beet,
  coriander: coriander,
  garlic: garlic,
  green_onion: green_onion,
  lettuce: lettuce,
  spinach: spinach,
  beans: beans,
  cherry_tomato: cherry_tomato,
  tomato: tomato,
  cucumber: cucumber,
  kale: kale,
  zucchini: zucchini,
};
export function get_image(input_value) {
  //   console.log(`trying to load ${input_value}`);
  let image = dict[input_value];
  console.log(image);
  //   console.log(`trying to load ${image}`);
  return image.src;
}

export const default_plant_list = [
  { name: "cherry_tomato", image: "cherry_tomato" },
  // { name: "generic", image: "generic" },
  { name: "basil", image: "basil" },
  { name: "beans", image: "beans" },
  { name: "beet", image: "beet" },
  { name: "coriander", image: "coriander" },
  { name: "cucumber", image: "cucumber" },
  { name: "garlic", image: "garlic" },
  { name: "green_onion", image: "green_onion" },
  { name: "kale", image: "kale" },
  { name: "lettuce", image: "lettuce" },
  { name: "spinach", image: "spinach" },
  { name: "tomato", image: "tomato" },
  { name: "zucchini", image: "zucchini" },
];
