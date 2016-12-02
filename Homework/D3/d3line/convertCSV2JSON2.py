# Lars Overwater
# 10800077
# Data Processing

import csv
import json

def jsonwrite(filename, name):
    with open(filename, 'rb') as csvfile:
        rawdata = csv.reader(csvfile, delimiter=',', quotechar='|')
        output_file.write("var " + name + "= [")
        for row in rawdata:
            line = '{"month":' + str(int(row[1][4:6])) + ', "day":' + str(int(row[1][6:8])) + ', "tgem":' + row[2].strip(' ') + ', "tmin":' + row[3].strip(' ') + ', "tmax":' + row[4].strip(' ') + '}, '
            output_file.write(line)
        output_file.seek(-2, 2)
        output_file.write("];")

# opens csv file and turns it into an json file
with open('d3line_data.js','wb') as output_file:
    jsonwrite("KNMI_20141231.txt", "tem_2014")
    output_file.write("\n")
    jsonwrite("KNMI_20151231.txt", "tem_2015")
