import json


class JsonUtil:
    def __init__(self, json_file: str) -> None:
        self.file_name = json_file
        with open(self.file_name) as file:
            # file = open(json_file)
            self.dict_rep = json.load(file)

    def move_cooridinate(self, movement: int) -> None:
        for rep in self.dict_rep["repInfo"]:
            rep['x'] = rep['x'] + movement
            rep['y'] = rep['y'] + movement

    def get_json_as_dict(self) -> dict:
        return self.dict_rep

    def save_json(self):
        with open(self.file_name, 'w') as file:
            json.dump(self.dict_rep, file)


if __name__ == "__main__":
    rep_info = JsonUtil(
        "/Users/vmorello/Desktop/D&D/tentown12_31 copy/index/rep.json")
    rep_info.move_cooridinate(-14)
    rep_info.save_json()
