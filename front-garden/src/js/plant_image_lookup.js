import generic from '../images/~generic.png';
import basil from '../images/basil.png';
import beet from '../images/beet.png';
import coriander from '../images/coriander.png';
import garlic from '../images/garlic.png';
import green_onion from '../images/green_onion.png';
import lettuce from '../images/lettuce.png';
import spinach from '../images/spinach.png';
import beans from '../images/beans.png';
import cherry_tomato from '../images/cherry_tomato.png';
import cucumber from '../images/cucumber.png';
import kale from '../images/kale.png';
import tomato from '../images/tomato.png';
import zucchini from '../images/zucchini.png';
import dark from '../images/darkness.png';

//TODO put these 2 together 
// convert string input to aboved mapped imported image
const dict = {"generic":generic,
            "basil":basil, 
            "beet":beet,
            "coriander":coriander,
            "garlic":garlic,
            "green_onion":green_onion,
            "lettuce":lettuce,
            "spinach":spinach,
            "beans": beans,
            "cherry_tomato": cherry_tomato,
            "tomato":tomato,
            "cucumber": cucumber,
            "kale":kale,
            "zucchini":zucchini
        }

export const default_plant_list = [
    {"name":"cherry_tomato","image":"cherry_tomato"},
    {"name":"generic","image":"generic"},
    {"name":"basil","image":"basil"},
    {"name":"beans","image":"beans"},
    {"name":"beet","image":"beet"},
    {"name":"coriander","image":"coriander"},
    
    {"name":"cucumber","image":"cucumber"},
    {"name":"garlic","image":"garlic"},
    {"name":"green_onion","green_onion":"generic"},
    {"name":"kale","image":"kale"},
    {"name":"lettuce","image":"lettuce"},
    {"name":"spinach","image":"spinach"},
    {"name":"tomato","image":"tomato"},
    {"name":"zucchini","image":"zucchini"},
]

export function get_image(input_value){
    return dict[input_value]
}

