import pytest

from json_util import JsonUtil


@pytest.fixture()
def resource():
    # print("setup")
    orignal_file = JsonUtil("test_files/rep_one_icon.json")
    yield  #this can be an object
    # print("teardown")
    orignal_file.save_json()


def test_open_file():
    util = JsonUtil("test_files/rep_one_icon.json")


def test_save_json(resource):
    util = JsonUtil("test_files/rep_one_icon.json")
    data = util.get_json_as_dict()
    assert data['width'] == 751


def test_no_move_x_y(resource):
    util = JsonUtil("test_files/rep_one_icon.json")
    util.move_cooridinate(0)
    data = util.get_json_as_dict()
    assert data["repInfo"][0]['x'] == 20


def test_move_x_y(resource):
    util = JsonUtil("test_files/rep_one_icon.json")
    util.move_cooridinate(-14)
    data = util.get_json_as_dict()
    assert data["repInfo"][0]['x'] == 6
    assert data["repInfo"][0]['y'] == 6
