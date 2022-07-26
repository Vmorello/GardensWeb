import pytest

import requests


def test_app_health():
    response = requests.get(
        'http://localhost:9110/v0/health',
    )

    assert response.status_code == 200
