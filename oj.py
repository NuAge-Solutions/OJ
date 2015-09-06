#!/usr/bin/env python

from imp import load_source
from os import path


src_path = path.abspath(path.dirname(__file__))

oj = load_source('oj', path.join(src_path, 'utils', 'run.py'))

oj.run(src_path)
