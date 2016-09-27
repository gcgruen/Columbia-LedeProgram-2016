## General feedback: Please force me to think!

The topics covered in this class and the last one are definitely not easy, but rather difficult, as they are totally different from anything I did so far. However, homework is way too easy.

It is too easy because you don't challenge me to think.
The only thing I have to do is to copy more or less 1:1 what we have done in class.

Speaking in sklearn: you are mostly testing us on the training data -- there's hardly a way to fail.

The only things I changed was variable names and the number of columns imported for the breast cancer dataset.  

Force us to tweak the code, challenge the concepts of this topic that we have in our minds so we need to adjust them where are wrong.

Probably there are others students who think differently or for whom it's already difficult enough.
But you claim to [not wanting to teach to the lowest common denominator](https://blog.datapolitan.com/2014/09/02/the-missing-pedagogy-in-computer-science/). It's a great claim, and pretty unique -- stick to it.

## Questions/things I don't understand
I made this list while reviewing this class' materials and working on homework, basically for myself to see what I need to review more and solve. Please don't understand this as a request for you to answer all of these.

I just thought it might be helpful to you in order to get an impression of the level of the lost-ness. I don't think I'm an outlier on this (however, no data to back this claim up).

Also, as you can tell from participation in class and from accomplishing homework tasks, the lack of knowledge listed below does not keep me from interpreting results. One could interpret that positively, IMHO though, it's not. It just underlines the fact that I can do this without really thinking about it and thus, I guess, without really understanding it -- which is rather a disadvantage.

Maybe an outline would be good to what degree we are actually meant to understand this -- maybe the goal actually only is when to run which block of code?

**Decision Tree Notebook & Decision Tree Validation Notebook**
* In your class notebooks, you import a hell lot of packages. It would be really helpful if you could briefly say what are they good for. There are so many things happening with them automatically.

Right now I feel it's like: Step 1: Use package a. Step 2: Use package b. Step 3: package c.

And of course, I can just memorize that, make myself a copy-paste-list of what to import when wanting to perform task x.
However I would actually like to understand more of what's going on.

After importing things happen automatically, which makes it way more difficult to understand *what* is actually happening there and *how*. Making it more difficult to grasp the whole thing.

List of things I do not know what they are good for:
- sklearn -- datasets
- sklearn -- tree
- sklearn -- metrics
- sklearn -- StringIO
- pydotplus
- graphviz
- os
- from pandas.tools.plotting import scatter_matrix --> Why can't I use the normal .plot(kind='scatter')?

* What does this line of code `dt = tree.DecisionTreeClassifier()`?

* Why do I have to do `dt = dt.fit(x,y)` in the first place, if I later overwrite dt anyway with the training set `dt = dt.fit(x_train,y_train)`?

* In your measure_performance function you print `"Accuracy:{0:.3f}"` -- what does the `3f` stand for?

* In `np.set_printoptions(precision=2)` -- why "2"?


**Homework**

* [Iris data] Why do prediction results change each time to code is run? Is it for testing only samling within the test-dataset assigned? And changing the sample size with each run?

* What's a good split for training vs test data? It's seems to depend on overall size -- is there a rule of thumb?

* We are all not used to use scikit learn terminology. Maybe it's worth some class time to explain the most important commands you should know? The documentation is not too good, but [this here](https://github.com/scikit-learn/scikit-learn/blob/master/sklearn/datasets/base.py) on github is a bit better. However it's always better to talk about it in class than just reading it
