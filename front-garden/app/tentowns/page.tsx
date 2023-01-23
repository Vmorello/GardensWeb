import React from 'react';
import {GotPage} from '../../src/components/representation_page'

import map from "../../public/maps/Icewind_Dale.jpg"


export default function SendPage()
{
  const iconList = ["alter", "camp", "cave", "dock","dungeon","forge","fort","graveyard",
  "house","mine","ruines","sheild","stable","tavern","temple","town1","town2","village"]

  //Add theme here and that will be different between pages 

  return (
  <GotPage length={1400} width={2000} startIcon={"village"} title={"TenTowns"} 
  background={map.src} pageRepList={iconList} clickRadius={28/2} demoPath={ "/demo/tentown12_31.zip"}/>
  )
}
