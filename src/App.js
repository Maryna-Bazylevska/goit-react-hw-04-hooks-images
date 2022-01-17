import { useState, useEffect } from "react";
import styles from "./App.module.css";
import * as fetch from "./components/services/images-api";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button";
import Modal from "./components/Modal";
export default function App() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setIsLoading(true);
    fetch
      .fetchImages(searchQuery, pageNumber)
      .then((res) => {
        if (searchQuery === "") {
          return alert("Please, enter a text!");
        }
        if (res.data.hits.length < 1) {
          return alert("Something wrong!");
        } else {
          setItems(res.data.hits);
        }
      })
      .catch((error) => alert("Something wrong"))
      .finally(() => {
        scrollPage();
        setIsLoading(false);
      });
  }, [searchQuery, pageNumber]);
  const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 160,
        behavior: "smooth",
      });
    }, 800);
  };
  const SubmitSearchBar = (searchQuery) => {
    setSearchQuery(searchQuery);
    setItems([]);
    setPageNumber(1);
  };
  const onLoadMore = () => {
    setPageNumber((prev) => prev + 1);
  };
  const onLargeImgClick = (imageUrl) => {
    setLargeImageURL(imageUrl);
  };
  const toggleModal = (img) => {
    setIsModalOpen((prev) => !prev);
    setLargeImageURL(img);
  };
  return (
    <div className={styles.App}>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
      <SearchBar onSubmit={SubmitSearchBar} />
      <ImageGallery
        images={items}
        onOpenModal={toggleModal}
        onLargeImgClick={onLargeImgClick}
      />
      {isLoading && <Loader />}
      {items.length > 0 && <Button onLoadMore={onLoadMore} />}
    </div>
  );
}
