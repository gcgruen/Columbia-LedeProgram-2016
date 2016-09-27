# Gianna-Carina Gruen
# Homework 5: Search Engine
# 2016-06-10

# Task:
#Make a non-IPython Notebook
#that automates browsing for top tracks
#Prompts for an artist
#you put it in, displays the results, asks which one you want (numbered)
#you enter a number
#It displays their top tracks,
#then their MOST popular album
#and their least popular album.
#if they only have one album it says that they only have one album.


import requests
import math

# STEP 1: Prompt for artist name
artist_name = input("Hello! Tell me your favourite artist and I'll rush through the Spotify API to get all the important information for you. Sounds good? Start entering: ...")

# STEP 2: Determine how many hits there are
offset_value = 0
artist_name_response = requests.get('https://api.spotify.com/v1/search?query=' + artist_name+ '&type=artist&limit=50&offset=' + str(offset_value) + '&country=US')
artist_name_data = artist_name_response.json()

offset_limit = artist_name_data['artists']['total']
page_count = math.ceil(offset_limit / 50)
#print(page_count)

# STEP 3: For every page (each holding max 50 results),
# loop through and print the names found on that page
# then jump to next page and continue printing names
# until last page is reached.
offset_value = 0

artist_list = []
count = 1
for page in range(0, int(page_count)):
    all_artist_name_response = requests.get('https://api.spotify.com/v1/search?query='+ artist_name +'&type=artist&limit=50&offset=' + str(offset_value) +'')
    all_artist_name_data = all_artist_name_response.json()

    all_artist_results = all_artist_name_data['artists']
    all_artists = all_artist_results['items']

# STEP 4: create a dict for each artist with
# with key being a number and the value being the name
# add that dict to an overall list

    for artist in all_artists:
        artist_dict = {'number': count, 'name': artist['name']}
        artist_list.append(artist_dict)
        count = count + 1
    offset_value = offset_value + 50

for numbered_artist in artist_list:
    print(numbered_artist['number'], numbered_artist['name'])

number_input = input ("Which of the artists did you mean? Enter the number in front of the name of interest, to get more details.")

for numbered_artist in artist_list:
    if int(number_input) == numbered_artist['number']:
        selected_artist = (numbered_artist['name'])

print(selected_artist, "is a great choice!""
print("These are the top tracks of this artist:")

# STEP 5: Get the Spotify ID of the selected artist.

for artist in all_artists:
    if artist['name'] == selected_artist:
        artist_id = artist['id']

# STEP 6: Get the information of the selected artist:
# STEP 6a: Top Tracks
artist_details_response = requests.get('https://api.spotify.com/v1/artists/' + str(artist_id) + '/top-tracks?country=US')
artist_details_data = artist_details_response.json()

tracks_selected_artist = artist_details_data['tracks']

for track in tracks_selected_artist:
    print(track['name'])

# STEP 6b: ONLY ONE ALBUM
artist_album_response = requests.get('https://api.spotify.com/v1/artists/' + str(artist_id) + '/albums?country=US')
artist_album_data = artist_album_response.json()
all_albums = artist_album_data['items']

number_of_albums = artist_album_data['total']
if number_of_albums == 1:
    print(selected_artist, "has only one album")
if number_of_albums == 0 or '':
    print(selected_artist, "has no albums, only tracks")

# STEP 7: getting a list of all the albums associated with that artist (first step of many to determine least/most popular)
else:
    print("  ")
    print("Curious about the albums? I'll now bring you the most popular and the least popular album of this artist -- be a bit patient as this may take a while...")
    album_list = []
    for album in all_albums:
        if album['album_type'] == 'album':
            album_dict = {'album_id': album['id'], 'album_title' : album['name']}
            album_list.append(album_dict)

# STEP 8: getting all the tracks associated with each of the albums in the list.
album_and_popularity = []
for album_element in album_list:
    #print("THIS IS A NEW ALBUM:", album_element['album_title'], album_element['album_id'])
    album_tracks_response = requests.get('https://api.spotify.com/v1/albums/'+ str(album_element['album_id']) +'/tracks')
    album_tracks_data = album_tracks_response.json()
    album_tracks = album_tracks_data['items']
    album_tracklist = []

# Note for TAs: Some albums might have the same title (the case in my test example of biggie), but still have different IDs, so I treated them as different
# albums -- they also vary in their popularity as I saw in one of my check-prints, so I'm pretty sure it's different albums despite same title

    for track in album_tracks:
        track_dict = {'track_name': track['name'], 'track_id': track['id']}
        album_tracklist.append(track_dict)
# STEP 9: for each album -- getting the popularity of each of the tracks on that album and adding them up and also making an average
    track_popularity_total = []
    track_count = 0
    for track_element in album_tracklist:
        track_popularity_response = requests.get ('https://api.spotify.com/v1/tracks/'+ str(track_element['track_id']) +'')
        track_popularity_data = track_popularity_response.json()
        track_popularity = track_popularity_data['popularity']
        track_popularity_total.append(track_popularity)
        track_count = track_count + 1
    total_popularity = sum(track_popularity_total)
    average_popularity = total_popularity/track_count
    album_popularity_dict = {'album_name': album_element['album_title'], 'average_popularity_value': average_popularity}
    album_and_popularity.append(album_popularity_dict)
    #print(album_popularity_dict)

# STEP 10: Determining the most popular and least popular
most_popular_album_rating = 0
most_popular_album_name =[]
for thing in album_and_popularity:
    if thing['average_popularity_value'] > most_popular_album_rating:
        most_popular_album_rating = thing['average_popularity_value']
        most_popular_album_name = thing['album_name']

#did not work in the same loop as most_popular has had to be defined before starting this least popular loop
least_popular_album_rating = most_popular_album_rating
least_popular_album_name = []
for thing in album_and_popularity:
    if thing['average_popularity_value'] < least_popular_album_rating:
        least_popular_album_rating = thing['average_popularity_value']
        least_popular_album_name = thing['album_name']
print("The most popular album is", most_popular_album_name, "whose tracks have an average popularity of", most_popular_album_rating)
print("The least popular album is", least_popular_album_name, "whose tracks have an average popularity of", least_popular_album_rating)
