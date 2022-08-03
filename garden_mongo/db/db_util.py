def sort_db_for_canvas(json_results):
    """tranforms a database entry into a sorted list for canvas to reproduce the saved image"""
    plant_list = []
    for plant in json_results["plants"]:
        plant_list += [{
            "plant": plant["name"],
            "x": plant["x"],
            "y": plant["y"],
            "order": plant["id"]
        }]
    return plant_list