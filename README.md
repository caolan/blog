# My blog

This is the CouchApp running at [caolanmcmahon.com](http://caolanmcmahon.com),
and was an early experiment in using [kanso](http://kansojs.org).

Feel free to learn from or re-use the source code for your own blog, but
please don't reproduce the design (css) or the content without my permission.


## Running the code

First, install [kanso](http://kansojs.org):

    git clone git://github.com/caolan/kanso.git
    cd kanso
    git submodule init
    git submodule update
    make && sudo make install

To deploy this code to a local CouchDB instance:

    kanso push http://localhost:5984/blog

In production I use the minify and minify-attachments flags when pushing:

    kanso push http://remote/blog --minify --minify-attachments

The data directory contains previous blog posts which were written using the
old code (a static site generator using git). These can be added to the blog
database we just created using the pushdata command:

    kanso pushdata http://localhost:5984/blog data

For help using kanso, just type:

    kanso help

If you find any bugs please let me know!


## Structure

* __data__ - some old data I needed to migrate, _you can ignore this_
* __deps__ - vendor files used by my code in the lib directory
* __files__ - a dumping ground for my files on the web, _you can ignore this_
* __lib__ - the main application code, see app.js for how it fits together
* __static__ - static attachments: css, js, images etc
* __templates__ - dust templates used by the app


## Replication and private drafts

I've added a filter function which allows me to replicate only published
documents. Using this, I can have one public database which replicates with a
private database. I can then author and view draft posts on the private
database and have them automatically made available on the public site when
published.

To set up continous replication with this filter, POST the following to
/_replicate (replacing hostnames and database names as appropriate):

    {
        "source": "http://hostname/blog_private",
        "target": "http://hostname/blog_public",
        "filter": "blog/published",
        "continuous": true
    }


## Deploying to older CouchDB instances (< 1.1.x)

I currently host this at couchone.com, and CouchDB 1.1 hasn't been released
yet. On older versions of CouchDB kanso cannot detect the baseURL properly,
which means if you wish to use rewrites you have to manually set the baseURL
to an empty string when pushing the app:

    kanso push http://username.couchone.com/blog --baseURL=""

