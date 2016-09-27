# Gianna-Carina Gruen
# 05/23/2016
# Homework 1


# 1. Prompt the user for their year of birth, and tell them (approximately):
year_of_birth = input ("Hello! I'm not interested in your name, but I would like to know your age. In what year were you born?")

# Additionally, if someone gives you a year in the future, try asking them again (assume they'll do it right the second time)
if int(year_of_birth) >=2016:
    year_of_birth = input ("I seriously doubt that - you get another chance. Tell me the truth this time. In what year where you born?")

# 2. How old they are
age = 2016 - int(year_of_birth)
print ("So you are roughly", age, "years old.")

# 3. How many times their heart has beaten
    #human heartbeat: 70bpm; source: https://answers.yahoo.com/question/index?qid=20070907185006AAo85XE
human_heartbeat_since = age * 365 * 70 * 60 * 24
print ("Since you were born your heart has beaten roughly", human_heartbeat_since, "times. Plus one, two, three...")

# 4. How many times a blue whale's heart has beaten
    #bluewhale heartbeat: 9 bpm; source: http://www.whalefacts.org/blue-whale-heart/
whale_heartbeat_since = age * 365 * 9 * 60 * 24
print ("In the same time, a blue whale's heart has beaten approximately", whale_heartbeat_since, "times." )

# 5. How many times a rabbit's heart has beaten
    #rabbit heartbeat: 205 bpm; source: http://www.cardio-research.com/quick-facts/animals
rabbit_heartbeat_since = age * 365 * 205 * 60 * 24
# 6. If the answer to (5) is more than a billion, say "XXX billion" instead of the very long raw number
if rabbit_heartbeat_since >= 1000000000:
    print ("Whereas a rabbit's heart has beaten roughly", rabbit_heartbeat_since/1000000000, "billion times.")
    #no idea how to round the number. Tried round ( x [, n]) and I assume it doesn't work because rabbit_heartbeat_since/1000000000 is not a number. Changing it into an integer didn't help either. Defining it as a new variable neither. So, gave up on rounding it for now.

# 7. How old they are in Venus years
    # One year = one surrounding of the sun. For Venus to surround the sun once, it takes 225 Earth days; source: http://spaceplace.nasa.gov/all-about-venus/en/
    # To translate into code: How many times did Venus surround the sun since you were born?
    # Approach: 1) Calculate the number of days passed since birth 2) divide them by 225
age_on_venus = age * 365 / 225
print ("Measured in Venus years, you are", age_on_venus, "years old.")

# 8. How old they are in Neptune years
    # A year on Neptune equals 164.8 Earth years; source: https://pds.jpl.nasa.gov/planets/special/neptune.htm
age_on_neptune = age * 164.8
print ("Measured in Neptune years, you are", age_on_neptune, "years old.")

# 9. Whether they are the same age as you, older or younger
if int(year_of_birth) == 1987:
    print("And it might surprise you, but we were both born in the same year!")
# 10. If older or younger, how many years difference
elif int(year_of_birth) > 1987:
    print ("You are", int(year_of_birth)-1987, "years younger than me.")

else:
    print ("You are", 1987-int(year_of_birth), "years older than me.")
# 11. If they were born in an even or odd year
# Approach: If year_of_birth divided by 2 results in an integer number, the year is even

if int(year_of_birth) % 2 == 0:
    print ("You might have noticed, but in case not: you were born in an even year.")
else:
    print ("You might have noticed, but in case not: you were born in an odd year.")

# 12. How many times the Pittsburgh Steelers have won the Superbowl since their birth.
#Pittsburgh Steelers won in 1975, 1976, 1979, 1980, 2006, 2009; source: http://www.steelers.com/history/superbowl.html
if int(year_of_birth) <= 1975:
    print ("And did you know that the Pittsburgh Steelers won six Superbowls since you were born?!")

elif int(year_of_birth) >= 1976 and int(year_of_birth) < 1979:
    print ("And did you know that the Pittsburgh Steelers won five Superbowls since you were born?!")

elif int(year_of_birth) == 1979:
    print  ("And did you know that the Pittsburgh Steelers won four Superbowls since you were born?!")

elif int(year_of_birth) == 1980:
    print ("And did you know that the Pittsburgh Steelers won three Superbowls since you were born?!")

elif int(year_of_birth) >= 1981 and int(year_of_birth) <= 2006:
    print ("And did you know that the Pittsburgh Steelers won two Superbowls since you were born?!")

elif int(year_of_birth) > 2006 and int(year_of_birth) <= 2009:
    print ("And did you know that the Pittsburgh Steelers won one Superbowl since you were born?!")

elif int(year_of_birth) > 2009:
    print ("And did you know that the Pittsburgh Steelers haven't won one single Superbowl since you were born?!")

