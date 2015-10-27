#!/usr/bin/env python

import sys

from imp import load_source
from os import path


src_path = path.abspath(path.dirname(__file__))
oj_path = path.join(src_path, 'dependencies', 'oj')

sys.path.append(oj_path)

oj = load_source('oj', path.join(oj_path, 'utils', 'run.py'))

oj.run(src_path)
