import pymongo
import json
from bson.json_util import dumps as bson_dumps
import datetime
from db.db_util import sort_db_for_canvas

from pprint import pprint

#import db.constants as constants
mongo_conn_string = f"mongodb+srv://vroccolli:vsPJGha4fFpxyrAO@cluster0.h8d28.mongodb.net/?retryWrites=true&w=majority"


class db_interface:
    """builds a connection to the MongoDB cluster with operations to operate GotPlant"""
    def __init__(self) -> None:
        self.client = pymongo.MongoClient(mongo_conn_string)
        self.db = self.client.sample_garden_db
        self.collection = self.db.sample_garden_inventory
        print("starting class & connecting to mongo")

    def add_new_garden(self, owner: str):
        """Adds a new user to db\n
            input: owner
        """
        garden_dict = {
            "owner": owner,
            "plants": [],
            "grow_location": {},
        }
        self.collection.insert_one(garden_dict)
        #print("Injected a new garden")
        return

    def load_plot(self, owner: str):
        """loads a db_entry of a given user & makes a sorted list for canvas\n
            input: owner
            output: {"db_entry" , "canvas_list"}
        """
        results = self.collection.find_one(filter= {"owner": owner})
        json_results = parse_to_json(results)

        #plant_list = sort_db_for_canvas(json_results)

        return  json_results#, "canvas_list": plant_list

    def save_plot(self, owner: str, plant_list: list, length: int, width: int):
        """loads a db_entry of a given user & makes a sorted list for canvas\n
            input: owner, plant_list inserted in canavs, length, width (both of canvas)
        """
        save_result = self.collection.update_one(filter={"owner": owner}, 
            update= {
                "$set": {
                    "plants": plant_list,
                    "grow_location": {
                        "length": length,
                        "width": width
                    }
                }},
            upsert= True 
            )
        pprint(save_result)
        return

    def add_plant(self, owner: str, plant: str, amount: int = 1):
        """Adds a new plant to a given user\n
            input: owner, plant_name, amount:opt
            output: 
            NEEDS REWORK
        """
        date = datetime.datetime.now()
        result = self.collection.update_one(filter={"owner": owner}, 
            update = {
                "$push": {
                    "plants": {
                        "name": plant,
                        "amount": amount,
                        "add_date": date
                    }
                }
            })
        return result

    def get_list_of_plants(self, owner: str):
        """gets a list of plants\n
            input: owner
            output: list of plants 
            NEEDS REWORK
        """
        results = self.collection.find_one({"owner": owner}, {
            "plants.name": 1,
            "plants.image": 1
        })
        json_results = parse_to_json(results)
        return json_results["plants"]


def parse_to_json(data):
    return json.loads(bson_dumps(data))


if __name__ == "__main__":
    db_object = db_interface()

    pprint(db_object.read_garden("Victorio_Natalie"))
