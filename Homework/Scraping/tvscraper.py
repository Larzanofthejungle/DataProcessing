#!/usr/bin/env python
# Name: Lars Overwater
# Student number: 10800077
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv

from pattern.web import URL, DOM

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

def extract_tvseries(dom):
    '''
    Extract a list of highest rated TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''
    series = []

    for e in dom.by_tag("div.lister-item-content"):

        row = []
        for a in e.by_tag("h3.lister-item-header"):
            for title in a.by_tag("a"):
                row.append(title.content.encode('utf-8'))

        for a in e.by_tag("div.inline-block ratings-imdb-rating"):
            row.append(a.attributes["data-value"])

        for a in e.by_tag("p.text-muted"):
            for genre in a.by_tag("span.genre"):
                row.append(genre.content[1:].strip())

            for runtime in a.by_tag("span.runtime"):
                runtime = runtime.content[:-4]

        actors = []
        for a in e.by_tag("p"):
            if ("?ref_=adv_li_st" in a.content):
                for actor in a.by_tag("a"):
                    actors.append(actor.content.encode('utf-8'))

        row.append(', '.join(actors))
        row.append(runtime)
        series.append(row)

    return series


def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])
    for row in tvseries:
        print row
        writer.writerow(row)

    # ADD SOME CODE OF YOURSELF HERE TO WRITE THE TV-SERIES TO DISK

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV,'wb') as output_file:
        save_csv(output_file, tvseries)
