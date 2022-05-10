# Ali Yuksekkaya, Khadija Tirmazi

from elasticsearch_dsl import (  # type: ignore
    Document,
    Text,
    Keyword,
)


class BaseDoc(Document):
    """
    wapo document mapping structure
    """

    imdb_id = (
        Keyword()
    )  # we want to treat the doc_id as a Keyword (its value won't be tokenized or normalized).
    title = (
        Text()
    )  # by default, Text field will be applied a standard analyzer at both index and search time
    content = Text(
        analyzer="standard"
    )  # we can also set the standard analyzer explicitly

    imdb_url = (
        Text()
    )
    year = (
        Text()
    )
    rated = (
        Text()
    )
    genre = (
        Text()
    )
    plot = (
        Text()
    )

    language = (
        Text()
    )
    country = (
        Text()
    )
    poster = (
        Text()
    )

    imdbRating = (
        Text()
    )
    type = (
        Text()
    )

    def save(self, *args, **kwargs):
        """
        save an instance of this document mapping in the index
        this function is not called because we are doing bulk insertion to the index in the index.py
        """
        return super(BaseDoc, self).save(*args, **kwargs)


if __name__ == "__main__":
    pass
