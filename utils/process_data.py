# Ali Yuksekkaya, Khadija Tirmazi

from os import listdir
from shutil import rmtree
import csv
import glob
import json

# ADAPTED FROM https://github.com/AlJohri/OpenSubtitles

# download OpenSubtitles2012 with the 2013 extension
# LINKS TO THE ORIGINAL DATA

# "http://opus.lingfil.uu.se/download.php?f=OpenSubtitles2012/en.tar.gz" -O "OpenSubtitles2012.tar.gz"
# "http://opus.lingfil.uu.se/download.php?f=OpenSubtitles2013/en.tar.gz" -O "OpenSubtitles2013.tar.gz"

imdb_movies = []
# For storing IMDB url info
IMDB_BASE_URL = "https://www.imdb.com/title/"
# Each IMDB ID starts with tt
IMDB_TT = "tt"


with open("opensubtitles_imdb.tsv", 'rU') as f:
    reader = csv.DictReader(f, delimiter='\t')
    imdb_movies = {row['IDMovie']: row for row in reader}

# Each IMDB id needs to have 7 digits after "tt". If it has less than 7 digits, it needs to have leading zeros.


def padNum(x):
    if x:
        s = str(x)
        return "0"*(7-len(s))+s
    else:
        return None

# Get the name and ID from the tsv file.


def get_id_and_name(os_id):
    imdb_id = imdb_movies.get(os_id, {}).get('IDMovieImdb', None)
    name = imdb_movies.get(os_id, {}).get('MovieName', None)

    if imdb_id:
        imdb_movies.pop(os_id)
        return IMDB_TT + padNum(imdb_id), name

# Write to the json.jl file


def add_to_jl(content, os_id):
    imdb_id, name = get_id_and_name(os_id)

    if imdb_id:
        movie_subtitle = {'imdb_id': imdb_id,
                          'content': content,
                          'title': name,
                          "imdb_url": IMDB_BASE_URL + imdb_id}
        newline = json.dumps(movie_subtitle)

        with open("/data/ayuksekkaya/captions.jl", 'a', encoding='utf-8') as f:
            f.write(newline + "\n")
        return True

    return False


# Get all the movies made from 1894-2014
years = range(1894, 2014)


for xyear in years:

    year = './OpenSubtitles2013/xml/en/%d' % xyear

# Parse the .xml file and get all the dialogues and send the data to be written as json object. If there is an error just delete that movie file and skip it.
# Common errors are empty directories, and None types in xml parsing.
    for movieDir in glob.glob(year + '/*' * 1):
        openSubId = os_id = movieDir.split("/")[-1]
        try:
            movieFiles = listdir(movieDir)
            script = list(filter(lambda x: x.endswith('.xml'), movieFiles))[0]

            text = ""
            f = open(movieDir+'/'+script)
            for line in f.readlines():
                text += line

            print(movieDir+'/'+script)

            from lxml import etree
            root = etree.fromstring(bytes(text, encoding='utf-8'))
            result = ""
            tmp = []
            for x in root.xpath('//document/s/w'):
                print(x)
                tmp.append(x.text)
            for i in range(len(tmp)-1):
                result += tmp[i]
                if tmp[i+1] == None:
                    continue
                char = tmp[i+1][0]
                if (char >= 'A' and char <= 'z') or (char >= '0' and char <= '9'):
                    result += ' '
            add_to_jl(result, openSubId)
        except Exception as e:
            print(e)
            rmtree(movieDir)