# 13. Which US President was in office when they were born (FDR onward)
    # actually I guess there's probably a more elegant way to solve Task 12 and this one, however I haven't yet figured the right way to google it...

    # Franklin D. Roosevelt 1933 - 1945
    # Harry S. Truman 1945 - 1953
    # Dwight D. Eisenhower 1953 - 1961
    # John F. Kennedy 1961 - 1963
    # Lydon B. Johnson 1963 - 1969
    # Richard Nixon 1969 - 1974
    # Gerald Ford 1974 - 1977
    # Jimmy Carter 1977- 1981
    # Ronald Reagan 1981 - 1989
    # George Bush 1989 - 1993
    # Bill Clinton 1993 - 2001
    # George W. Bush 2001 - 2009
    # Barack Obama 2009 - 2016
if int(year_of_birth) >= 1933 and int(year_of_birth) < 1945:
    print ("At the end, we're getting official: When you were born, President Franklin D. Roosevelt governed the US from the Oval Office")
elif int(year_of_birth) == 1945:
    print ("At the end, we're getting official: The year you were born, there were elections in the US. President Frankling D. Roosevelt was followed by President Harry S. Truman.")
elif int(year_of_birth) > 1945 and int(year_of_birth) < 1953:
    print ("At the end, we're getting official: When you were born, President Harry S. Truman governed the US from the Oval Office.")
elif int(year_of_birth) == 1953:
    print ("At the end, we're getting official: The year you were born, there were elections in the US. President Harry S. Truman was followed by President Dwight D. Eisenhower.")
elif int(year_of_birth) > 1953 and int(year_of_birth) < 1961:
    print ("At the end, we're getting official: When you were born, President Dwight D. Eisenhower governed the US from the Oval Office.")
elif int(year_of_birth) == 1961:
    print ("At the end, we're getting official: The year you were born, there were elections in the US. President Dwight D. Eisenhower was followed by President John F. Kennedy.")
elif int(year_of_birth) > 1961 and int(year_of_birth) < 1963:
    print ("At the end, we're getting official: When you were born, President John F. Kennedy governed the US from the Oval Office.")
elif int(year_of_birth) == 1963:
    print ("At the end, we're getting official: The year you were born, there were elections in the US. President John F. Kennedy was followed by President Lydon B. Johnson.")
elif int(year_of_birth) > 1963 and int(year_of_birth) < 1969:
    print ("At the end, we're getting official: When you were born, President Lydon B. Johnson governed the US from the Oval Office.")
elif int(year_of_birth) == 1969:
    print ("At the end, we're getting official: The year you were born, there were elections in the US. President Lydon B. Johnson was followed by President Richard Nixon.")
elif int(year_of_birth) > 1969 and int(year_of_birth) < 1974:
    print ("At the end, we're getting official: When you were born, President Richard Nixon governed the US from the Oval Office.")
elif int(year_of_birth) == 1974:
    print ("At the end, we're getting official: The year you were born, there were elections in the US. President Richard Nixon was followed by President Gerald Ford.")
elif int(year_of_birth) > 1974 and int(year_of_birth) < 1977:
    print ("At the end, we're getting official: When you were born, President Gerald Ford governed the US from the Oval Office.")
elif int(year_of_birth) == 1977:
    print ("At the end, we're getting official: The year you were born, there were elections in the US. President Gerald Ford was followed by President Jimmy Carter.")
elif int(year_of_birth) > 1977 and int(year_of_birth) < 1981:
    print ("At the end, we're getting official: When you were born, President Jimmy Carter governed the US from the Oval Office.")
elif int(year_of_birth) == 1981:
    print ("At the end, we're getting official: The year you were born, there were elections in the US. President Jimmy Carter was followed by President Ronald Reagan.")
elif int(year_of_birth) > 1981 and int(year_of_birth) < 1989:
    print ("At the end, we're getting official: When you were born, President Ronald Reagan governed the US from the Oval Office.")
elif int(year_of_birth) == 1989:
    print ("At the end, we're getting official: The year you were born, there were elections in the US. President Ronald Reagan was followed by President George Bush.")
elif int(year_of_birth) > 1989 and int(year_of_birth) < 1993:
    print ("At the end, we're getting official: When you were born, President George Bush governed the US from the Oval Office.")
elif int(year_of_birth) == 1993:
    print ("At the end, we're getting official: The year you were born, there were elections in the US. President George Bush was followed by President Bill Clinton.")
elif int(year_of_birth) > 1993 and int(year_of_birth) < 2001:
    print ("At the end, we're getting official: When you were born, President Bill Clinton governed the US from the Oval Office.")
elif int(year_of_birth) == 2001:
    print ("At the end, we're getting official: The year you were born, there were elections in the US. President Bill Clinton was followed by President George W. Bush.")
elif int(year_of_birth) > 2001 and int(year_of_birth) < 2009:
    print ("At the end, we're getting official: When you were born, President George W. Bush governed the US from the Oval Office.")
elif int(year_of_birth) == 2009:
    print ("At the end, we're getting official: The year you were born, there were elections in the US. President George W. Bush was followed by President Barack Obama.")
elif int(year_of_birth) > 2009:
    print ("At the end, we're getting official: When you were born, President Barack Obama governed the US from the Oval Office.")
