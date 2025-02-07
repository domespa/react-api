import axios from "axios";
import { useState, useEffect } from "react";
// IMPORTO REACT-ROUTER
import { BrowserRouter, Routes, Route } from "react-router-dom";
// IMPORTO PAGINE
import Homepage from "./pages/Homepage";
import AboutUs from "./pages/AbousUs";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [articlesList, setArticlesList] = useState([]);

  const fetchPosts = () => {
    axios.get("http://localhost:3005/posts").then((res) => {
      setArticlesList(res.data);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "FrontEnd",
    avaible: "",
  });

  const formField = (fieldName, value) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // AGGIUNTA ARTICOLO
    axios.post("http://localhost:3005/posts", formData).then((res) => {
      setArticlesList((currentList) => [...currentList, res.data]);
    });

    // CANCELLAZIONE ARTICOLO

    setFormData({
      title: "",
      content: "",
      category: "",
      avaible: "",
    });
  };

  // CANCELLAZIONE ARTICOLO
  const deleteArticle = (articleId) => {
    axios.delete(`http://localhost:3005/posts/${articleId}`).then((res) => {
      setArticlesList((currentList) =>
        currentList.filter((article) => article.id !== articleId)
      );
    });
    // console.log(articleId);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/AboutUs" element={<AboutUs />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <div className="container">
        <h1>LISTA ARTICOLI</h1>
        <div className="col">
          <ul>
            {articlesList.map((article) => (
              <li key={article.id}>
                <strong>{article.title}</strong>
                <br />
                <div>
                  <img src={article.image} alt="" />
                </div>
                <em>
                  {article.content} {article.category}
                </em>
                <button onClick={() => deleteArticle(article.id)}>
                  Cancella
                </button>
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <h1>Aggiungi Articolo</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="titolo">Titolo</label>

          <input
            type="text"
            placeholder="Inserisci il titolo"
            value={formData.title}
            onChange={(e) => formField("title", e.target.value)}
            required
          />
          <label htmlFor="contenuto">Contenuto</label>

          <textarea
            type="text"
            placeholder="Inserisci il contenuto"
            value={formData.content}
            onChange={(e) => formField("content", e.target.value)}
            required
          />
          <label htmlFor="categoria">Seleziona una categoria</label>
          <select
            value={formData.category}
            onChange={(e) => formField("category", e.target.value)}
            required
          >
            <option value="" disabled>
              Scegli un opzione
            </option>
            <option value="Primi">Primi</option>
            <option value="Secondi">Secondi</option>
            <option value="Dolci">Dolci</option>
          </select>
          <label htmlFor="Pubblicalo">Lo vuoi Pubblicare?</label>

          <input
            type="checkbox"
            checked={formData.avaible}
            onChange={(e) => formField("avaible", e.target.checked)}
          />
          <button type="submit">Invia</button>
        </form>
      </div> */}
    </>
  );
}

export default App;
