# Homework 12

This was really fun and comparatively easy. The most useful I found the trick that was given in class after homework was due: If you want to restore month for the x-axis, then use resample. If you don't care about that, go with groupby.

I couldn't push this to GitHub at first, because of the too large file that was detected (and kept being detected even after git rm filename). Soma showed a useful trick to avoid it: First you have to delete this file from the github history memory with this line of code

`git filter-branch -f --index-filter 'git rm --cached --ignore-unmatch yourdirectorypathingitfolder/yourfilename'`

example (foundations-homework being the first level sub-folder of git home directory): 
`git filter-branch -f --index-filter 'git rm --cached --ignore-unmatch foundations-homework/12/311-2014.csv'`

and then add the filename to the gitignore file before the next add/commit/push.

Worked perfectly fine for me.
