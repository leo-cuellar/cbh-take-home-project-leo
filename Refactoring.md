# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I created a new function called createHash because that functionality was used twice in the original implementation. This function also stringifies the data so that allowed me to remove some checks on the original code and JSON.stringify statements, reducing them to only one. Also changed a const name for readability.

The original code was making a lot of check that ultimately resulted in returning the `DEFAULT_PARTITION_KEY` when there was no event passed to the function so instead of doing that I check for `!event` and if true returned the `DEFAULT_PARTITION_KEY`. After that, since we are sure theres an event, I am simplifying the candidate assignation to `event.partitionKey || createHash(event)`. The I check if the candidate key exceeds the length limit and recall createHash on it if thats the case.
