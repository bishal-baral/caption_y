# Authors: Bishal Baral, Ali Yuksekkaya, Khadija Tirmazi

import json
import time
import os
from typing import List, Dict, Union, Iterator, Generator
from index import ESIndex
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logging.basicConfig(
    format="%(asctime)s %(levelname)-8s %(message)s",
    level=logging.INFO,
    datefmt="%Y-%m-%d %H:%M:%S",
)


def load_clean_wapo_with_embedding(wapo_jl_path: Union[str, os.PathLike]) -> Generator[Dict, None, None]:
    with open(wapo_jl_path, "r", encoding="utf-8") as f:
        for i, line in enumerate(f):
            yield json.loads(line)


class IndexLoader:
    """
    load document index to Elasticsearch
    """

    def __init__(self, index, docs):

        self.index_name = index
        self.docs: Union[Iterator[Dict], List[Dict]] = docs

    def load(self) -> None:
        st = time.time()
        logger.info(f"Building index ...")
        ESIndex(self.index_name, self.docs)
        logger.info(
            f"=== Built {self.index_name} in {round(time.time() - st, 2)} seconds ==="
        )

    @classmethod
    def from_docs_jsonl(cls, index_name: str, docs_jsonl: str) -> "IndexLoader":
        try:
            return IndexLoader(index_name, load_clean_wapo_with_embedding(docs_jsonl))
        except FileNotFoundError:
            raise Exception(f"Cannot find {docs_jsonl}!")


def main():
    idx_loader = IndexLoader.from_docs_jsonl(
        "movies", "../../data/captions.jl")
    idx_loader.load()


if __name__ == "__main__":
    main()
