import json
import falcon
from falcon import Request, Response

from pprint import pprint

from db.mongo_interface import db_interface


class GardensWebAPI:
    """The controls for all routes and their HTTP methods.\n 
    Is the ambassador for the database."""
    def __init__(self):
        self.db_garden = db_interface()

    def on_get_health(self, req: Request, resp: Response):
        """GET - Returns Http 200 if web server is up."""
        resp.status = falcon.HTTP_200
        return

    def on_post_save(self, req: Request, resp: Response):
        """POST - Saves plant list into database\n
                input (body) - db_entry
        """
        doc = json.load(req.bounded_stream)

        self.db_garden.save_plot(**doc)

        resp.status = falcon.HTTP_200
        return

    def on_get_load(self, req: Request, resp: Response):
        """GET - Loads plant entry raw for React and sorted list for canvas\n
                input (params) - user \n
                output - json{"db_entry" , "canvas_list"}
        """
        try:
            owner = req.params["user"]
        except KeyError:
            resp.status = falcon.HTTP_400
            resp.text = json.dumps({"error": "Missing_user"})
            return
        try:
            result = self.db_garden.load_plot(owner)
            resp.status = falcon.HTTP_200
            resp.text = json.dumps(result)
            return
        except ValueError:
            resp.status = falcon.HTTP_404
            return

    ########

    def on_get_add(self, req: Request, resp: Response, plant: str):
        plant_dict = {"owner": test_user, "plant": plant}
        try:
            plant_dict["amount"] = int(req.params["amount"])
        except KeyError:
            pass
        self.db_garden.add_plant(**plant_dict)
        resp.status = falcon.HTTP_200
        resp.text = json.dumps({"added": plant_dict})
        return

    def on_get_list(self, req: Request, resp: Response):
        try:
            owner = req.params["user"]
        except KeyError:
            resp.status = falcon.HTTP_400
            resp.text = json.dumps({"key": "Missing_user"})
            return

        result = self.db_garden.get_list_of_plants(owner)
        resp.status = falcon.HTTP_200
        resp.text = json.dumps(result)
        return
