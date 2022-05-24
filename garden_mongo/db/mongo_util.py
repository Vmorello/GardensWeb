import pymongo
import json
from bson.json_util import dumps as bson_dumps
import datetime
import constants
import urllib 

from pprint import pprint 


class db_interface:
    def __init__(self) -> None:
        self.client = pymongo.MongoClient(
            f"mongodb://localhost:27017")
            #admin:{urllib.parse.quote(constants.mongo_pw)}@ username and password when needed
        self.db = self.client.sample_garden_db
        self.collection = self.db.garden_inventory
        print("starting class & connecting to mongo")


    def add_new_garden(self, owner:str):
        """this is the documentation of add_new_garden"""
        garden_dict = {
            "owner":owner,
            "plants": constants.new_garden,
            "grow_locations":[],
            "items":{
                "pots":{},
            }
        }
        self.collection.insert_one(garden_dict)
        print("we injected a new garden")

    def read_garden(self, owner:str):
        results = self.collection.find_one({"owner": owner})
        json_results = parse_to_json(results)
        return json_results


    def get_list_of_plants(self, owner:str):
        results = self.collection.find_one({"owner": owner}, {"plants.name": 1,"plants.image":1, "plants.amount":1} )
        json_results = parse_to_json(results)
        # pprint(json_results["plants"])
        return json_results["plants"]


    # TODO
    def transplant(self, owner:str, plant:str,): 
        date = datetime.datetime.now() 
        new_pot = "3in_pot"

        self.collection.update_one({"owner": owner, "plants.name":plant}, 
            {"$set": {f"plants.in": new_pot, f"plants.transplant_date": date} } )

    
    def add_plant(self, owner:str, plant:str, amount:int =1):
        date = datetime.datetime.now() 
        result = self.collection.update_one({"owner": owner}, 
            {"$push": {f"plants": {"name":plant, "amount": amount, "add_date": date} } } )

        return result

def parse_to_json(data):
    return json.loads(bson_dumps(data))

if __name__ == "__main__":
    db_object = db_interface()

    # db_object.add_new_garden(constants.owner)
    pprint(db_object.read_garden(constants.owner))


