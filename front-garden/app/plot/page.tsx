import React from 'react';
import {GotPage} from '../../src/react/representation_page'

export default function SendPage()
{
  const plantList = ["basil","beet","coriander","garlic","green_onion","lettuce",
    "spinach","bean","cherry_tomato","tomato","cucumber","kale","zucchini",]

    //Add theme here and that will be different between pages 

  return (
  <GotPage length={900} width={1280} startIcon={"cherry_tomato"} title={"GotPlant"}
  background={undefined} pageRepList={plantList} clickRadius={35} demoPath={ "/demo/GotPlant12_31.zip"}/>
  )
}
