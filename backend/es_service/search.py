# Authors: Bishal Baral, Ali Yuksekkaya, Khadija Tirmazi

from elasticsearch_dsl import Search
from elasticsearch_dsl.connections import connections
from elasticsearch_dsl.query import Match, MatchAll, ScriptScore, Ids, Query


def search(index: str, query: Query, media_type: str) -> None:
    s = Search(using="default", index=index).query(query)[
        :30
    ]  # initialize a query and return top five results
    response = s.execute()
    result = []
    for hit in response:
        print(hit)
        if media_type == "movie":
            if hit.type == "movie":
                result.append(createResult(hit))
        elif media_type == "series":
            if hit.type == "series" or hit.type == "episode":
                result.append(createResult(hit))
        else:
            result.append(createResult(hit))
    return result


def createResult(hit):
    return {
        "title": hit.title,
        "imdb_url": hit.imdb_url,
        "year": hit.year,
        "rated": hit.rated,
        "genre": hit.genre,
        "plot": hit.plot,
        "language": hit.language,
        "country": hit.country,
        "poster": hit.poster,
        "imdbRating": hit.imdbRating,
        "type": hit.type
    }


def make_query(query_text, content_type, media_type):
    connections.create_connection(
        hosts=["localhost"], timeout=100, alias="default")
    if content_type == "caption":
        q_basic = Match(
            content={"query": query_text}
        )
    else:
        q_basic = Match(
            plot={"query": query_text}
        )
    return search("movies", q_basic, media_type)


if __name__ == "__main__":
    pass
