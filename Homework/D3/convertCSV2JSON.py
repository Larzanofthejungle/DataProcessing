# Lars Overwater
# 10800077
# Data Processing

import csv
import json

# opens csv file and turns it into an json file
with open('barchart.csv', 'rb') as csvfile:
    rawdata = csv.reader(csvfile, delimiter=',', quotechar='|')

    with open('barchart.js','wb') as output_file:
        output_file.write("[")
        csvfile.next()
        for row in rawdata:
            line = '{"state":"' + row[0].strip('"') + '", "murder":' + row[1] + '}, '
            output_file.write(line)
        output_file.seek(-2, 2)
        output_file.write("]")
