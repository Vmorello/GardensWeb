import pymongo
import json
from bson.json_util import dumps as bson_dumps
import datetime
import db.constants as constants

from pprint import pprint


class db_interface:
    def __init__(self) -> None:
        self.client = pymongo.MongoClient(constants.mongo_conn_string)
        self.db = self.client.sample_garden_db
        self.collection = self.db.sample_garden_inventory
        print("starting class & connecting to mongo")

    def add_new_garden(self, owner: str):
        """this is the documentation of add_new_garden"""
        garden_dict = {
            "owner": owner,
            "plants": [],  #constants.new_garden,
        }
        self.collection.insert_one(garden_dict)
        print("we injected a new garden")

    def read_garden(self, owner: str):
        results = self.collection.find_one({"owner": owner})
        json_results = parse_to_json(results)
        return json_results

    def get_list_of_plants(self, owner: str):
        results = self.collection.find_one({"owner": owner}, {
            "plants.name": 1,
            "plants.image": 1
        })
        json_results = parse_to_json(results)
        # pprint(json_results["plants"])
        return json_results["plants"]

    def load_plot(self, owner: str):
        results = self.collection.find_one({"owner": owner})
        json_results = parse_to_json(results)

        #TODO the mongo way below
        plant_list = []
        for plant in json_results["plants"]:
            plant_list += [{"plant":plant["name"],"x":entry["x"],"y":entry["y"],"order":entry["order"]}
                                    for entry in plant["locations"]]
        def sort_by_order(dict):
            return dict["order"]
        plant_list.sort(key= sort_by_order)

        #pprint(plant_list)
        return {"db_entry":json_results,
                "canvas_list":plant_list}


    def add_plant(self, owner: str, plant: str, amount: int = 1):
        date = datetime.datetime.now()
        result = self.collection.update_one({"owner": owner}, {
            "$push": {
                "plants": {
                    "name": plant,
                    "amount": amount,
                    "add_date": date
                }
            }
        })

        return result

    def save_plot(self, owner: str, plant_list: list, length: int, width: int):
        print(f"trying to add {plant_list} with {owner=}")
        save_result = self.collection.update_one({"owner": owner}, {
            "$set": {
                "plants": plant_list,
                "grow_location": {
                    "length": length,
                    "width": width
                }
            }
        })
        print(f"{save_result=}")
        return


def parse_to_json(data):
    return json.loads(bson_dumps(data))


if __name__ == "__main__":
    db_object = db_interface()

    #db_object.add_new_garden(constants.owner)
    pprint(db_object.read_garden("Victorio_Natalie"))  #constants.owner))
