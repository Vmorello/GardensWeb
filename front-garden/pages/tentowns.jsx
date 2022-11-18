import React from 'react';
import {GotPage} from '../src/react/representation_page'

import map from "../public/maps/Icewind_Dale.jpg"

export default function SendPage(props)
{
  const iconList = ["alter", "camp", "cave", "dock","dungeon","forge","fort","graveyard",
  "house","mine","ruines","sheild","stable","tavern","temple","town1","town2","village"]

  //Add theme here and that will be different between pages 

  return (
  <GotPage length={1420} width={2000} startIcon={"village"} title={"TenTowns"} 
  background={map.src} pageRepList={iconList} clickRadius={20} />
  )
}
