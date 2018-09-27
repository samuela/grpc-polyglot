#!/usr/bin/env bash

python -m mypy --ignore-missing-imports --follow-imports=skip *.py
