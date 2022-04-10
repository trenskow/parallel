@trenskow/parallel
----

A small library for doing async tasks in parallel.

# Usage

Usage is pretty simple – see an example below.

````javascript
import parallel from '@trenskow/parallel';

const result = await parallel([
    myFirstPromise,
    mySecondPromise,
    ...
]);
````

## Compared to `Promise.all`

On the surface this looks a lot like `Promise.all`, but there is one crucial difference.

Where `Promise.all` settles fast, meaning if a promise is rejected then `Promise.all` will reject immediate – leaving the other promises to be potentially resolved.

This library is for when you want the opposite behavior, when you want all promises to be settled before the entire thing is resolved or rejected.

# LICENSE

See license in LICENSE
