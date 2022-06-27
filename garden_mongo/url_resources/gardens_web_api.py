import json
import falcon
from falcon import Request, Response

from pprint import pprint 

from db.mongo_util import db_interface


test_user = "Victorio_Natalie"

# Falcon follows the REST architectural style, meaning (among
# other things) that you think in terms of resources and state
# transitions, which map to HTTP verbs.
class GardensWebAPI:
    def __init__(self):
        self.db_garden = db_interface()

    
    # #This is used on a info read request, public, and uses url paramaters. Good for links & histories
    # def on_get(self, req: Request, resp: Response):
    #     """Handles GET requests"""
    #     try:
    #         owner = req.params["user"]
    #     except KeyError:
    #         resp.status = falcon.HTTP_400
    #         resp.text = json.dumps({"key": "Missing_user"})
    #         return
        
    #     result = self.db_garden.read_garden(owner)
    #     resp.status = falcon.HTTP_200 
    #     resp.text = json.dumps({"Garden": result}) #TODO ===========
    

    #This is used to info write request, uses the request body to store the write
    def on_post(self,req: Request, resp: Response):
        result = req.bounded_stream.read()
        resp.status = falcon.HTTP_200  
        resp.text = json.dumps({"key": "_post"})


    def on_get_add(self,req: Request, resp: Response, plant:str):
        plant_dict = {"owner":test_user, "plant":plant}
        try:
            plant_dict["amount"] = int(req.params["amount"])
        except KeyError:
            pass # should i add the ["amount"] = 1 here or leave it as a default val in function?
        self.db_garden.add_plant(**plant_dict)
        resp.status = falcon.HTTP_200  
        resp.text = json.dumps({"added": plant_dict})
    

    def on_get_list(self, req: Request, resp: Response,):
        try:
            owner = req.params["user"]
        except KeyError:
            resp.status = falcon.HTTP_400
            resp.text = json.dumps({"key": "Missing_user"})
            return
        
        result = self.db_garden.get_list_of_plants(owner)
        resp.status = falcon.HTTP_200 
        resp.text = json.dumps(result) 


    def on_get_transplant(self,req: Request, resp: Response, plant:str):
        pass