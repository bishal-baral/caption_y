from elasticsearch_dsl import Search
from elasticsearch_dsl.connections import connections
from elasticsearch_dsl.query import Match, MatchAll, ScriptScore, Ids, Query


def search(index: str, query: Query) -> None:
    s = Search(using="default", index=index).query(query)[
        :30
    ]  # initialize a query and return top five results
    response = s.execute()
    result = []
    for hit in response:
        print(hit)
        result.append(
            {
                "title": hit.title,
                # "imdb_url": hit.imdb_url
            })
    return result


def make_query(query_text):
    connections.create_connection(
        hosts=["localhost"], timeout=100, alias="default")
    q_basic = Match(
        content={"query": query_text}
    )
    return search("movies", q_basic)


if __name__ == "__main__":
    pass
