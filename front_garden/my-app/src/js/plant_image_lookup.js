import generic from '../images/~generic.png';
import basil from '../images/basil.png';
import beet from '../images/beet.png';
import coriander from '../images/coriander.png';
import garlic from '../images/garlic.png';
import green_onion from '../images/green_onion.png';
import lettuce from '../images/lettuce.png';
import spinach from '../images/spinach.png';

const dict = {"generic":generic,
            "basil":basil, 
            "beet":beet,
            "coriander":coriander,
            "garlic":garlic,
            "green_onion":green_onion,
            "lettuce":lettuce,
            "spinach":spinach}

export function get_image(input_value){
    return dict[input_value]
}

