import json
from sys import prefix
import falcon

from  url_resources.gardens_web_api import GardensWebAPI



# falcon.App instances are callable WSGI apps
# in larger applications the app is created in a separate file
app = falcon.App(cors_enable=True)

# Resources are represented by long-lived class instances
garden_api = GardensWebAPI()

app.add_route('/v0', garden_api)
app.add_route('/v0/add_{plant}', garden_api, suffix="add")
app.add_route('/v0/get_list', garden_api, suffix="list")


# from wsgiref.simple_server import make_server
# if __name__ == '__main__':
#     with make_server('', 8000, app) as httpd:
#         print('Serving on port 8000...')

#         # Serve until process is killed
#         httpd.serve_forever()