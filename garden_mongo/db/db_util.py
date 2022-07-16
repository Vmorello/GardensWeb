def sort_db_for_canvas(json_results):
    """tranforms a database entry into a sorted list for canvas to reproduce the saved image"""
    plant_list = []
    for plant in json_results["plants"]:
        plant_list += [{
            "plant": plant["name"],
            "x": entry["x"],
            "y": entry["y"],
            "order": entry["order"]
        } for entry in plant["locations"]]

    def sort_by_order(dict):
        return dict["order"]

    plant_list.sort(key=sort_by_order)
    return plant_list