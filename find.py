import os
import sys
import re

commit = sys.argv[1]
issues= []

data =os.popen(f'git log --format=%B  {commit}^..{commit}').read()
arr = data.split("\n")
for x in arr:
  if x:
    result = re.match('comm.*', x)
    if result: 
       issues.append(result.group())

print(issues)