# Homework 10: Fun with servers

**APIs/Data Structures: Weather forecast**
Was thinking whether the whole API request should have been written as a function, but as the cronjob will tell it to run each day, I did not see a reason in writing it as a function, as its "argument" would have been the same for each day.

A weird thing I can't explain yet: in my weather_forecast_output I couldn't use the normal syntax with commas separating the elements, because that would lead to line breaks within the email received. To circumvent that I used thus + to separate the elements.

The cronjob syntax used is: 0 8 * * * python3 homework-10-gruen-apirequest.py

**APIs/Data Structures: Scraping and Saving**
Will do that later for pracitising purposes
