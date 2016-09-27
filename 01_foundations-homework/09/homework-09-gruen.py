# Homework 9
# Gianna-Carina Gruen
# 2016-06-20


## PART ONE

earthquake = {
      'rms': '1.85',
      'updated': '2014-06-11T05:22:21.596Z',
      'type': 'earthquake',
      'magType': 'mwp',
      'longitude': '-136.6561',
      'gap': '48',
      'depth': '10',
      'dmin': '0.811',
      'mag': '5.7',
      'time': '2014-06-04T11:58:58.200Z',
      'latitude': '59.0001',
      'place': '73km WSW of Haines, Alaska',
      'net': 'us',
      'nst': '',
      'id': 'usc000rauc'}

def depth_to_words(depth):
    if float(depth) >= 0 and float(depth) <= 69.9 :
        return "A shallow"
    if float(depth) >= 70  and float(depth) <= 299.9 :
        return "An intermediate"
    if float(depth) >= 300 and float(depth) <= 700 :
        return "A deep"

def magnitude_to_words(magnitude):
    if float(magnitude) < 3.0:
        return "measurable, but not perceivable"
    if float(magnitude) >= 3.0 and float(magnitude) < 5.0:
        return "light, visible and hearable"
    if float(magnitude) >= 5.0 and float(magnitude) < 7.0:
        return "strong"
    if float(magnitude) >= 7.0 and float(magnitude) < 9.0:
        return "strong, far reaching"
    if float(magnitude) >= 9.0 and float(magnitude) < 10.0:
        return "extremely strong, far reaching"
    if float(magnitude) > 10.0:
        return "catastropic, disastrous"

def weekday_in_words(weekday):
    import dateutil.parser
    import datetime
    weekday = dateutil.parser.parse(weekday).strftime('%A')
    return weekday

def time_in_words(time):
    import dateutil.parser
    time = dateutil.parser.parse(time)
    if time.hour >= 6 and time.hour < 12:
        return "morning"
    if time.hour >= 12 and time.hour < 18:
        return "afternoon"
    if time.hour >= 18 and time.hour < 22:
        return "evening"
    if time.hour >= 22:
        return "night"

def date_in_words(date):
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    import dateutil.parser
    date = dateutil.parser.parse(date)
    return months[date.month - 1]

def day_in_number(day):
    import dateutil.parser
    day = dateutil.parser.parse(day)
    return day.day

## PART TWO

def eq_to_sentence(earthquake):
    print(depth_to_words(earthquake['depth']), magnitude_to_words(earthquake['mag']), earthquake['mag'], "magnitude earthquake was reported", weekday_in_words(earthquake['time']), time_in_words(earthquake['time']), date_in_words(earthquake['time']), day_in_number(earthquake['time']), earthquake['place'] )

eq_to_sentence(earthquake)

## PART THREE

import pandas as pd
earthquakes_df = pd.read_csv("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.csv")
earthquakes = earthquakes_df.to_dict('records')

for earthquake in earthquakes:
    def eq_to_sentence(earthquake):
        if earthquake['type'] == 'earthquake':
            if float(earthquake['mag']) >= 4.0:
                print(depth_to_words(earthquake['depth']), magnitude_to_words(earthquake['mag']), earthquake['mag'], "magnitude earthquake was reported", weekday_in_words(earthquake['time']), time_in_words(earthquake['time']), date_in_words(earthquake['time']), day_in_number(earthquake['time']), earthquake['place'] )

#PART FOUR
        else:
            print("There was also a magnitude", earthquake['mag'], earthquake['type'], "on", date_in_words(earthquake['time']), day_in_number(earthquake['time']), earthquake['place'])

    eq_to_sentence(earthquake)
