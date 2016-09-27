# Graded 14/14
# Gianna-Carina Gruen
# 2016-05-30
# Homework 3

#1) Make a list called "countries" - it should contain seven
#different countries and NOT be in alphabetical order

countries = [ 'United States' , 'Germany', 'England', 'Israel', 'South Africa', 'Denmark', 'Portugal']

#2) Using a for loop, print each element of the list
print("Unsorted list of countries:")
for country in countries:
    print(country)

#3) Sort the list permanently.
countries.sort()

#4) Display the first element of the list
print("First element of the permanently sorted countries list:", countries[0])

#5) Display the second-to-last element of the list using a line
#of code that will work no matter what the size of the list is
#(hint: len will be helpful)
print("Second-to-last element of countries:", countries[len(countries)-2])

#6) Delete one of the countries from the list using its name
#(we didn't learn this in class).
# http://stackoverflow.com/questions/2793324/is-there-a-simple-way-to-delete-a-list-element-by-value-in-python
countries.remove('England')

#7) Using a for loop, print each element of the list again,
#which should now be one element shorter.
print("Shorted list of countries:")
for country in countries:
    print(country)

#1) Make a dictionary called 'tree' that responds to 'name',
#'species', 'age', 'location_name', 'latitude' and 'longitude'.
#Pick a tree from here: https://en.wikipedia.org/wiki/List_of_trees
# Old Tjikko, coordinates: https://www.wikidata.org/wiki/Q1301863
tree = {'name': "Old Tjikko", 'species': "Norway spruce",
'age': 9558, 'location_name': "Sweden",
'latitude': 61.58333, 'longitude': 12.6666}

#2) Print the sentence "{name} is a {years old} tree that is
#in {location_name}"
print(tree['name'], "is a", tree['age'], "years old tree that is located in", tree['location_name'], ".")

#3) The coordinates of New York City are 40.7128° N, 74.0059° W.
#Check to see if the tree is south of NYC, and print
#"The tree {name} in {location} is south of NYC" if it is.
#If it isn't, print "The tree {name} in {location} is north of NYC"
if tree['latitude'] < 40.7128:
    print(tree['name'], "in", tree['location_name'], "is south of NYC.")
else:
    print(tree['name'], "in", tree['location_name'], "is north of NYC.")

#4) Ask the user how old they are. If they are older than the tree,
# display "you are {XXX} years older than {name}."
#If they are younger than the tree, display "{name} was {XXX} years
# old when you were born."

age_user = input("Hello random user! Would you please tell me how old you are? (I promise not to tell anyone if you say the truth.)")
if int(age_user) > tree['age']:
    print("You are", int(age_user) - tree['age'], "years older than", tree['name'])
elif age_user == tree['age']:
    print("You are the same age as", tree['name'])
else:
    print(tree['name'], "was", tree['age'] - int(age_user), "years old when you were born.")

#1) Make a list of dictionaries of five places across the world -
#(1) Moscow, (2) Tehran, (3) Falkland Islands, (4) Seoul, and (5) Santiago.
#Each dictionary should include each city's name and latitude/longitude.

places = [
{'name': "Moscow", 'latitude': 55.755826, 'longitude':37.617300},
{'name': "Tehran", 'latitude': 35.689197, 'longitude':51.388974},
{'name': "Falkland Islands", 'latitude': -51.796253, 'longitude': -59.523613},
{'name': "Seoul", 'latitude': 37.566535, 'longitude':126.977969},
{'name': "Santiago de Chile", 'latitude': -33.448890, 'longitude': -70.669265}
]

#2) Loop through the list, printing each city's name and whether it is above or
#below the equator (How do you know? Think hard about the latitude.).
#When you get to the Falkland Islands, also display the message
#"The Falkland Islands are a biogeographical part of the mild Antarctic zone,"
#which is a sentence I stole from Wikipedia.

for city in places:
    if city['latitude'] > 0 :
        print(city['name'], "is above the equator.")
    else:
        print(city['name'], "is below the equator.")
        if city['name'] == "Falkland Islands":
            print("According to Wikipedia, the Falkland Islands are a biogeographical part of the mild Antarctic zone.")

#3) Loop through the list, printing whether each city is north of south of your tree from the previous section.
for city in places:
    if city['latitude'] > tree['latitude']:
        print(city['name'], "is north of", tree['name'])
    else:
        print(city['name'], "is south of", tree['name'])
