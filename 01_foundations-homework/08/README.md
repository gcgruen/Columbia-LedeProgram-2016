# Homework8

The dataset I prepared does not hold information for 12 questions, but I still want to work with it. So to make up for the non-asked questions, I decided to submit an additional dataset -- so in total it's three. Hope that compromise is okay.  

* Dataset1: **Water** Last year I went to a research trip to Israel, they are genius at water recycling! That got me interested in the whole area of water pollution/recycling/pricing/share of transfer between countries. Preparing for class Tues evening, I could not find consistent data for all/many countries on these topics. However, the WorldBank had data on Renewable Freshwater Resources and Annual Withdrawl, so I thought that would be a good starting point.

* Dataset2: **Baggage Claims** After figuring that with the first dataset was too small with relation to available columns to ask questions to, I made sure that this would not be a problem with the next data set. So I chose a dataset listing all the passanger complaints related to baggage. Already while preparing the questions I figured, to get a (journalistically) more reliable output, you'd need to normalize the data over the number of flights carried out by airline/at airport (as an airline/airport responsible for more flights will automatically also have more incidents). As this is just homework, I passed out on that one ;)

* Dataset3: **Refugees** I have worked on Refugee Datasets before, but only with Excel which turned out to be not only arduous but also prone to mistakes. So I see working with this dataset as kind of a test to see whether it's easier with Python. Also I wanted to try what it is like to work with an even bigger dataset. So far, size Dataset1 < Dataset2 < Dataset3

## Useful things:

### DATA

* **positioning of columns**: in Excel, if I calculate sth from column 2 and 3, I would put the result next to it in column 4. Per panda-default, it would be in the last - but there's a command for manipulating: df.insert(index, 'columnname', value) -- be careful to run the cell only once, otherwise it'll yell at you that a column with that name already exists (and you'll then have to run all cells in iPython anew)

* **coverting random date format into sth Python can read**:
`from datetime import datetime`
`date_object = datetime.strptime('28-May-15', '%d-%b-%y')`
`print(date_object)`

* **What unique values exist within a column?"** df['columnname'].unique() will tell you!

### PLOTTING

* **Manipulating graphic size** figsize = (width, height)
--> makes the displayed chart bigger. No idea what's the values measurement - px doesn't seem to be the case.
--> play around to find what fits best for your data


## Problematic things:

### DATA
*Dataset1 Takeaways*
* **NaN, n/a, 0**: For my first data set (the water data) I created in excel a file from three different Worldbank Data tables. Because I already had decided what questions to ask it, I knew that "0" in places where are no data would make my life harder. So I manually deleted the 0 out of the resepctive excel-cells. However, after importing with pd into iPython, some "empty" cells were filled with 0.0000, 0 or NaN instead
--> Takeaway: better to do data cleaning directly in pandas than trying to do that in advance in excel
--> sorting out via .notnull() does only catch NaN but not 0

* **Country-groups**: Worldbank data for all countries often also compromises data for groups of countries (LIC, HIC, Europe, Southeast Asia), that come with the same structure as normal country data, so it is kind of difficult to get them out of there....

* **too small dataset**: While working with dataset one, I figured it is too small to ask it 10 questions, also the ones I figured were quite similar and more easily be answered (or the answer being grasped more easily with a graphic than with a table)

* **asking too complicated questions**: I made up the questions, based on what I would like to know, not really thinking about how to answer it. Turns out, some of them were too complicated

* **researching to death** You thought, you'd stumble about interesting things -- turns out: nope. No interesting patters or insights.

*Dataset2 Takeaways*
* **repetition**: to get to the answer of most of the questions I came up with, it's basically repeating the same code lines, just with different variables; not too boring yet, but helps memorizing

* **accessing subgroups**: is there a more elegant way to access the subgroups of columns and work with them? I found a way that worked (making a request only for the subgroup of a column, store it into a variable and then accessing the subgroup subsequently via the actual column-title) But I felt there might be an easier solution I just did not come up with.

*Dataset3 Takeaways*

* "CParserError: Error tokenizing data. C error: Expected 2 fields in line 6, saw 17" --> googled fix: data = pd.read_csv('file1.csv', error_bad_lines=False) --> excludes whole dataset....

* **myterious sign** I could only call the column 'County', when there was a mysterious sign in front of it, that cannot be seen in the text editor view of the file.... --> disappeared only after copy pasting data through three text editors.

### PLOTTING
*Dataset1 Takeaways*

* data were sorted, but mysteriously bars were not
* is there an easy (!) way to label points in a scatter plot? Googling my way through the net, I only came across complicated ones.

*Dataset2 Takeaways*

* **Pie chart**: Can you put the percentage share as a label without calculating it in advance? How to put the absolute numbers as label? Is there a way to not make it lay in "3D", but in "2D"?

* **Scatter plot**: Questions that came up during plotting: How to make x a timeline to plot incidents against? How to convert a date column in a python-readable date column?

*Dataset3 Takeaways*

* **Line graph/plotting sth. over time**: Tried to plot over time (after extracting the data for that), but haven't yet figured how that works...continue trying (question12)
