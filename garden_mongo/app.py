import falcon
from url_resources.gardens_web_api import GardensWebAPI

#Building app object for gunicorn to run
app = falcon.App(cors_enable=True)

#Setting up the webserver, routes and connection to DB (mongo)
garden_api = GardensWebAPI()
app.add_route('/v0/health', garden_api, suffix="health")
app.add_route('/v0/save_plot', garden_api, suffix="save")
app.add_route('/v0/load', garden_api, suffix="load")
# app.add_route('/v0/add_{plant}', garden_api, suffix="add")
# app.add_route('/v0/get_list', garden_api, suffix="list")



#Run without Gunicorn 
from wsgiref.simple_server import make_server
if __name__ == '__main__':
    with make_server('', 8000, app) as httpd:
        print('Serving on port 8000...')
        # Serve until process is killed
        httpd.serve_forever()