#cronjob syntax running on server: 0 8 * * * python3 homework-10-gruen-apirequest.py

#API key: yourapikey
#Place in decimal degrees: NYC = {'Latitude': 40.7142700 , 'Longitude': -74.0059700}
import requests
weather_response = requests.get ('https://api.forecast.io/forecast/yourapikey/40.7142700,-74.0059700')
weather_data = weather_response.json()
daily_weather = weather_data['daily']['data']

#TEMPERATURE is the current temperature
temperature = weather_data['currently']['temperature']

#SUMMARY is what it currently looks like (partly cloudy, etc - it's "summary" in the dictionary). Lowercase, please.
summary = daily_weather[0]['summary']

#HIGH_TEMP is the high temperature for the day.
high_temp = daily_weather[0]['temperatureMax']

#LOW_TEMP is the low temperature for the day.
low_temp = daily_weather[0]['temperatureMin']

#TEMP_FEELING is whether it will be hot, warm, cold, or moderate. You will probably use HIGH_TEMP and your own thoughts and feelings to determine this.
hot_threshold = 80
cold_threshold = 68

if high_temp > hot_threshold:
    temp_feeling = "quite hot"
if high_temp > cold_threshold and high_temp < hot_threshold:
    temp_feeling = "nicely warm"
if high_temp < cold_threshold:
    temp_feeling = "pretty chilly"

#rAIN_WARNING is something like "bring your umbrella!" if it is going to rain at some point during the day.
rain_probability = daily_weather[0]['precipProbability']
rain_likelihood = rain_probability * 100

if rain_likelihood < 10:
    rain_warning = "no need for an umbrella, but maybe pack sun glasses."
if rain_likelihood > 10 and rain_likelihood < 20:
    rain_warning = "no need for an umbrella, but maybe to be on the safe side: don't wear white."
if rain_likelihood > 20 and rain_likelihood < 50:
    rain_warning = "take an umbrella with you, it's pretty likely to rain."
if rain_likelihood > 50:
    rain_warning = "if you don't have to leave the house, maybe stay inside. Rain ahead."

weather_forecast_output = ["Right now it is " + str(temperature) + " degrees out and " + str(summary) +" Today will be " + str(temp_feeling) + " with a high of " + str(high_temp) + " degrees Fahrenheit and a low of " + str(low_temp) + " degrees Fahrenheit. It's going to rain with a probability of " + str(rain_likelihood) + " percent so " + str(rain_warning)]
# with commas instead of + it gave me a line break at each comma, that's why I replaced it.

def date_in_words(date):
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    import dateutil.parser
    date = dateutil.parser.parse(date)
    return months[date.month - 1]

def day_in_number(day):
    import dateutil.parser
    day = dateutil.parser.parse(day)
    return day.day

def year_in_number(year):
    import dateutil.parser
    year = dateutil.parser.parse(year)
    return year.year

import time
datestring = time.strftime("%Y-%m-%d-%H-%M")

date_in_words(datestring)
day_in_number(datestring)
year_in_number(datestring)

final_date = [date_in_words(datestring), day_in_number(datestring), "-", year_in_number(datestring)]
specified_subjectline = ["8AM weather forecast:", final_date]

import requests
key = 'key-3cc8e00b0f71c52c6c307ff9d43e6846'
#sandbox = 'https://api.mailgun.net/v3/sandboxf0b49f8cb01849278457886ebe247d33.mailgun.org/messages'
recipient = 'gcgruen@gmail.com'

request_url = 'https://api.mailgun.net/v3/sandboxf0b49f8cb01849278457886ebe247d33.mailgun.org/messages'
request = requests.post(request_url, auth=('api', key), data={
    'from': 'postmaster@sandboxf0b49f8cb01849278457886ebe247d33.mailgun.org',
    'to': recipient,
    'subject': specified_subjectline,
    'text': weather_forecast_output
})
