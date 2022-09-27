import React from 'react';
import {GotPage} from '../src/react/representation_page'

export default function SendPage(props)
{
  const iconList = ["alter", "camp", "cave", "dock","dungeon","forge","fort","graveyard",
  "house","mine","ruines","sheild","stable","tavern","temple","town1","town2","village"]

  return (
  <GotPage length={1420} width={2000} startIcon={"village"} title={"TenTowns"} 
  background={"tentowns"} pageRepList={iconList}/>
  )
}
