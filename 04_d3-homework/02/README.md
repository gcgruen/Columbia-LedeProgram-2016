# Homework 2

THE MOST UP-TO-DATE VERSION OF THIS WILL BE ON COURSEWORKS. It will be due 11:55pm on Wednesday.

Your homework consists of some prep work, and then making six graphics.

You'll also need to read in your design book and post a summary of what you've learned/taken away from it. The summary is posted separately.

## Prep work

Go through each column in your data set and answer the following questions:

1. Is it ordinal, nominal, or quantitative?
2. What are 4 planar or visual variables I could use to describe this column? (e.g. position)
3. If I wanted to aggregate the data, would it make sense to...
- Count how many of each value are inside?
- Get an average?
- Add up the numbers to create a total?
4. If it's a quantitative column, give an example of how you could change it into an ordinal column.

## NOTES

The work from last class is in the Files and Resources section of CourseWorks

If this were the real world these graphics would need axes, but since we haven't learn how to build axes they'll be unlabeled and sad (unless you're a real go-getter).

You should probably use circles, because circles are easiest. Remember that every circle needs a cx, a cy and an r to be visible.

Also remember that console.log() is your friend

Useful links:
http://jonathansoma.com/lede/storytelling/classes/dealing-with-data/data-types/
http://jonathansoma.com/lede/storytelling/classes/dealing-with-data/planar-variables/
http://jonathansoma.com/lede/storytelling/classes/dealing-with-data/visual-encoding/
http://jonathansoma.com/lede/storytelling/d3/positioning-elements-with-scales/ (which also includes a bit of coloring as well)

If you'd like to convert a csv (or anything in Excel/Google Sheets) into a format that you can use in JavaScript, take a look at Mr. Data Converter - https://shancarter.github.io/mr-data-converter/ - the output format you'll use is JSON - Properties

## Graphic 1

Create a graphic uses 1 planar variable to display the age of each animal (if using circles, it will just be a line of dots).

## Graphic 2

Improve on the previous graphic by increasing it to 2 planar variables, displaying the animal type and the age.

## Graphic 3

Improve on the previous graphic by increasing it to 3 variables:
	2 planar variables to describe the animal type and the age
	1 retinal variable for its weight (size/area)

## Graphic 4

Let's make another graphic that involves 3 variables:
	2 planar to describe animal type and weight
	1 retinal to describe the times arrested (color/brightness)

## Graphic 5

Let's make another graphic that involves 3 variables:
	2 planar to describe weight and age
	1 retinal to describe the kind of animal (color/hue)

## Graphic 6

Create an ordinal column from a quantitative column, like you planned in the prep section.

Create a new dataset, where each data point has three attributes: the type of animal, the type of (whatever your ordinal column is), and the number of those animals in that ordinal category.

Let's make another graphic that involves 3 variables:
	2 planar to describe your ordinal column and animal type
	1 retinal to describe the number of animals in that category (your choice)
